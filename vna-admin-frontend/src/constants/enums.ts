import * as EnumType from "@/types/enum.type"
type EnumItemType = {
  label: string;
  value: string | number;
}

const enums: { [key: string]: EnumItemType[] } = {
  "layoutEnum": [
    { label: "默认", value: EnumType.LayoutEnum.DEFAULT },
    { label: "全屏", value: EnumType.LayoutEnum.FULLPAGE }
  ]
}
export type EnumsType = keyof typeof enums

export default enums