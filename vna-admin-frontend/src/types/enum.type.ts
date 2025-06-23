export enum LayoutEnum {
  DEFAULT = 'default', // 默认
  FULLPAGE = 'fullpage', // 全屏
  MOBILE = 'mobile',
}

export enum MenuTypeEnum {
  DIRECTORY = 'dir', // 目录
  MENU = 'menu', // 菜单
  MOBILE = 'mobile',
  BUTTON = 'button', // 按钮
  PERMISSION = "permission", // 权限
}

export enum PermissionTypeEnum {
  CREATE = 0b0000000000000001, // 新增
  UPDATE = 0b0000000000000010, // 修改
  DELETE = 0b0000000000000100, // 删除
  IMPORT = 0b0000000000001000, // 导入
  EXPORT = 0b0000000000010000, // 下载、导出
}

export enum GenderEnum {
  MALE = 'male', // 男
  FEMALE = 'female', // 女
  SECRET = 'secret',
}