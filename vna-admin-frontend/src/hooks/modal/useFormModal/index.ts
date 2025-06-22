import { render, createVNode, App, Component, ref } from "vue";
import YModal from "@/components/YModal/index.vue";
import { provide } from 'vue'


let _app: App;

export const installFormModal = (app: App) => {
  _app = app;
};

type formProps = {
  modalValue: object;
  [key: string]: any;
};
export const useFormModal = () => {
  const showModal = <T>(component: Component, formProps?: formProps) => {
    const container = document.createElement("div");
    const appContext = _app._context;

    // const { modalValue, ...rest } = formProps;
    // const formState = ref<T>({ ...modalValue } as T);

    const PromiseFun: Promise<T> = new Promise((resolve, reject): void => {
      const close = () => {
        render(null, container);
      };
      const cancel = () => {
        close();
        reject(false);
      }
      const ok = (form: any) => {
        close();
        resolve(form || true);
      };
      const modalVNode = createVNode(component, {
        ...formProps,
        onClose: cancel,
        onOk: ok
      })
      modalVNode.appContext = {
        ...appContext,
        provides: {
          ...appContext.provides,
          globalMessage: 'Hello from Modal',  // ✅ 所有子组件都可以 inject('globalMessage')
          close,                              // ✅ inject('close') 可关闭弹窗
          confirm: ok
        }
      };
      render(modalVNode, container);
    });
    return PromiseFun
  };

  return showModal;
};
