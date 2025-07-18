import { PermissionEntity } from "@/core/permission/entities/permission.entity";
import { RoleEntity } from "@/core/role/entities/role.entity";
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryColumn
} from "typeorm";

@Entity("rolemenupermission")
export class RoleMenuPermissionEntity {
  @Column({ type: "int", nullable: true, comment: "角色id" })
  roleId: number;
  @PrimaryColumn({ type: "int", comment: "菜单id" })
  menuId: number;
  @PrimaryColumn({ type: "int", comment: "权限id" })
  permissionId: number;

  @ManyToOne(() => RoleEntity, (role) => role.rmp)
  role: RoleEntity;


}
