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
  const showModal = (component: Component, formProps: formProps) => {
    const container = document.createElement("div");
    const appContext = _app._context;

    const { modalValue, ...rest } = formProps;
    const formState = ref({ ...modalValue });

    return new Promise((resolve, reject) => {
      const close = () => {
        render(null, container);
      };
      const modalVNode = createVNode(
        YModal,
        {
          ...modalProps,
          open: true,
          onOk: () => {
            close();
            resolve(formState || true);
          },
        },
        {
          // 将 component 渲染到 default 插槽中
          default: () =>
            createVNode(component, {
              modalValue: formState.value,
              ...rest,
            }),
        }
      );

      modalVNode.appContext = appContext;
      render(modalVNode, container);
    });
  };

  return showModal;
};
