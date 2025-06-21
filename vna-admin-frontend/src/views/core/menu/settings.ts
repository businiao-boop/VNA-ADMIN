import { LayoutEnum } from "@/types/enum.type"
import { MenuTypeEnum } from "@/types/modules/menu.type"


export const initForm = {
  id: null,
  menuName: "",
  routerName: "",
  path: "",
  component: "",
  parentId: 0,
  layout: LayoutEnum.DEFAULT,
  type: MenuTypeEnum.DIRECTORY,
  show: true,
  keepAlive: true,
  sort: 1,
  icon: "",
  permissions: [],
  isExternal: false,
  externalLink: "",
  permissionIds: []

}