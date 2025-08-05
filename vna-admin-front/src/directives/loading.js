/**
 * v-loading自定义指令
 * 当v-loading=true时显示antdv的Spin组件
 */
import { createApp, nextTick, h } from 'vue';
import { Spin } from 'ant-design-vue';

/**
 * 创建基于antdv Spin的loading实例
 * @param {HTMLElement} el - 目标元素
 * @param {Object} binding - 指令绑定对象
 * @returns {Object} loading实例
 */
function createLoadingInstance(el, binding) {
  const { value, modifiers, arg } = binding;

  // 获取配置参数
  const options = {
    text: '加载中...',
    spinning: true,
    size: 'default',
    fullscreen: false,
    background: 'rgba(255, 255, 255, 0.9)',
    color: '#1890ff',
    zIndex: 2000,
    ...value
  };

  // 检查是否是fullscreen模式
  if (modifiers.fullscreen) {
    options.fullscreen = true;
  }

  // 创建Spin组件实例
  const loadingApp = createApp({
    render() {
      return h(Spin, {
        spinning: true,
        size: options.size,
        tip: options.text
      });
    }
  });

  // 创建挂载容器
  const container = document.createElement('div');
  container.className = 'y-loading-directive-container';
  
  if (options.fullscreen) {
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${options.background};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${options.zIndex};
    `;
  } else {
    container.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: ${options.background};
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: ${options.zIndex};
    `;
  }

  // 挂载组件
  const instance = loadingApp.mount(container);

  return {
    app: loadingApp,
    instance,
    container,
    options
  };
}

/**
 * v-loading指令定义
 */
export const vLoading = {
  /**
   * 指令挂载时
   */
  mounted(el, binding) {
    // 存储loading实例
    el._yLoading = null;

    // 如果初始值为true，显示loading
    if (binding.value && binding.value !== false) {
      nextTick(() => {
        el._yLoading = createLoadingInstance(el, binding);

        // 设置元素样式
        if (!binding.modifiers.fullscreen) {
          el.style.position = el.style.position || 'relative';
          el.style.overflow = el.style.overflow || 'hidden';
        }

        // 添加到DOM
        if (binding.modifiers.fullscreen) {
          document.body.appendChild(el._yLoading.container);
        } else {
          el.appendChild(el._yLoading.container);
        }
      });
    }
  },

  /**
   * 指令更新时
   */
  updated(el, binding) {
    const { value, oldValue } = binding;

    // 值没有变化，直接返回
    if (value === oldValue) return;

    // 销毁旧的实例
    if (el._yLoading) {
      el._yLoading.app.unmount();
      el._yLoading.container.remove();
      el._yLoading = null;
    }

    // 如果新值为true，创建新的实例
    if (value && value !== false) {
      nextTick(() => {
        el._yLoading = createLoadingInstance(el, binding);

        // 设置元素样式
        if (!binding.modifiers.fullscreen) {
          el.style.position = el.style.position || 'relative';
          el.style.overflow = el.style.overflow || 'hidden';
        }

        // 添加到DOM
        if (binding.modifiers.fullscreen) {
          document.body.appendChild(el._yLoading.container);
        } else {
          el.appendChild(el._yLoading.container);
        }
      });
    } else {
      // 恢复元素样式
      if (!binding.modifiers.fullscreen) {
        el.style.position = '';
        el.style.overflow = '';
      }
    }
  },

  /**
   * 指令卸载时
   */
  unmounted(el) {
    if (el._yLoading) {
      el._yLoading.app.unmount();
      el._yLoading.container.remove();
      el._yLoading = null;
    }
  }
};

/**
 * 注册loading指令
 * @param {Object} app - Vue应用实例
 */
export function setupLoadingDirective(app) {
  app.directive('loading', vLoading);
}

// 默认导出指令
export default vLoading;