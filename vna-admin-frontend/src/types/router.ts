import type { RouteRecordRaw as VueRoute, RouteComponent } from "vue-router";
// 自定义组件类型支持 string | RouteComponent
type CustomComponent = string | RouteComponent;
export type BackendRoute = VueRoute & {
  component?: CustomComponent;
  children?: BackendRoute[];
};
