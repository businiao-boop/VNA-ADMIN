import type { RouteRecordRaw as VueRoute, RouteComponent } from "vue-router";
import { LayoutEnum } from "@/types/enum.type";

type MetaType = {
  [key: string]: any,
  title?: string;
  icon?: string;
  keepAlive?: boolean;
  hidden?: boolean;
}
// 自定义组件类型支持 string | RouteComponent
type CustomComponent = string | RouteComponent;
export type BackendRoute = VueRoute & {
  component?: CustomComponent;
  routerName?: string;
  children?: BackendRoute[];
  meta: MetaType;
  layout: LayoutEnum
};

export type TabType = {
  path: string;
  fullPath: string;
  name?: string | symbol;
  meta: MetaType;
}