import { BaseEntity } from "@/common/entities/base.entity";
import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("permission")
export class PermissionEntity extends BaseEntity {
  @Column({ type: "varchar", length: 50, comment: "权限标识" })
  code: string;
  @Column({ type: "varchar", length: 50, comment: "权限名称" })
  name: string;
  @Column({ type: "varchar", nullable: true, length: 255, comment: "权限描述" })
  description: string;

}
