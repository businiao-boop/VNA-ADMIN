import { Entity, Column, ManyToMany, JoinTable } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { Role } from "@/core/role/entities/role.entity";

/**
 * 用户实体
 */
@Entity("users")
export class User extends BaseEntity {
  @Column({ unique: true, comment: "用户名" })
  username: string;

  @Column({ comment: "密码" })
  password: string;

  @Column({ comment: "昵称", nullable: true })
  nickname: string;

  @Column({ comment: "邮箱", nullable: true })
  email: string;

  @Column({ comment: "手机号", nullable: true })
  phone: string;

  // @Column({ default: true, comment: "是否启用：true启用 false禁用" })
  // isActive: boolean;

  @Column({ default: 1, comment: "状态：1正常 0禁用" })
  status: number;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: "user_roles",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "role_id", referencedColumnName: "id" },
  })
  roles: Role[];
}