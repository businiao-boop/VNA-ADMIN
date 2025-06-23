import { BackendRoute } from "@/types/router";
import type { MenuInfoDto } from "@/types/modules/menu.type";
import { LayoutEnum, MenuTypeEnum } from "@/types/enum.type";
import Layout from "@/layout/index.vue";
import MobileLayout from "@/mobileLayout/index.vue"
import FullLayout from "@/fullLayout/index.vue";
// 动态导入组件
const modules = import.meta.glob("@/views/**/*.vue");
const loadComponent = (view: string) => {
  // 根据后端返回的组件路径，使用 import.meta.glob() 来懒加载
  const matchedModule = Object.entries(modules).find(([path]) => {
    const relativePath = path.replace("/src/views/", "@/views/");
    return relativePath === view;
  });

  if (matchedModule) {
    const [, module] = matchedModule;
    return module;
  }

  // 如果找不到匹配的组件，返回默认组件
  return () => import("@/views/home/index.vue");
};

// 递归转换 component
// export function transformAsyncRoutes(routes: BackendRoute[]) {
//   return routes.map((route) => {
//     const { path, routerName, children, component, ...rest } = route;
//     const r = {
//       path: path,
//       name: routerName,
//       component: component,
//       children: children,
//       meta: {
//         ...rest
//       }
//     } as any as BackendRoute;

//     if (r.component && typeof r.component === 'string') {

//       r.component = loadComponent(r.component);
//     } else if (r.meta.layout === LayoutEnum.DEFAULT) {
//       // Layout 特殊处理（你项目的 layout 组件）
//       r.component = () => import("@/layout/index.vue");
//     } else if (r.meta.layout === LayoutEnum.FULLPAGE) {
//       r.component = () => import("@/parentLayout/index.vue");
//     }

//     if (r.children && r.children.length) {
//       r.children = transformAsyncRoutes(r.children);
//     }

//     return r;
//   });
// }
export function transformAsyncRoutes(routes: MenuInfoDto[]) {
  if (!routes || !routes.length) return;
  const routeMap = new Map<string | number, any>();
  routes.map(route => {

    if (route.type === MenuTypeEnum.MENU) {
      if (!route.parentId) {
        const parent = {
          path: "/" + route.layout,
          name: route.layout,
          component: Layout,
          type: MenuTypeEnum.DIRECTORY,
          layout: route.layout,
          children: []
        }
        switch (route.layout) {
          case LayoutEnum.FULLPAGE:
            parent.component = FullLayout
            break;
          case LayoutEnum.MOBILE:
            parent.component = MobileLayout
            break;
          default:
            parent.component = Layout
            break;
        }
        routeMap.set(route.layout, parent)
      }
    }
    let r = {
      ...route,
      children: []
    }
    if (route.type === MenuTypeEnum.MENU && route.component) {
      r.component = loadComponent(route.component) as any as string
    }
    routeMap.set(route.id, { ...route, children: [] })
  })
  const tree: any[] = [];
  routes.map(route => {
    const current = routeMap.get(route.id);
    let r = {
      path: current.path,
      name: current.routerName,
      component: current.component,
      meta: {
        title: current.menuName,
        icon: current.icon,
        keepAlive: current.keepAlive,
        hidden: current.show === false,
        layout: current.layout,
        type: current.type,
        parentId: current.parentId,
      }
    }
    if (r.meta.type === MenuTypeEnum.DIRECTORY) {
      switch (r.meta.layout) {
        case LayoutEnum.FULLPAGE:
          r.component = FullLayout
          break;
        case LayoutEnum.MOBILE:
          r.component = MobileLayout
          break;
        default:
          r.component = Layout
          break;
      }
    } else if (r.meta.type === MenuTypeEnum.MENU) {
      r.component = loadComponent(r.component)
    }
    if (r.meta.type === MenuTypeEnum.MENU && !r.meta.parentId) {
      routeMap.get(r.meta.layout).children.push(r)
    } else if (r.meta.parentId && routeMap.has(r.meta.parentId)) {
      routeMap.get(r.meta.parentId).children.push(r)
    } else {
      tree.push(r)
    }

  })
  return tree;
}