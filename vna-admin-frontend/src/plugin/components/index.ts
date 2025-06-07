import { App } from "vue";

export const setupGlobalComponents = async (app: App) => {
  // 动态导入组件
  const modules = import.meta.glob("@/components/**/index.vue");
  console.log(modules);
  for (const path in modules) {
    const mod: any = await modules[path]()
    const component = mod.default;
    console.log(component, path.split("/").at(-2), "component");

    app.component(component.name || path.split("/").at(-2), component);
  }
};
