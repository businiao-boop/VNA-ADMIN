import { LayoutEnum, TypeEnum } from "../enum/menu.enum";

export class MenuTreeDto {
  id: number;
  name: string;
  MenuTreeDto: string;
  path: string;
  component: string;
  parentId: number;
  sort: number;
  icon?: string;
  layout: LayoutEnum;
  type: TypeEnum;
  show: boolean;
  keepAlive: boolean;
  permission?: string;
  isExternal: boolean;
  externalLink?: string;
  children?: MenuTreeDto[]; // 递归嵌套
}
