import Antd from "ant-design-vue";
import type { App } from "vue";

export const setupAntdv = (app: App) => {
  app.use(Antd);
};
