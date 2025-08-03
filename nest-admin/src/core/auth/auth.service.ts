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
  /**
   * 获取用户完整菜单（包含无权限的父菜单）
   * @param userId 用户ID
   * @returns 完整的菜单树，包含所有必要的父菜单
   */
  async getUserCompleteMenus(userId: number): Promise<Omit<Menu, 'permissions'>[]> {
  // 1. 获取所有有效的菜单
    const allMenus = await this.menuRepository
      .find({
        where: { status: 1 },
        order: { sort: 'ASC' },
        relations: ['permissions', 'permissions.role', 'permissions.role.users']
      });

    // 2. 标记用户有权限的菜单（包括子菜单）
    const authorizedMenuIds = new Set<number>();

    // 找出用户有权限的菜单
    allMenus.forEach(menu => {
      menu.permissions.forEach(permission => {
        if (permission.role.users.some(user => user.id === userId)) {
          authorizedMenuIds.add(menu.id);
        }
      });
    });

    // 3. 收集所有需要的菜单ID（包含父菜单）
    const requiredMenuIds = new Set<number>();

    allMenus.forEach(menu => {
      // 如果当前菜单有权限，收集它及其所有父菜单
      if (authorizedMenuIds.has(menu.id)) {
        let current: any = menu;
        while (current) {
          requiredMenuIds.add(current.id);
          // 查找父菜单
          current = allMenus.find(m => m.id === current.parentId);
        }
      }
    });

    // 4. 构建带权限的菜单列表
    const menuWithPermissions = allMenus.map(menu => {
      const hasPermission = authorizedMenuIds.has(menu.id);
      const { permissions, ...rest } = menu;
      return {
        ...rest,
        hasPermission,
        permission: hasPermission
          ? permissions
            .filter(p => p.role.users.some(u => u.id === userId))
            .flatMap(p => p.actions)
          : []
      };
    });

    return menuWithPermissions.filter(menu => requiredMenuIds.has(menu.id));
  }

  /**
   * 优化的用户资料查询（确保父菜单完整性）
   */
  async getUserProfile(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ["roles"]
      // , "roles.permissions", "roles.permissions.menu"
    });

    if (!user) {
      throw new NotFoundException("用户不存在");
    }

    // 使用新的菜单获取逻辑
    const completeMenus = await this.getUserCompleteMenus(userId);
    return {
      ...user,
      menus: completeMenus
    }
    // return {
    //   id: user.id,
    //   username: user.username,
    //   nickname: user.nickname,
    //   email: user.email,
    //   phone: user.phone,
    //   status: user.status,
    //   roles: user.roles
    //     .map(role => ({
    //     id: role.id,
    //     name: role.name,
    //     code: role.code,
    //     description: role.description,
    //     status: role.status
    //   })),
    //   menus: completeMenus
    // };
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