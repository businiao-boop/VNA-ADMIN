import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { Permission } from "@/core/permission/entities/permission.entity";

/**
 * 菜单实体
 */
@Entity("menus")
export class Menu extends BaseEntity {
  @Column({ comment: "菜单名称" })
  name: string;

  @Column({ comment: "路由路径", nullable: true })
  path: string;

  @Column({ comment: "组件路径", nullable: true })
  component: string;

  @Column({ comment: "图标", nullable: true })
  icon: string;

  @Column({ comment: "父菜单ID", nullable: true })
  parentId: number;

  @Column({ default: 0, comment: "排序" })
  sort: number;

  @Column({ default: 1, comment: "状态：1正常 0禁用" })
  status: number;

  @ManyToOne(() => Menu, (menu) => menu.children)
  @JoinColumn({ name: "parentId" })
  parent: Menu;

  @OneToMany(() => Menu, (menu) => menu.parent)
  children: Menu[];

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissions: Permission[];
}