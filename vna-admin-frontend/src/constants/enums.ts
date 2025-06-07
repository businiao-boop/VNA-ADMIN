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
  ]
}
export type EnumsType = keyof typeof enums

export default enums