import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinTable, JoinColumn, Column } from "typeorm";
import { RoleEntity } from "@/core/role/entities/role.entity";
import { MenuEntity } from "@/core/menu/entities/menu.entity";
import { PermissionEntity } from "@/core/permission/entities/permission.entity";
@Entity("role_menu_permission")
export class RoleMenuPermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roleId: number;
  @Column()
  menuId: number;
  @Column({ nullable: true })
  permissionId: number;

  @ManyToOne(() => RoleEntity, role => role.roleMenuPermissions)
  @JoinColumn({ name: "roleId" })
  role: RoleEntity;

  @ManyToOne(() => MenuEntity, menu => menu.roleMenuPermissions)
  @JoinColumn({ name: "menuId" })
  menu: MenuEntity;

  @ManyToOne(() => PermissionEntity, permission => permission.roleMenuPermissions)
  @JoinColumn({ name: "permissionId" })
  permission: PermissionEntity;
}
