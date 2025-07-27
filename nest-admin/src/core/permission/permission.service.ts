import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { BaseService } from "@/common/base/base.service";
import { Permission } from "./entities/permission.entity";
import { CreatePermissionDto, AssignPermissionDto } from "./dto/permission.dto";

/**
 * 权限服务
 */
@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>
  ) {
    super(permissionRepository);
  }

  /**
   * 创建权限
   */
  async createPermission(dto: CreatePermissionDto): Promise<Permission> {
    const existing = await this.permissionRepository.findOne({
      where: { roleId: dto.roleId, menuId: dto.menuId },
    });

    if (existing) {
      existing.actions = dto.actions;
      return await this.permissionRepository.save(existing);
    }

    const permission = this.permissionRepository.create(dto);
    return await this.permissionRepository.save(permission);
  }

  /**
   * 更新权限
   */
  async updatePermission(id: number, dto: CreatePermissionDto): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
    });

    if (!permission) {
      throw new NotFoundException("权限不存在");
    }

    Object.assign(permission, dto);
    return await this.permissionRepository.save(permission);
  }

  /**
   * 分配权限给角色
   */
  async assignPermissionsToRole(dto: AssignPermissionDto): Promise<void> {
    const { roleId, permissions } = dto;

    if (permissions && permissions.length > 0) {
      // 获取需要分配权限的菜单ID列表
      const menuIds = permissions.map(perm => perm.menuId);
      
      // 只删除这些菜单的权限，不影响其他菜单
      await this.permissionRepository.delete({ 
        roleId, 
        menuId: In(menuIds) 
      });

      // 批量创建新权限
      const permissionEntities = permissions.map((perm) =>
        this.permissionRepository.create({
          roleId,
          menuId: perm.menuId,
          actions: perm.actions,
        })
      );
      await this.permissionRepository.save(permissionEntities);
    }
  }

  /**
   * 获取角色的权限列表
   */
  async getRolePermissions(roleId: number): Promise<Permission[]> {
    return await this.permissionRepository.find({
      where: { roleId },
      relations: ["menu"],
    });
  }

  /**
   * 检查用户是否有权限
   */
  async checkUserPermission(
    userId: number,
    menuId: number,
    action: string
  ): Promise<boolean> {
    const permissions = await this.permissionRepository
      .createQueryBuilder("permission")
      .innerJoin("permission.role", "role")
      .innerJoin("role.users", "user")
      .where("user.id = :userId", { userId })
      .andWhere("permission.menuId = :menuId", { menuId })
      .andWhere("permission.actions LIKE :action", { action: `%${action}%` })
      .getMany();

    return permissions.length > 0;
  }
}