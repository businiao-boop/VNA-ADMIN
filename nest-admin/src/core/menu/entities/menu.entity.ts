import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { TypeEnum, LayoutEnum } from "../enum/menu.enum";
import { RoleEntity } from "@/core/role/entities/role.entity";
import { PermissionEntity } from "@/core/permission/entities/permission.entity";

@Entity("menu")
export class MenuEntity extends BaseEntity {
  @Column({ length: 100, comment: "菜单名称" })
  name: string;

  @Column({ length: 100, comment: "菜单路径" })
  path: string;

  @Column({ length: 100, default: "", nullable: false, comment: "组件路径" })
  component: string;

  @Column({ type: "int", default: 0, comment: "父级菜单ID" })
  parentId: number;

  @Column({ type: "int", default: 0, comment: "排序（越小越前）" })
  sort: number;

  @Column({ length: 50, default: "", nullable: true, comment: "菜单图标" })
  icon?: string;

  @Column({
    type: "enum",
    enum: LayoutEnum,
    default: LayoutEnum.DEFAULT,
    nullable: false,
    comment: "前端使用的布局组件",
  })
  layout: LayoutEnum;

  @Column({
    type: "enum",
    enum: TypeEnum,
    default: TypeEnum.DIRECTORY,
    nullable: false,
    comment: "菜单类型：目录、菜单",
  })
  type: TypeEnum;

  @Column({ type: "boolean", default: true, comment: "是否显示在侧边栏" })
  show: boolean;

  @Column({ type: "boolean", default: true, comment: "是否缓存页面" })
  keepAlive: boolean;

  @Column({
    length: 100,
    nullable: true,
    comment: "权限标识（如 sys:user:create）",
  })
  permission?: string;

  @Column({ type: "boolean", default: false, comment: "是否外链" })
  isExternal: boolean;

  @Column({
    nullable: true,
    comment: "外部链接地址（当 isExternal 为 true 时使用）",
  })
  externalLink?: string;

  // 新增反向关联：菜单 -> 拥有该菜单的角色列表
  @ManyToMany(() => RoleEntity, (role) => role.menus)
  roles: RoleEntity[];

  @ManyToMany(() => PermissionEntity, (permission) => permission.menus, {
    cascade: true,
  })
  @JoinTable({
    name: "menu_permission",
    joinColumn: { name: "menuId" },
    inverseJoinColumn: { name: "permissionId" },
  })
  permissions: PermissionEntity[];
}
