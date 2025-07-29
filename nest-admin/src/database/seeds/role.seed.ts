import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "@/core/role/entities/role.entity";

/**
 * 角色数据初始化
 */
@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  /**
   * 初始化默认角色
   */
  async seedDefaultRoles() {
    const defaultRoles = [
      {
        name: "管理员",
        code: "admin",
        description: "系统管理员，拥有所有权限",
        status: 1,
      },
      {
        name: "普通用户",
        code: "user",
        description: "普通用户，拥有基本权限",
        status: 1,
      },
    ];

    for (const roleData of defaultRoles) {
      const existingRole = await this.roleRepository.findOne({
        where: { code: roleData.code },
      });

      if (!existingRole) {
        const role = this.roleRepository.create(roleData);
        await this.roleRepository.save(role);
        console.log(`Created default role: ${roleData.name} (${roleData.code})`);
      }
    }
  }
}