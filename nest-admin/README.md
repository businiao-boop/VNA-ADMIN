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


### 核心实体设计（4个表） 1. 用户表 (user)
```
- id: number // 主键
- username: string // 用户名
- password: string // 密码（加密）
- nickname: string // 昵称
- email: string // 邮箱
- status: number // 状态：1正常 0禁用
- deletedAt: Date // 软删除时间
- createdAt: Date // 创建时间
- updatedAt: Date // 更新时间
``` 2. 角色表 (role)
```
- id: number // 主键
- name: string // 角色名称
- code: string // 角色编码（唯一）
- description: string // 描述
- status: number // 状态：1正常 0禁用
- deletedAt: Date // 软删除时间
- createdAt: Date // 创建时间
- updatedAt: Date // 更新时间
``` 3. 菜单表 (menu)
```
- id: number // 主键
- name: string // 菜单名称
- path: string // 路由路径
- component: string // 组件路径
- icon: string // 图标
- parentId: number // 父菜单ID（自关联）
- sort: number // 排序
- status: number // 状态：1正常 0禁用
- deletedAt: Date // 软删除时间
- createdAt: Date // 创建时间
- updatedAt: Date // 更新时间
``` 4. 权限表 (permission)
```
- id: number // 主键
- roleId: number // 角色ID（外键）
- menuId: number // 菜单ID（外键）
- actions: string // 权限操作，JSON字符串
存储：["add", "edit", "view", "delete"]
- createdAt: Date // 创建时间
- updatedAt: Date // 更新时间
```
### 关系设计
- 用户-角色 : 多对多（Nest.js自动管理中间表 user_roles）
- 角色-菜单 : 通过权限表实现多对多（permission表作为中间表）
- 菜单-父菜单 : 自关联一对多
### 权限控制实现
- 权限表(permission)作为角色和菜单的中间表
- actions字段存储该角色对特定菜单的操作权限
- 支持细粒度控制：每个角色对每个菜单可以设置不同的操作权限
- 操作类型：add(新增)、edit(修改)、view(查看)、delete(删除)
### 软删除实现
- 所有表都包含deletedAt字段
- 使用TypeORM的@DeleteDateColumn装饰器自动处理软删除
- 查询时自动过滤已删除的数据