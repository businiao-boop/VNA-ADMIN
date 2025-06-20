// src/seeds/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PermissionEntity } from '@/core/permission/entities/permission.entity'
import { seedPermissions } from "./data/permission.seed"
@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepo: Repository<PermissionEntity>,
  ) { }

  async run() {
    await seedPermissions(this.permissionRepo);

    // 后续可继续调用更多 seed 函数
    console.log('✅ All seeds executed');
  }
}
