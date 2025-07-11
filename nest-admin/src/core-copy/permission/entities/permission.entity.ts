import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { MenuEntity } from "@/core-copy/menu/entities/menu.entity";
import { RoleMenuPermissionEntity } from "@/core-copy/role-menu-permissions/entities/role-menu-permission.entity";
@Entity("permissions")
export class PermissionEntity extends BaseEntity {
  @Column({ unique: true, comment: "权限编码,唯一" })
  code: string;
  @Column({ comment: "权限名称" })
  name: string;
  @Column({ comment: "权限描述", nullable: true })
  description: string;

  @ManyToMany(type => MenuEntity, menu => menu.permissions)
  menus: MenuEntity[];

  @OneToMany(() => RoleMenuPermissionEntity, (rmp) => rmp.permission)
  roleMenuPermissions: RoleMenuPermissionEntity[];
}
