import { SetMetadata } from '@nestjs/common';

export const AUTH_KEY = 'Auth';
// 权限装饰器
export const Auth = (roles: string[]) => SetMetadata(AUTH_KEY, roles);
