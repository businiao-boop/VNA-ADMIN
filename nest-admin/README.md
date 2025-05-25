# 项目结构
src/
├── common/
│   ├── filters/         # 全局异常过滤器，如 HttpExceptionFilter
│   ├── interceptors/    # 全局响应拦截器，如 TransformInterceptor
│   ├── pipes/           # 全局验证/转换管道，如 ValidationPipe
│
├── config/
│   ├── configuration.ts     # 配置总入口，集中收集 .env 并结构化输出
│   ├── redis.config.ts      # Redis 单独模块配置（可从 configuration.ts 读取）
│   ├── typeorm.config.ts    # TypeORM 配置（从 configuration.ts 读取）
│
├── core/
│   ├── database/            # 数据库模块封装，导出 TypeOrmModule
│   ├── redis/               # Redis 模块封装，提供 RedisService（封装 ioredis 实例）
│   ├── auth/                # 认证模块，提供 JwtService（封装 jwt）
│   ├── user/               # 用户模块，提供 UserService（封装用户相关业务）
│
├── modules/                # 业务模块，每个模块独立，包含控制器、服务、实体、模块等  
├── main.ts                 # 启动入口，注册全局模块、中间件、Swagger 等
└── app.module.ts           # 根模块，导入核心模块和业务模块

# 环境要求
node v20.15.0

## Create
pnpm create nest@latest nest-admin

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm dev
```

## create Module
```bash
npm i -g @nestjs/cli

nest g module articles --no-spec
nest g controller articles --no-spec
nest g service articles --no-spec

nest g resource articles --no-spec
```

# redis
docker run -d --name my-redis -p 6379:6379 redis:7.2
-d	后台运行
--name my-redis	给容器取名，方便后续管理
-p 6379:6379	映射宿主机的 6379 端口到容器的 6379 端口
redis:7.2	使用的 Redis 镜像版本，可用 latest