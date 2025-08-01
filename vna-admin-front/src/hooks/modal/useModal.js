import { createVNode, getCurrentInstance, render } from 'vue';
import YModal from "@/components/YModal/index.vue";
let _app = null;
export const useModal = () => {
  async function showModal(component, options = {}) {
    const props = {
      ...options,
    }

    return new Promise((resolve, reject) => {
      const container = document.createElement('div');
      const confirm = (data) => {
        resolve(data || "confirm");
        render(null, container);
        document.body.removeChild(container);
      }
      const cancel = () => {
        reject("cancel");
        render(null, container);
        document.body.removeChild(container);
      }
      const close = () => {
        reject("close");
        render(null, container);
        document.body.removeChild(container);
      }
      const vnode = createVNode(component, {
        ...props,
        onConfirm: confirm,
        onCancel: cancel,
        onClose: close,
      });
      vnode.appContext = _app._context;
      document.body.appendChild(container);
      render(vnode, container);
    })
  }

  return {
    showModal,
  }
}
const setupModal = (app) => {
  _app = app;
}
export default setupModal;
