import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { BaseEntity } from "@/common/entities/base.entity";
import { RoleEntity } from "@/core/role/entities/role.entity";

@Entity("user")
export class UserEntity extends BaseEntity {

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: 'user_role' })
  roles: RoleEntity[];
}