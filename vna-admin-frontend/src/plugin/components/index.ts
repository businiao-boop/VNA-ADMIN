import { App } from "vue";


export const setupGlobalComponents = async (app: App) => {
  // 动态导入组件
  const modules = import.meta.glob("@/components/**/index.vue");
  for (const path in modules) {
    const mod: any = await modules[path]()
    const component = mod.default;

    app.component(component.name || path.split("/").at(-2), component);
  }
};
