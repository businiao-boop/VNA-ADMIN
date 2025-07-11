import { Column, Entity } from "typeorm";
import { BaseEntity } from "@/common/entities/base.entity";
import { MenuTypeEnum } from '@/common/enums/menu.enum';
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

}
