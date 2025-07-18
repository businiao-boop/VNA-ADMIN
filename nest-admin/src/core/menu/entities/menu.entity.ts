import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { MenuTypeEnum } from '@/common/enums/menu.enum';
import { RoleMenuPermissionEntity } from "@/core/role-menu-permission/entities/role-menu-permission.entity";
@Entity("menu")
export class MenuEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 50, comment: '菜单名称' })
  menuName: string;

  @Column({ type: 'int', default: 0, comment: '父级菜单 ID' })
  parentId: number;

  @Column({
    type: 'enum',
    enum: MenuTypeEnum,
    default: MenuTypeEnum.DIRECTORY,
    comment: '菜单类型',
  })
  type: MenuTypeEnum;

  @Column({ type: 'varchar', length: 255, comment: '路由路径' })
  path: string;

  @Column({ type: 'varchar', length: 255, default: 'Layout', comment: '组件路径' })
  component: string;

  @Column({ type: 'varchar', length: 100, nullable: true, comment: '菜单图标' })
  icon: string;

  @Column({ type: 'int', default: 0, comment: '排序字段' })
  order: number;

  @Column({ type: 'boolean', default: true, comment: '是否可见' })
  visible: boolean;

  @Column({ type: 'boolean', default: true, comment: '是否启用' })
  status: boolean;

  @Column({ type: 'boolean', default: true, comment: '是否缓存' })
  keepAlive: boolean;

  //  @ManyToMany(() => RoleEntity, (role) => role.users)
  //   @JoinTable({
  //     name: 'user_role',// 中间表叫 user_role
  //     joinColumn: {
  //       name: 'user_id',// 中间表中对应当前实体的列名
  //       referencedColumnName: 'id',// 当前实体中被引用的字段(外键)
  //     },
  //     inverseJoinColumn: {
  //       name: 'role_id',//中间表中对应对方实体的列名
  //       referencedColumnName: 'id',//对方实体中被引用的字段(对方实体的外键)
  //     },
  //   })
  //   roles: RoleEntity[];
  // @OneToMany(() => RoleMenuPermissionEntity, (rmp) => rmp.menu)
  // rmp: RoleMenuPermissionEntity[];

}
