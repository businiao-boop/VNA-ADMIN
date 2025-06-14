import type { RouteRecordRaw as VueRoute, RouteComponent } from "vue-router";

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
  children?: BackendRoute[];
};

export type TabType = {
  path: string;
  fullPath: string;
  name?: string | symbol;
  meta: MetaType;
}