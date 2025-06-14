import { Entity, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";

import { BaseEntity } from "@/common/entities/base.entity";
import { MenuEntity } from "@/core/menu/entities/menu.entity";
import { UserEntity } from "@/core/user/entities/user.entity";
import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity";

@Entity("role")
export class RoleEntity extends BaseEntity {

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column({ nullable: true })
  description: string;

  // 多对多：一个角色可以分配给多个用户
  @ManyToMany(() => UserEntity, (user) => user.roles)
  @JoinTable({ name: 'user_role' })
  users: UserEntity[];

  @ManyToMany(() => MenuEntity)
  @JoinTable({ name: 'role_menu' })
  menus: MenuEntity[];

  @OneToMany(() => RoleMenuPermissionEntity, rmp => rmp.roleId)
  @JoinTable({ name: 'role_menu_permission' })
  menuPermissions: RoleMenuPermissionEntity[];
}