import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { IsOptional } from "class-validator";
import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity";

@Entity("role")
export class RoleEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, comment: '权限唯一标识' })
  code: string;
  @Column({ type: 'varchar', length: 50, comment: '权限名称' })
  name: string;
  @Column({ type: 'varchar', length: 255, nullable: true, comment: '权限描述' })
  description?: string;

  @OneToMany(
    () => RoleMenuPermissionEntity,
    (roleMenuPermissionEntity) => roleMenuPermissionEntity.role
  )
  rmp: RoleMenuPermissionEntity[];
}
