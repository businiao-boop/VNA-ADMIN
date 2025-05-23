import {
  Repository,
  ObjectLiteral,
  FindOptionsWhere,
  FindManyOptions,
  FindOptionsOrder,
} from "typeorm";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { NotFoundException } from "@nestjs/common";
type SoftDeleteOptions = {
  clearRelations?: {
    field: keyof any; // 例如 'roles'
    joinTableRepository: Repository<any>; // 比如 userRoleRepository
    condition: Record<string, any>; // 比如 { userId: 123 }
  }[];
};
export class BaseService<T extends ObjectLiteral> {
  constructor(protected readonly repository: Repository<T>) {}

  protected prepareFilter(filter: FindManyOptions<T> = {}): FindManyOptions<T> {
    // 默认加上软删除过滤条件
    filter.where = filter.where || {};
    filter.where["deletedAt"] = null;

    // 默认排序，仅当未设置时
    if (!filter.order) {
      filter.order = { updatedAt: "DESC" } as FindOptionsOrder<{}>;
    }

    return filter;
  }

  findOne(where: FindOptionsWhere<T>): Promise<T | null> {
    const conditions = this.prepareFilter({ where });
    return this.repository.findOne(conditions);
  }
  find(where: FindOptionsWhere<T> = {}) {
    const conditions = this.prepareFilter({ where });
    return this.repository.find(conditions);
  }

  list({ page, pageSize }) {
    const conditions = this.prepareFilter();
    let where = { ...conditions };
    if (page && pageSize) {
      where = {
        skip: (page - 1) * pageSize,
        take: pageSize,
        ...conditions,
      };
    }
    return this.repository.findAndCount(where);
  }

  async softDeleteWithRelations(
    id: number,
    options?: SoftDeleteOptions
  ): Promise<void> {
    const entity = await this.repository.findOne({
      where: { id } as any,
      relations: options?.clearRelations?.map((rel) => rel.field as string),
    });
    if (!entity) throw new NotFoundException("数据不存在");

    // 清空关联字段并保存（防止查询出）
    if (options?.clearRelations?.length) {
      for (const rel of options.clearRelations) {
        (entity as any)[rel.field] = [];
      }
      await this.repository.save(entity);

      // 删除中间表数据
      for (const rel of options.clearRelations) {
        try {
          await rel.joinTableRepository.delete(rel.condition);
        } catch (error) {
          console.error(
            `删除中间表 ${rel.joinTableRepository.metadata.tableName} 数据失败:`,
            error
          );
        }
      }
    }
    await this.remove(id);
  }

  async save(entity: any) {
    if (entity.id) {
      return this.repository.update(entity.id, entity);
    } else {
      return this.repository.save(entity);
    }
  }
  // 软删除
  remove(id: number) {
    console.log(id, "id");

    return this.repository.softDelete(id);
  }
}
