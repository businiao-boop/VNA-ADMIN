import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';

import { RoleEntity } from '@/core/role/entities/role.entity';
import { MenuEntity } from '@/core/menu/entities/menu.entity';
import { PermissionEntity } from '@/core/permission/entities/permission.entity';

import { BaseEntity } from "@/common/entities/base.entity";

@Entity('role_menu_permission')
export class RoleMenuPermissionEntity extends BaseEntity {
  // @PrimaryGeneratedColumn('uuid')
  // id: string;

  @Column()
  roleId: number;
  @Column()
  menuId: number;
  @Column()
  permissionId: number;

  // @ManyToOne(() => RoleEntity, role => role.menuPermissions, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'role_id' })
  // role: RoleEntity;

  // @ManyToOne(() => MenuEntity, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'menu_id' })
  // menu: MenuEntity;

  @ManyToOne(() => PermissionEntity, { onDelete: 'CASCADE' })
    // @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;
}
