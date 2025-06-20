import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { MenuLayoutEnum, MenuTypeEnum } from "@/common/enums/menu.enum";

import { PermissionEntity } from "@/core/permission/entities/permission.entity";
import { RoleMenuPermissionEntity } from "@/core/role-menu-permissions/entities/role-menu-permission.entity";
@Entity("menu")
export class MenuEntity extends BaseEntity {
  @Column({ length: 100, comment: "菜单名称" })
  menuName: string;

  @Column({ length: 100, comment: "菜单路径" })
  path: string;

  @Column({ length: 100, comment: "路由名称" })
  routerName: string;

  @Column({ length: 100, default: "", nullable: false, comment: "组件路径" })
  component: string;

  @Column({ type: "int", default: 0, nullable: true, comment: "父级菜单ID" })
  parentId: number;

  @Column({ type: "int", default: 0, comment: "排序（越小越前）" })
  sort: number;

  @Column({ length: 50, default: "", nullable: true, comment: "菜单图标" })
  icon?: string;

  @Column({
    type: "enum",
    enum: MenuLayoutEnum,
    default: MenuLayoutEnum.DEFAULT,
    nullable: false,
    comment: "前端使用的布局组件",
  })
  layout: MenuLayoutEnum;

  @Column({
    type: "enum",
    enum: MenuTypeEnum,
    default: MenuTypeEnum.DIRECTORY,
    nullable: false,
    comment: "菜单类型：目录、菜单",
  })
  type: MenuTypeEnum;

  @Column({ type: "boolean", default: true, comment: "是否显示在侧边栏" })
  show: boolean;

  @Column({ type: "boolean", default: true, comment: "是否缓存页面" })
  keepAlive: boolean;

  @Column({ type: "boolean", default: false, comment: "是否外链" })
  isExternal: boolean;

  @Column({
    nullable: true,
    comment: "外部链接地址（当 isExternal 为 true 时使用）",
  })
  externalLink?: string;

  @Column({ type: "boolean", default: false, comment: "是否为公共菜单" })
  isPublic: boolean;


  @ManyToMany(type => PermissionEntity, (permission) => permission.menus)
  @JoinTable({
    name: "menu_permission",
    joinColumn: { name: "menu_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "permission_id", referencedColumnName: "id" }
  })
  permissions: PermissionEntity[];

  @OneToMany(() => RoleMenuPermissionEntity, (rmp) => rmp.menu)
  roleMenuPermissions: RoleMenuPermissionEntity[];
}
