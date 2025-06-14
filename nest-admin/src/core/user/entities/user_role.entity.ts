import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { BaseEntity } from "@/common/entities/base.entity";

@Entity("user")
export class UserRoleEntity extends BaseEntity {


  @Column({ nullable: true })
  userId: string;

  @Column()
  roleId: string;

  // @ManyToMany(() => UserEntity, (user) => user.roles)
  // @JoinTable()
  // users: UserEntity[];

  // @ManyToMany(() => RoleEntity, (role) => role.users)
  // @JoinTable()
  // roles: RoleEntity[];


}