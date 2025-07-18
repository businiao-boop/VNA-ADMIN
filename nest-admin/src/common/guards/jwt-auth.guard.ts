// 权限守卫
// src/common/guards/jwt-auth.guard.ts
import { ExecutionContext, Injectable, ForbiddenException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { AUTH_KEY, PUBLIC_KEY } from "@/common/decorators";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {

    const isPublic = this.reflector.get<string[]>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true
    }
    const can = await super.canActivate(context); // ✅ 触发 token 验证 + 设置 request.user
    if (!can) return false
    const requiredAuth = this.reflector.get<string[]>(
      AUTH_KEY,
      context.getHandler(),
    );

    if (!requiredAuth || requiredAuth.length === 0) {
      return true; // 没有设置角色要求，允许访问
    }

    // if (!can) return false;
    const { user } = context.switchToHttp().getRequest();
    if (!user || !requiredAuth.includes(user.role)) {
      throw new ForbiddenException('无权限访问');
    }
    return true;
  }
}
