import { Entity, Column, ManyToMany, OneToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { User } from "@/core/user/entities/user.entity";
import { Permission } from "@/core/permission/entities/permission.entity";

/**
 * 角色实体
 */
@Entity("roles")
export class Role extends BaseEntity {
  @Column({ comment: "角色名称" })
  name: string;

  @Column({ comment: "角色编码" })
  code: string;

  @Column({ comment: "描述", nullable: true })
  description: string;

  @Column({ default: 1, comment: "状态：1正常 0禁用" })
  status: number;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}