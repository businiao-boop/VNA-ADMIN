import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";

import type { App } from "vue";

export const setupAntdv = (app: App) => {
  app.use(Antd);
};
