import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn } from 'typeorm';
import { MenuEntity } from '@/core/menu/entities/menu.entity';
import { BaseEntity } from "@/common/entities/base.entity";

@Entity('permission')
export class PermissionEntity extends BaseEntity {

  @Column()
  code: string; // 如 user:create, user:delete

  @Column()
  name: string; // 如 创建、删除、导入等

  @ManyToMany(() => MenuEntity, menu => menu.permissions)
  menus: MenuEntity[];
}
