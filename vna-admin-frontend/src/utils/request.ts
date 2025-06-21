import { getToken } from "./auth";
import { message } from "ant-design-vue";

import axios, { type AxiosRequestConfig } from "axios";
import { merge } from "lodash";
const service = axios.create();

service.interceptors.request.use(
  (config) => {
    return config;
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

    const response = error.response;
    const data = response.data;

    const tipMessage = data.message?.message?.join();
    message.error(tipMessage);
    return data.message;
  }
);

type RequestFun = <T>(config: AxiosRequestConfig) => Promise<T>;
const request: RequestFun = (config) => {
  const token = getToken();
  const defaultConfig = {
    headers: {
      // 携带 Token
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    timeout: 5000,
    baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
    method: "post",
    data: {},
  };
  const mergeConfig = merge(defaultConfig, config);
  return service(mergeConfig);
};

export default request;
