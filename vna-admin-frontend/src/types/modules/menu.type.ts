// 菜单功能、api相关的类型定义
import { LayoutEnum } from "@/types/enum.type"
export enum MenuTypeEnum {
  DIRECTORY = 'dir', // 目录
  MENU = 'menu', // 菜单
  BUTTON = 'button', // 按钮
  PERMISSION = "permission", // 权限
}



export type MenuType = {
  id?: number;
  name: string;
  path: string;
  component: string;
  parentId?: number | null;
  layout: LayoutEnum;
  type: MenuTypeEnum;
  show: boolean;
  keepAlive: boolean;
  sort?: number;
  icon?: string;
  permission?: string;
  isExternal: boolean;
  externalLink?: string;
}

export type MenuResponseDto = MenuType & {
  children?: MenuResponseDto[];
};