import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { User } from "@/core/user/entities/user.entity";
import { Role } from "@/core/role/entities/role.entity";
import { Permission } from "@/core/permission/entities/permission.entity";
import { Menu } from "@/core/menu/entities/menu.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    // @InjectRepository(Permission)
    // private readonly permissionRepository: Repository<Permission>,
    @InjectRepository(Menu)
    private readonly menuRepository: Repository<Menu>,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 用户登录验证
   * @param username 用户名
   * @param password 密码
   * @returns 登录结果（仅返回token）
   */
  async login(username: string, password: string) {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException("用户名或密码错误");
    }

    if (user.status === 0) {
      throw new UnauthorizedException("用户已被禁用");
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken
    };
  }
  // 分步查询，在Service层处理
  async getUserCompleteMenus(userId: number): Promise<Menu[]> {
    // 1. 获取用户直接有权限的菜单
    const directMenus = await this.menuRepository
      .createQueryBuilder('menu')
      .innerJoin('menu.permissions', 'permission')
      .innerJoin('permission.role', 'role')
      .innerJoin('role.users', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('menu.status = 1')
      .getMany();

    // 2. 获取所有菜单构建树
    const allMenus = await this.menuRepository
      .find({ where: { status: 1 }, order: { sort: 'ASC' }, relations: ['permissions'] });

    // 3. 构建菜单树并标记需要返回的菜单
    const menuMap = new Map(allMenus.map(m => [m.id, m]));
    const resultIds = new Set<number>();

    // 对每个有权限的菜单，向上补全父菜单
    directMenus.forEach(menu => {
      let current: any = menu;
      while (current) {
        resultIds.add(current.id);
        current = menuMap.get(current.parentId);
      }
    });

    // 4. 返回完整菜单列表
    return allMenus.filter(menu => resultIds.has(menu.id));
  }
  /**
   * 获取用户资料，包含角色、菜单和权限信息
   * @param userId 用户ID
   * @returns 用户完整资料
   */
  async getUserProfile(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["roles", "roles.permissions", "roles.permissions.menu"]
    });



    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    // 使用优化的菜单权限处理
    const completeMenus = await this.getUserCompleteMenus(userId);
    // 构建菜单权限结构
    const menuMap = new Map();
    
    user.roles.forEach(role => {
      role.permissions.forEach(permission => {
        const menuId = permission.menu.id;
        if (!menuMap.has(menuId)) {
          menuMap.set(menuId, {
            ...permission.menu,
            roleId: role.id,
            permission: permission.actions
          });
        } else {
          // 合并权限（去重）
          const existingPermissions = menuMap.get(menuId).permission;
          const newPermissions = [...new Set([...existingPermissions, ...permission.actions])];
          menuMap.get(menuId).permission = newPermissions;
        }
      });
    });

    const menus = Array.from(menuMap.values()).sort((a, b) => a.sort - b.sort);

    return {
      user: user,
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      username: user.username,
      password: user.password,
      nickname: user.nickname,
      email: user.email,
      phone: user.phone,
      status: user.status,
      roles: user.roles.map(role => ({
        id: role.id,
        createdAt: role.createdAt,
        updatedAt: role.updatedAt,
        deletedAt: role.deletedAt,
        name: role.name,
        code: role.code,
        description: role.description,
        status: role.status
      })),
      menus: menus,
      menuList: completeMenus,
    };
  }

  /**
   * 验证用户
   * @param username 用户名
   * @param password 密码
   * @returns 用户实体
   */
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { username },
      relations: ["roles"]
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * 用户注册
   * @param username 用户名
   * @param password 密码
   * @returns 注册成功的用户信息
   */
  async register(username: string, password: string) {
    // 检查用户名是否已存在
    const existingUser = await this.userRepository.findOne({
      where: { username }
    });

    if (existingUser) {
      throw new UnauthorizedException("用户名已存在");
    }

    // 创建新用户，分配默认角色
    const defaultRole = await this.roleRepository.findOne({
      where: { code: 'user' }
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
      nickname: username, // 默认昵称为用户名
      status: 1, // 默认启用
      roles: defaultRole ? [defaultRole] : []
    });

    const savedUser = await this.userRepository.save(user);

    // 返回注册信息，不包含密码
    return {
      id: savedUser.id,
      username: savedUser.username,
      nickname: savedUser.nickname,
      createdAt: savedUser.createdAt
    };
  }
}