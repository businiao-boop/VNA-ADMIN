import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";

import { UserEntity } from "@/core-copy/user/entities/user.entity";
import { RoleMenuPermissionEntity } from "@/core-copy/role-menu-permissions/entities/role-menu-permission.entity";
@Entity('role')
export class RoleEntity extends BaseEntity {
  @Column({ unique: true, comment: '角色编码,唯一标识' })
  code: string;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ comment: '角色说明', nullable: true })
  description?: string;


  @ManyToMany(() => UserEntity, (user) => user.roles)
  users?: UserEntity[];

  @OneToMany(() => RoleMenuPermissionEntity, (rmp) => rmp.role)
  roleMenuPermissions: RoleMenuPermissionEntity[];

}