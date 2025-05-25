import Antd from "ant-design-vue";
import type { App } from "vue";
export const setupAntd = (app: App) => {
  app.use(Antd);
};
