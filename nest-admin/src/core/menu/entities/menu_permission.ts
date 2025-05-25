import { Entity, PrimaryColumn } from "typeorm";

@Entity("menu_permission")
export class MenuPermissionEntity {
  @PrimaryColumn()
  menuId: number;

  @PrimaryColumn()
  permissionId: number;
}
