/**
 * 选项配置常量
 * 统一管理所有下拉选择框的选项数据
 */

// 菜单类型选项
export const MENU_TYPE_OPTIONS = [
  { label: '目录', value: 'dir' },
  { label: '菜单', value: 'menu' },
  { label: '按钮', value: 'button' },
  { label: '权限', value: 'permission' },
  { label: "IDE", value: "ide" }
];

// 布局选项
export const LAYOUT_OPTIONS = [
  { label: '默认', value: 'default' },
  { label: '全屏', value: 'fullpage' },
  { label: '内嵌', value: 'iframe' },
  { label: '移动端', value: 'mobile' }
];

// 启用状态选项
export const ENABLE_STATUS_OPTIONS = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
];

// 用户状态选项
export const USER_STATUS_OPTIONS = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
];

// 角色状态选项
export const ROLE_STATUS_OPTIONS = [
  { label: '启用', value: 1 },
  { label: '禁用', value: 0 }
];

// 性别选项
export const GENDER_OPTIONS = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
  { label: '未知', value: 2 }
];

// 是否选项
export const YES_NO_OPTIONS = [
  { label: '是', value: 1 },
  { label: '否', value: 0 }
];

// 菜单显示状态选项
export const MENU_SHOW_OPTIONS = [
  { label: '显示', value: 1 },
  { label: '隐藏', value: 0 }
];

/**
 * 统一的选项配置对象
 * 使用时通过key获取对应的选项数组
 */
const OPTIONS = {
  MENU_TYPE_OPTIONS,
  LAYOUT_OPTIONS,
  USER_STATUS_OPTIONS,
  ROLE_STATUS_OPTIONS,
  GENDER_OPTIONS,
  YES_NO_OPTIONS,
  MENU_SHOW_OPTIONS
};

export default OPTIONS;