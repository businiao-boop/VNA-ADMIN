import { FindManyOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PaginationDto } from "@/common/dto"
import { buildWhere } from '@/common/utils/buildWhere';
export class BaseService<T extends {}> {
  constructor(protected readonly repo: Repository<T>) { }

  prepareFilter(
    options?: FindManyOptions<T>,
    pagination?: PaginationDto,
  ): SelectQueryBuilder<T> {
    // 使用 QueryBuilder 来实现更灵活的软删除过滤和分页排序
    let qb: SelectQueryBuilder<T> = this.repo.createQueryBuilder('entity');
    const { order, ...rest } = options || {};
    if (options) {
      if (order) {
        qb.setFindOptions(options)
      } else {
        qb.setFindOptions({ ...rest });
        qb = qb.addOrderBy('entity.updatedAt', 'DESC');
      }
    }

    // 默认排除软删除，TypeORM 软删除字段一般是 deletedAt
    qb = qb.andWhere('entity.deletedAt IS NULL');
    // 处理分页
    if (pagination && pagination.pageNum > 0 && pagination.limit > 0) {
      qb = qb.skip((pagination.pageNum - 1) * pagination.limit).take(pagination.limit);
    }

    return qb;
  }

  async findAllAndCount(
    options?: FindManyOptions<any>,
    pagination?: PaginationDto,
  ): Promise<{ data: T[]; total: number } | T[]> {
    if (options && options.where) {
      options.where = buildWhere(options.where);
    }
    const qb = this.prepareFilter(options, pagination);
    const [data, total] = await qb.getManyAndCount();
    return { data, total };


  }
  async findAll(
    options?: FindManyOptions<any>,
    pagination?: PaginationDto,
  ): Promise<{ list: T[]; total: number } | T[]> {
    if (options && options.where && Object.keys(options.where).length > 0) {
      options.where = buildWhere(options.where);
    }
    if (pagination && pagination.limit > 0 && pagination.pageNum > 0) {
      const qb = this.prepareFilter(options, pagination);
      const [data, total] = await qb.getManyAndCount();
      return { list: data, total } as { list: T[]; total: number };
    } else {
      const qb = this.prepareFilter(options);
      const data = await qb.getMany();
      return data as T[];
    }
    // if (options && options.where) {
    //   options.where = buildWhere(options.where);
    // }
    // const qb = this.prepareFilter(options);
    // const data = await qb.getMany();
    // return data;
  }

  async findOne(options?: FindManyOptions<any>): Promise<T | null> {
    if (options && options.where && Object.keys(options.where).length > 0) {
      options.where = buildWhere(options.where);
    }
    const qb = this.prepareFilter(options);
    const res = await qb.getOne();
    if (!res) return null;
    return res;
  }

  async softDeleteWithRelations(id: number) {
    return await this.repo.softDelete(id);
  }

}
