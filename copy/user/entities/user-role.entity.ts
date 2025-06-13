// src/modules/user/entities/user-role.entity.ts
import { Entity, PrimaryColumn } from "typeorm";

@Entity("user_role")
export class UserRoleEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn({ comment: "用户 ID" })
  userId: number;

  @PrimaryColumn({ comment: "角色 ID" })
  roleId: number;
}
