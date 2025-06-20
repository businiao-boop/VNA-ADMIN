import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
} from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // ❓为什么不是 isDeleted: boolean？
  // 因为 TypeORM 原生提供了软删除机制：@DeleteDateColumn()。
  // 没有被删除时为 null；
  // 删除时自动赋值为删除时间；
  // 查询时可以默认排除已删除记录（需配置）。
  @DeleteDateColumn({ name: "deleted_at", nullable: true })
  deletedAt?: Date;
}
