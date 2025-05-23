// src/modules/role/entities/role.entity.ts
import { Column, Entity, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { UserEntity } from "@/core/user/entities/user.entity";
import { MenuEntity } from "@/core/menu/entities/menu.entity";

@Entity("role")
export class RoleEntity extends BaseEntity {
  @Column({ length: 50, comment: "角色名称" })
  name: string;

  @Column({ length: 100, nullable: true, comment: "角色标识（英文唯一）" })
  code: string;

  @Column({ length: 255, nullable: true, comment: "备注" })
  remark: string;

  @Column({ type: "boolean", default: true, comment: "是否启用" })
  status: boolean;

  @ManyToMany(() => MenuEntity, (menu) => menu.roles, { cascade: true })
  @JoinTable({
    name: "role_menu",
    joinColumn: { name: "roleId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "menuId", referencedColumnName: "id" },
  })
  menus: MenuEntity[];

  // 新增反向关联：角色 -> 拥有该角色的用户列表
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
