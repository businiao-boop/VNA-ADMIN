import { LayoutEnum } from "@/types/enum.type"
import { MenuTypeEnum } from "@/types/modules/menu.type"
export const columns = [
  {
    title: '菜单名称',
    field: "menuName",
    visible: true

  },
  {
    title: '菜单路径',
    field: "path",
    visible: true
  },
  {
    title: '菜单图标',
    field: "icon",
    visible: true
  },
  {
    title: '菜单类型',
    field: "type",
    visible: true
  },
  {
    title: '菜单状态',
    field: "status",
    visible: true
  },
  {
    title: '创建时间',
    field: "createTime",
    visible: true
  },
  {
    title: '操作',
    field: "action",
    visible: true,
    slot: true
  }
]

export const presetFields = {
  menuName: "",
  routerName: "",
  path: "",
  component: "",
  parentId: null,
  layout: LayoutEnum.DEFAULT,
  type: MenuTypeEnum.DIRECTORY,
  show: true,
  keepAlive: true,
  sort: 1,
  icon: "",
  permission: "",
  isExternal: false,
  externalLink: "",
  permissionIds: [],

}