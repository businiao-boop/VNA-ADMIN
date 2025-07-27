# 权限控制系统

## 系统概述

这是一个基于Nest.js的权限控制系统，实现了用户、角色、菜单、权限的完整管理功能。

## 功能特性

- ✅ **用户管理**：用户增删改查、角色分配
- ✅ **角色管理**：角色增删改查、权限分配
- ✅ **菜单管理**：菜单增删改查、树形结构
- ✅ **权限控制**：细粒度权限控制，支持不同角色对同一菜单的不同操作权限
- ✅ **软删除**：所有数据支持软删除，可恢复
- ✅ **RESTful API**：所有接口统一使用POST方式，符合用户要求

## 表结构

### 核心表（4个）

1. **users** - 用户表
2. **roles** - 角色表
3. **menus** - 菜单表
4. **permissions** - 权限表（角色-菜单中间表）

### 自动管理中间表

- **user_roles** - 用户-角色关联表（Nest.js自动管理）

## API接口规范

### 通用规范
- 所有接口使用POST方式
- 分页参数在query中：`pageNum`、`limit`
- 查询条件在body中
- save接口：有id为更新，无id为新增

### 用户管理接口
- POST `/user/list` - 查询所有用户数据（不分页）
- POST `/user/page` - 分页查询用户数据
- POST `/user/save` - 创建/更新用户
- POST `/user/detail` - 获取用户详情
- POST `/user/delete` - 软删除用户

### 角色管理接口
- POST `/role/list` - 查询所有角色数据（不分页）
- POST `/role/page` - 分页查询角色数据
- POST `/role/save` - 创建/更新角色
- POST `/role/detail` - 获取角色详情
- POST `/role/delete` - 软删除角色

### 菜单管理接口
- POST `/menu/list` - 查询所有菜单数据（包含ID为0的根菜单，不分页）
- POST `/menu/page` - 分页查询菜单数据（总数+1，包含根菜单）
- POST `/menu/save` - 创建/更新菜单
- POST `/menu/detail` - 获取菜单详情
- POST `/menu/tree` - 获取菜单树
- POST `/menu/delete` - 软删除菜单

### 权限管理接口
- POST `/permission/list` - 查询所有权限数据（不分页）
- POST `/permission/page` - 分页查询权限数据
- POST `/permission/save` - 创建/更新权限
- POST `/permission/assign` - 分配权限给角色
- POST `/permission/role-permissions` - 获取角色的权限列表
- POST `/permission/check` - 检查用户权限
- POST `/permission/delete` - 软删除权限

## 权限控制示例

### 场景：同一菜单不同权限
- 用户A：对"用户管理"菜单有新增、修改权限
- 用户B：对"用户管理"菜单有查看、修改权限
- 用户C：对"用户管理"菜单有全部权限（新增、修改、查看、删除）

### 实现方式
在permissions表中设置：
- roleId=1, menuId=1, actions=["add","edit"]
- roleId=2, menuId=1, actions=["view","edit"]
- roleId=3, menuId=1, actions=["add","edit","view","delete"]

## 项目结构

```
src/core/
├── user/               # 用户管理
│   ├── entities/
│   ├── dto/
│   ├── user.service.ts
│   ├── user.controller.ts
│   └── user.module.ts
├── role/               # 角色管理
│   ├── entities/
│   ├── dto/
│   ├── role.service.ts
│   ├── role.controller.ts
│   └── role.module.ts
├── menu/               # 菜单管理
│   ├── entities/
│   ├── dto/
│   ├── menu.service.ts
│   ├── menu.controller.ts
│   └── menu.module.ts
├── permission/         # 权限管理
│   ├── entities/
│   ├── dto/
│   ├── permission.service.ts
│   ├── permission.controller.ts
│   └── permission.module.ts
├── core.module.ts      # 核心模块聚合
└── index.ts            # 统一导出
```

## 使用说明

1. **启动应用**：`pnpm dev`
2. **访问Swagger文档**：`http://localhost:3000/api`
3. **数据库迁移**：系统会自动创建所需表结构

## 注意事项

- 所有实体都继承自BaseEntity，包含id、createdAt、updatedAt、deletedAt字段
- 使用TypeORM的软删除机制，查询时自动过滤已删除数据
- 密码使用bcryptjs加密存储
- 支持事务操作，确保数据一致性