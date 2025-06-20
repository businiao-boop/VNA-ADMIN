// src/common/utils/route.util.ts

export function buildRouteTree(menus: any[]): any[] {
  const menuMap = new Map<number, any>();
  const tree: any[] = [];
  let layout: string = "";
  menus.forEach((menu) => {
    if (menu.type === 0) {
      if (menu.parentId === 0) {
        layout = "Layout";
      } else {
        layout = "ParentLayout";
      }
    } else if (menu.type === 1) {
      layout = menu.component;
    }
    const route = {
      path: menu.path,
      name: menu.name || `menu_${menu.id}`,
      component: layout,
      meta: {
        title: menu.name,
        icon: menu.icon || "",
        keepAlive: menu.keepAlive ?? true,
        show: menu.show ?? true,
        noCache: false,
        templateId: null,
        remark: "",
        affix: null,
        requireAuth: "0",
      },
      children: [],
    };
    menuMap.set(menu.id, route);
  });

  menus.forEach((menu) => {
    const current = menuMap.get(menu.id);
    if (menu.parentId && menuMap.has(menu.parentId)) {
      menuMap.get(menu.parentId).children.push(current);
    } else {
      tree.push(current);
    }
  });

  // ✅ 特殊处理首页 path === '/' 的情况
  // const rootIndex = tree.findIndex((item) => item.path === "/");
  // if (rootIndex !== -1) {
  //   const rootRoute = tree[rootIndex];
  //   const wrapped = {
  //     path: "/",
  //     hidden: false,
  //     component: "Layout",
  //     meta: {
  //       title: "主頁",
  //       icon: "home",
  //       noCache: false,
  //       templateId: null,
  //       remark: "",
  //       affix: null,
  //       requireAuth: "0",
  //     },
  //     children: [
  //       {
  //         ...rootRoute,
  //         name: rootRoute.name || "Home",
  //         path: "home", // 子路由也用 "/"
  //         hidden: false,
  //         meta: {
  //           ...rootRoute.meta,
  //           title: "主頁",
  //           icon: "home",
  //           affix: true,
  //         },
  //       },
  //     ],
  //   };

  //   // 替换原来的 root route
  //   tree.splice(rootIndex, 1, wrapped);
  // }

  return tree;
}
