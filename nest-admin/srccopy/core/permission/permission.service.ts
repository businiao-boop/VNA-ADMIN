import { Injectable } from '@nestjs/common';
import { Repository, In } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from './entities/permission.entity';


@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permRepo: Repository<PermissionEntity>
  ) { }
  async list() {
    return await this.permRepo.find()
  }
  async findByIds(ids: number[]) {
    return await this.permRepo.findBy({ id: In(ids) })
  }
}
