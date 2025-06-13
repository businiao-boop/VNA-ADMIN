import { Entity, Column, ManyToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { RoleEntity } from "@/core/role/entities/role.entity";
import { MenuEntity } from "@/core/menu/entities/menu.entity";

@Entity("permission")
export class PermissionEntity extends BaseEntity {
  @Column({ comment: "权限名称" })
  name: string;

  @Column({ comment: "权限标识，例如 user:create", unique: true })
  code: string;

  @Column({ comment: "权限说明", nullable: true })
  description?: string;

  @Column({ comment: "是否启用", default: true })
  isEnabled: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];

  @ManyToMany(() => MenuEntity, (menu) => menu.permissions)
  menus: MenuEntity[];
}
