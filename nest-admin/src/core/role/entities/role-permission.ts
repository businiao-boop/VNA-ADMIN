import { Entity, PrimaryColumn } from "typeorm";

@Entity("role_permission")
export class RolePermissionEntity {
  @PrimaryColumn()
  roleId: number;

  @PrimaryColumn()
  permissionId: number;
}
