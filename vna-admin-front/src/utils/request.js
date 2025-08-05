import { message } from "ant-design-vue";
import axios from "axios";

const service = axios.create();

const defaultConfig = {
  headers: {
    "Content-Type": "application/json",
  },
  // timeout: 12000,
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  method: "post",
  data: {},
};

service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const mergedConfig = {
      ...defaultConfig,
      ...config,
    };
    
    if (token) {
      mergedConfig.headers = {
        ...mergedConfig.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    
    return mergedConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code == 200) {
      return res.data;
    } else {
      message.error(res.message);
      return Promise.reject(res.message);
    }
  },
  (error) => {
    if (error.response) {
      const response = error.response;
      const status = response.status;
      
      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          message.error('没有权限访问该资源');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error('请求失败：' + (response.data?.message || error.message));
          break;
      }
    } else {
      message.error('网络错误：' + error.message);
    }
    
    return Promise.reject(error);
  }
);

export default service;