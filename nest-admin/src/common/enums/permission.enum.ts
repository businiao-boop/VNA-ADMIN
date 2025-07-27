/**
 * 权限操作枚举
 * 定义系统支持的各种操作类型
 */
export enum PermissionActionEnum {
  VIEW = "view", // 查看
  ADD = "add", // 新增
  EDIT = "edit", // 修改
  DELETE = "delete", // 删除
  EXPORT = "export", // 导出
  IMPORT = "import", // 导入
  ENABLE = "enable", // 启用/禁用
  AUDIT = "audit", // 审核
}

/**
 * 权限类型枚举
 * 定义权限的粒度类型
 */
export enum PermissionTypeEnum {
  MENU = "menu", // 菜单权限
  BUTTON = "button", // 按钮权限
  API = "api", // 接口权限
  DATA = "data", // 数据权限
}