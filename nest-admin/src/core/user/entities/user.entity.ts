import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { BaseEntity } from "@/common/entities/base.entity";
import { RoleEntity } from "@/core/role/entities/role.entity";

import { GenderEnum } from "../enums/gender.enum";
@Entity("user")
export class UserEntity extends BaseEntity {
  @Column({ length: 50, unique: true })
  username: string;

  @Column()
  password: string;

  // @Column({ default: "user" }) // 可选：admin/user 等角色
  // role: string;
  // 多对多：用户-角色
  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
  @JoinTable({
    name: "user_role", // 中间表名
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "roleId", referencedColumnName: "id" },
  })
  roles: RoleEntity[];

  @Column({
    type: "enum",
    enum: GenderEnum,
    default: GenderEnum.UNKNOWN,
    nullable: true,
  })
  gender?: GenderEnum;

  @Column({ nullable: true })
  nickname?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  birthday?: Date;
}
