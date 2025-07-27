import Antd from "ant-design-vue";
import * as icons from '@ant-design/icons-vue'
const setupAntdv = (app) => {
  // Register antd icon components
  Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
  })
  app.use(Antd);
};
export default setupAntdv;