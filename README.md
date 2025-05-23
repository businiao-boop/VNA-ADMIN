# 🚀 VNA-Admin 管理系统模板

**VNA-Admin** 是一个基于 **Vue 3 + NestJS + Ant Design Vue** 的现代化权限管理后台模板，内置完善的用户角色权限机制，支持软删除、按钮级权限等功能，适用于中大型企业级后台项目开发。

---

## 🔧 技术栈

### 前端

- Vue 3
- Vite
- Ant Design Vue
- Pinia
- Vue Router
- Axios

### 后端

- NestJS
- TypeORM
- MySQL
- Redis
- JWT（Token 认证）

---

## ⚙️ 通用能力

- 通用 CRUD 模板
- 角色 - 菜单 - 权限 **三级关联**
- 支持软删除与中间表自动维护
- 登录后自动获取用户角色与菜单权限
- 支持按钮级权限控制（**Permission as Menu**）

---

## 🎯 适用场景

- 企业管理后台
- SaaS 系统后台
- CMS 内容管理平台
- 内部运营平台

---

## 🏗️ 功能模块（持续扩展中）

- ✅ 用户管理
- ✅ 角色管理
- ✅ 菜单 / 权限管理
- ✅ 登录认证模块（JWT）
- ✅ 权限守卫 + 路由控制
- ✅ 多对多关系管理（用户-角色、角色-菜单）

---

## 🧪 提交规范（Conventional Commits）

| 类型       | 含义                                 |
|------------|--------------------------------------|
| `feat`     | 新功能（feature）                    |
| `fix`      | 修复 bug                             |
| `docs`     | 文档变更（如 README、注释）          |
| `style`    | 格式修改（无逻辑变动，如空格、分号） |
| `refactor` | 重构（不引入新功能也不修复 bug）     |
| `perf`     | 性能优化                             |
| `test`     | 测试代码                             |
| `chore`    | 构建流程、工具依赖等变更             |
| `revert`   | 回滚某次提交                         |

推荐使用 `commitlint` + `husky` 保证提交
规范，具体配置参考 [commitlint](https://github.com/conventional-changelog/commitlint)