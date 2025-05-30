import { BackendRoute } from "@/types/router";

// 动态导入组件
const modules = import.meta.glob("@/views/**/*.vue");
const loadComponent = (view: string) => {
  // 根据后端返回的组件路径，使用 import.meta.glob() 来懒加载
  const matchedModule = Object.entries(modules).find(([path]) => {
    const relativePath = path.replace("/src/views/", "@/views/");
    return relativePath === view;
  });
  console.log(matchedModule, "matchedModule");

  if (matchedModule) {
    const [, module] = matchedModule;
    return module;
  }

  // 如果找不到匹配的组件，返回默认组件
  return () => import("@/views/home/index.vue");
};

// 递归转换 component
export function transformAsyncRoutes(routes: BackendRoute[]) {
  return routes.map((route) => {
    const r = { ...route };
    if (r.component === "Layout") {
      // Layout 特殊处理（你项目的 layout 组件）
      r.component = () => import("@/layout/index.vue");
    } else if (r.component === "ParentLayout") {
      r.component = () => import("@/parentLayout/index.vue");
    } else if (typeof r.component === "string") {
      r.component = loadComponent(r.component);
    }

    if (r.children && r.children.length) {
      r.children = transformAsyncRoutes(r.children);
    }

    return r;
  });
}
