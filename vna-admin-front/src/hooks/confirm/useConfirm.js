import { Modal } from 'ant-design-vue';

/**
 * 确认对话框hooks
 * @returns {Object} 包含confirm方法的对象
 */
export const useConfirm = () => {
  /**
   * 显示确认对话框
   * @param {Object} options - 配置选项
   * @param {string} options.title - 标题
   * @param {string} options.content - 内容
   * @param {string} options.okText - 确认按钮文字
   * @param {string} options.cancelText - 取消按钮文字
   * @param {string} options.type - 类型：confirm|warning|error|info
   * @param {Function} options.onOk - 确认回调
   * @param {Function} options.onCancel - 取消回调
   * @returns {Promise} 返回Promise，确认时resolve，取消时reject
   */
  const confirm = (options = {}) => {
    return new Promise((resolve, reject) => {
      const {
        title = "确认操作",
        content = "确定要执行此操作吗？",
        okText = "确定",
        cancelText = "取消",
        type = "confirm",
        onOk,
        onCancel,
        ...rest
      } = options;

      Modal[type]({
        title,
        content,
        okText,
        cancelText,
        onOk() {
          if (onOk && typeof onOk === "function") {
            onOk();
          }
          resolve(true);
        },
        onCancel() {
          if (onCancel && typeof onCancel === "function") {
            onCancel();
          }
          reject(false);
        },
        ...rest
      });
    });
  };

  /**
   * 显示删除确认对话框
   * @param {Object} options - 配置选项
   * @returns {Promise} 返回Promise
   */
  const confirmDelete = (options = {}) => {
    return confirm({
      title: "删除确认",
      content: "确定要删除此记录吗？此操作不可恢复！",
      okType: "danger",
      ...options
    });
  };

  /**
   * 显示成功确认对话框
   * @param {Object} options - 配置选项
   * @returns {Promise} 返回Promise
   */
  const confirmSuccess = (options = {}) => {
    return confirm({
      title: "操作确认",
      content: "确定要执行此操作吗？",
      type: "info",
      ...options
    });
  };

  /**
   * 显示错误确认对话框
   * @param {Object} options - 配置选项
   * @returns {Promise} 返回Promise
   */
  const confirmError = (options = {}) => {
    return confirm({
      title: "危险操作",
      content: "此操作可能存在风险，确定要继续吗？",
      type: "error",
      okType: "danger",
      ...options
    });
  };

  return {
    confirm,
    confirmDelete,
    confirmSuccess,
    confirmError
  };
};

export default useConfirm;