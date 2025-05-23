import { NestFactory, Reflector } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { HttpExceptionFilter } from "@/common/filters/http-exception.filter";
import { TransformInterceptor } from "@/common/interceptors/transform.interceptor";
import { ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
// import { JwtAuthGuard } from "@/common/guards/jwt.auth.guard";
import { JwtAuthGuard } from "@/core/auth/auth.guard";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 注册全局验证管道（自动验证 DTO）
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // 注册全局异常过滤器（统一异常输出格式）
  app.useGlobalFilters(new HttpExceptionFilter());

  // 注册全局响应拦截器（统一成功返回结构）
  app.useGlobalInterceptors(new TransformInterceptor());

  const configService = app.get(ConfigService);

  const port = configService.get("app.port");
  const host = configService.get("app.host");

  const globalPrefix = configService.get("app.prefix");
  app.setGlobalPrefix(globalPrefix); //设置路由全局前缀

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector)); // 设置全局守卫

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle("Nest")
    .setDescription("docs")
    .setVersion("1.0")
    .addBearerAuth() // 支持 JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document); // 访问地址：http://localhost:3000/swagger

  await app.listen(port || 3000);
  console.log(`✅ Application is running on: http://${host}:${port || 3000}`);
}
bootstrap();
