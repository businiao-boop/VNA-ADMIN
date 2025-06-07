import { render, createVNode, App, Component, ref } from "vue";
import YModal from "@/components/YModal/index.vue";

let _app: App;

export const installFormModal = (app: App) => {
  _app = app;
};

type formProps = {
  modalValue: object;
  [key: string]: any;
};
export const useFormModal = (modalProps = {}) => {
  const showModal = <T>(component: Component, formProps: formProps) => {
    const container = document.createElement("div");
    const appContext = _app._context;

    const { modalValue, ...rest } = formProps;
    const formState = ref<T>({ ...modalValue } as T);

    const PromiseFun: Promise<T> = new Promise((resolve, reject) => {
      const close = () => {
        render(null, container);
      };
      const modalVNode = createVNode(component, {
        modalValue: formState.value,
        ...rest,
        onOk: (res: any) => {
          close();
          resolve(res || formState.value || true);
        }
      })

      modalVNode.appContext = appContext;
      render(modalVNode, container);
    });
    return PromiseFun
  };

  return showModal;
};
