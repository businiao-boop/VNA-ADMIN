import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { Role } from "@/core/role/entities/role.entity";
import { Menu } from "@/core/menu/entities/menu.entity";

/**
 * 权限实体
 * 角色与菜单的中间表，存储角色对菜单的操作权限
 */
@Entity("permissions")
export class Permission extends BaseEntity {
  @Column({ comment: "角色ID" })
  roleId: number;

  @Column({ comment: "菜单ID" })
  menuId: number;

  @Column({ type: "simple-json", comment: "权限操作，JSON数组：[add,edit,view,delete]" })
  actions: string[];

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn({ name: "roleId" })
  role: Role;

  @ManyToOne(() => Menu, (menu) => menu.permissions)
  @JoinColumn({ name: "menuId" })
  menu: Menu;
}