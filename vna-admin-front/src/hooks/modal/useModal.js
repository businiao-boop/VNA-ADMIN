import { createVNode, getCurrentInstance, render } from 'vue';
import YModal from "@/components/YModal/index.vue";
import { Modal } from 'ant-design-vue';
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


  /**
   * 显示确认对话框
   * @param {Object} options - 配置选项
   * @param {string} options.title - 标题
   * @param {string} options.content - 内容
   * @param {string} options.okText - 确认按钮文字
   * @param {string} options.cancelText - 取消按钮文字
   * @param {string} options.type - 类型：confirm|warning|error|info
   * @returns {Promise} 返回Promise，确认时resolve，取消时reject
   */
  function showConfirm(options = {}) {
    return new Promise((resolve, reject) => {
      const {
        title = "确认操作",
        content = "确定要执行此操作吗？",
        okText = "确定",
        cancelText = "取消",
        type = "confirm",
        ...rest
      } = options;

      Modal[type]({
        title,
        content,
        okText,
        cancelText,
        onOk() {
          resolve(true);
        },
        onCancel() {
          reject(false);
        },
        ...rest
      });
    });
  }

  return {
    showModal,
    showConfirm,
  }
}
const setupModal = (app) => {
  _app = app;
}
export default setupModal;
