import { App } from "vue";
import { useFormModal, installFormModal } from "./useFormModal";

const install = (app: App) => {
  installFormModal(app);
};

export default install;

export { useFormModal };
