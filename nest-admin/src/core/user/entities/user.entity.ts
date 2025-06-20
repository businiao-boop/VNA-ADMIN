import { Entity, Column, ManyToMany, JoinTable } from "typeorm";

import { BaseEntity } from "@/common/entities/base.entity";
import { RoleEntity } from "@/core/role/entities/role.entity"

@Entity("user")
export class UserEntity extends BaseEntity {

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  password: string;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_role',// 中间表叫 user_role
    joinColumn: {
      name: 'user_id',// 中间表中对应当前实体的列名
      referencedColumnName: 'id',// 当前实体中被引用的字段(外键)
    },
    inverseJoinColumn: {
      name: 'role_id',//中间表中对应对方实体的列名
      referencedColumnName: 'id',//对方实体中被引用的字段(对方实体的外键)
    },
  })
  roles: RoleEntity[];
}