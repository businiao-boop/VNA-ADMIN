import { render, createVNode, App, Component, ref, toRef } from "vue";
import YModal from "@/components/YModal/index.vue";
import YFormWrapper from "@/components/YModal/YFormWrapper.vue";

let _app: App;

export const installFormModal = (app: App) => {
  _app = app;
};

// export function useFormModal(component: Component, props?: any) {
//   return new Promise((resolve, reject) => {
//     const container = document.createElement("div");
//     const _appContext = _app._context;
//     document.body.appendChild(container);
//     const vNode = createVNode(component, {
//       modalValue: { ...props },
//       onSubmit: (data: any) => {
//         cleanup();
//         resolve(data);
//       },
//     });
//     function cleanup() {
//       render(null, container);
//       container.remove();
//     }
//     vNode.appContext = _appContext;
//     render(vNode, container);
//   });
// }
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
    console.log(createVNode(component));

    return new Promise((resolve, reject) => {
      const formRef = ref(null);
      const close = () => {
        render(null, container);
      };

      // default: () =>
      //   createVNode(YFormWrapper, {
      //     component,
      //     modalValue: formState.value,
      //     ...rest,
      //   }),
      const modalVNode = createVNode(
        YModal,
        {
          ...modalProps,
          open: true,
          onOk: () => {
            close();
            console.log(formState, "ok");

            resolve(formState || true);
          },
        },
        {
          // 将 component 渲染到 default 插槽中
          // default: () =>
          //   createVNode(component, {
          //     modalValue: formState.value,
          //     ...rest,
          //   }),
          default: () =>
            createVNode(YFormWrapper, {
              component,
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
