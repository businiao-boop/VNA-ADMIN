import { Entity, PrimaryColumn } from "typeorm";

@Entity("role_menu")
export class RoleMenuEntity {
  // @PrimaryGeneratedColumn()
  // id: number;

  @PrimaryColumn({ comment: "角色 ID" })
  roleId: number;

  @PrimaryColumn({ comment: "菜单 ID" })
  menuId: number;
}
