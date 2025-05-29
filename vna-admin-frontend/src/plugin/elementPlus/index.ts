import ElementPlus from "element-plus";

import type { App } from "vue";

export const setupElementPlus = (app: App) => {
  app.use(ElementPlus);
};
