// 菜单功能、api相关的类型定义
import { LayoutEnum } from "@/types/enum.type";
import { PermissionDto } from "./permission.type";
export enum MenuTypeEnum {
  DIRECTORY = 'dir', // 目录
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
  PERMISSION = "permission", // 权限
}



type MenuType = {
  id: number | null;
  menuName: string;
  routerName: string;
  path: string;
  component: string;
  parentId: number;
  layout: LayoutEnum;
  type: MenuTypeEnum;
  show: boolean;
  keepAlive: boolean;
  sort?: number;
  icon?: string;
  permission?: PermissionDto[];
  isExternal: boolean;
  externalLink?: string;
  permissionIds: number[];
}

// 一般用于表单初始化
export type MenuDto = MenuType & { id: number | null, permissionIds: number[] };
// menu 详情
export type MenuInfoDto = MenuType & { id: number, permissionIds: number[], permissions?: PermissionDto[] };

export type MenuTreeDto = MenuType & { id: number, children?: MenuTreeDto[], label?: string };