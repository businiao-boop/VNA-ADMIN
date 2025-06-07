import * as EnumType from "@/types/enum.type"
type EnumItemType = {
  label: string;
  value: string | number;
}

const enums: { [key: string]: EnumItemType[] } = {
  "layoutEnum": [
    { label: "默认", value: EnumType.LayoutEnum.DEFAULT },
    { label: "全屏", value: EnumType.LayoutEnum.FULLPAGE }
  ],
  menuTypeEnum: [
    { label: "菜单", value: EnumType.MenuTypeEnum.MENU },
    { label: "目录", value: EnumType.MenuTypeEnum.DIRECTORY },
    { label: "按钮", value: EnumType.MenuTypeEnum.BUTTON },
    { label: "权限", value: EnumType.MenuTypeEnum.PERMISSION }
  ],
  premissionsEnum: [
    { label: "创建权限", value: EnumType.PermissionTypeEnum.CREATE },
    { label: "查看权限", value: EnumType.PermissionTypeEnum.INFO },
    { label: "修改权限", value: EnumType.PermissionTypeEnum.UPDATE },
    { label: "删除权限", value: EnumType.PermissionTypeEnum.DELETE },
    { label: "导入权限", value: EnumType.PermissionTypeEnum.EXPORT },
  ],
}
export type EnumsType = keyof typeof enums

export default enums