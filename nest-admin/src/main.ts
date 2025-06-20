import { NestFactory, Reflector } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

import { AppModule } from "./app.module";
import { setupSwagger } from "@/config/swagger.config"
import { setupFilters } from "@/common/exceptions"
import { setupInterceptors } from "@/common/interceptors";
import { JwtAuthGuard } from "@/common/guards"

async function bootstrap() {

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置 swagger
  setupSwagger(app);

  // 用于处理请求体的验证与转换
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,//自动将传入参数类型转换为 DTO 定义的类型
      whitelist: true,//只保留 DTO 中定义的属性，其他多余的字段会被自动剔除
      forbidNonWhitelisted: false,//如果传入了 DTO 中未定义的字段，直接抛出异常
      transformOptions: {
        enableImplicitConversion: true,//启用隐式类型转换，例如自动将字符串 "true" 转为布尔值
      },
    }),
  );
  // 注册全局异常过滤器（统一异常输出格式）
  setupFilters(app);
  // 注册全局响应拦截器（统一成功返回结构）
  setupInterceptors(app)
  // 设置全局守卫
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  const configService = app.get(ConfigService);
  const port = configService.get("app.port") || 3000;
  const host = configService.get("app.host") || "localhost";
  const globalPrefix = configService.get("app.prefix");
  app.setGlobalPrefix(globalPrefix); //设置路由全局前缀

  await app.listen(port || 3000);
  console.log(`✅ Application is running on: http://${host}:${port || 3000}`);

}

bootstrap();