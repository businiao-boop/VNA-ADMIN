import { App } from "vue";
import VxeUITable from "vxe-table";
import "vxe-table/lib/style.css";
export const setupVxeTable = (app: App) => {
  app.use(VxeUITable);
};
