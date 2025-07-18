import { message } from "ant-design-vue";
import axios from "axios";

const service = axios.create();

const defaultConfig = {
  headers: {
    // 携带 Token
    Authorization: `Bearer askadj`,
    "Content-Type": "application/json",
  },
  // timeout: 12000,
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  method: "post",
  data: {},
};

service.interceptors.request.use(
  (config) => {
    return {
      ...defaultConfig,
      ...config,
    };
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
    console.log(error);

    const response = error.response;
    const status = response.status;
    switch (status) {
      case 401:
        break;

      default:
        break;
    }
    return error.message;
  }
);

export default service;