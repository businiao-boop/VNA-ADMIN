import { MenuInfoDto } from "./menu.type";
// 用户保存时的类型定义
export type RoleTypeDto = {
  id: number | null;
  code: string;
  name: string;
  description?: string;
  menuList: MenuInfoDto[];
  permissions?: Record<string, string[]>;//键：菜单id，值：权限id
  checkedKeys?: (number | string)[];
};

export type RoleListDto = RoleTypeDto & { id: number };

export type RoleInfoDto = RoleTypeDto;
