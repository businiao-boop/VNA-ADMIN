import { SetMetadata } from '@nestjs/common';

export const PUBLIC_KEY = 'Public';
// 权限装饰器
export const Public = () => SetMetadata(PUBLIC_KEY, true);
