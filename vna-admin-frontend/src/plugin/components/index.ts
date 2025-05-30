// 动态导入组件
const modules = import.meta.glob("@/components/**/index.vue");

export const setupComponent = (app: any) => {
  for (const path in modules) {
    modules[path]().then((mod: any) => {
      const component = mod.default;

      app.component(component.name || path.split("/").at(-2), component);
    });
  }
};
