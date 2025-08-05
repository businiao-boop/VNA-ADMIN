import { Injectable, NotFoundException, ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BaseService } from "@/common/base/base.service";
import { Role } from "./entities/role.entity";
import { CreateRoleDto, QueryRoleDto } from "./dto/role.dto";

/**
 * 角色服务
 */
@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {
    super(roleRepository);
  }

  /**
   * 创建角色
   */
  async createRole(dto: CreateRoleDto): Promise<Role> {
    const existingRole = await this.findOne({
      where: [{ name: dto.name }, { code: dto.code }],
    });
    console.log(existingRole);

    if (existingRole && existingRole.code === dto.code) {
      throw new ConflictException("角色编码已存在");
    }
    if (existingRole && existingRole.name === dto.name) {
      throw new ConflictException("角色名称已存在");
    }

    const role = this.roleRepository.create(dto);
    return await this.roleRepository.save(role);
  }

  /**
   * 更新角色
   */
  async updateRole(id: number, dto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException("角色不存在");
    }

    if (dto.name && dto.name !== role.name) {
      const existingRole = await this.roleRepository.findOne({
        where: { name: dto.name },
      });
      if (existingRole) {
        throw new ConflictException("角色名称已存在");
      }
    }

    if (dto.code && dto.code !== role.code) {
      const existingRole = await this.roleRepository.findOne({
        where: { code: dto.code },
      });
      if (existingRole) {
        throw new ConflictException("角色编码已存在");
      }
    }

    Object.assign(role, dto);
    return await this.roleRepository.save(role);
  }

  /**
   * 获取角色详情
   */
  async getRoleDetail(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ["permissions", "permissions.menu"],
    });

    if (!role) {
      throw new NotFoundException("角色不存在");
    }

    return role;
  }

  async list(options: QueryRoleDto) {
    // 模糊查询
    const query = this.roleRepository.createQueryBuilder("role");
    if (options.name) {
      query.where("role.name LIKE :name", { name: `%${options.name}%` });
    }
    return query.getMany();
  }
}