import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

import { RoleEntity } from '@/core/role/entities/role.entity';
import { MenuEntity } from '@/core/menu/entities/menu.entity';
import { PermissionEntity } from '@/core/permission/entities/permission.entity';

@Entity('role_menu_permission')
export class RoleMenuPermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => RoleEntity, role => role.menuPermissions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToOne(() => MenuEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'menu_id' })
  menu: MenuEntity;

  @ManyToOne(() => PermissionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'permission_id' })
  permission: PermissionEntity;
}
