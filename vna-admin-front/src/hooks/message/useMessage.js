import { message } from 'ant-design-vue';
const defaultConfig = {
  duration: 2,
  top: "8px",
  maxCount: 2,
  rtl: false,
  getContainer: () => document.body,
}
export function useMessage() {
  function success(msg, config) {
    const data = {
      ...defaultConfig,
      ...config,
      content: msg,
    }
    message.success(data);
  }
  function error(msg, config) {
    const data = {
      ...defaultConfig,
      ...config,
      content: msg,
    }
    message.error(data);
  }
  function warning(msg, config) {
    const data = {
      ...defaultConfig,
      ...config,
      content: msg,
    }
    message.warning(data);
  }
  function info(msg, config) {
    const data = {
      ...defaultConfig,
      ...config,
      content: msg,
    }
    message.info(data);
  }
  return {
    success,
    error,
    warning,
    info
  }
}