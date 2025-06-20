// src/seeds/permission.seed.ts
import { Repository } from 'typeorm';
import { PermissionEntity } from '@/core/permission/entities/permission.entity'

export async function seedPermissions(repo: Repository<PermissionEntity>) {
  const permissions = [
    { code: 'view', name: '查看' },
    { code: 'create', name: '创建' },
    { code: 'update', name: '编辑' },
    { code: 'delete', name: '删除' },
    // ...其他权限
  ];

  for (const perm of permissions) {
    const exists = await repo.findOneBy({ code: perm.code });
    if (!exists) {
      await repo.save(repo.create(perm));
    }
  }
}
