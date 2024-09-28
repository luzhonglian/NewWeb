import axios from "axios";
//实现一个axios实例
const service = axios.create({
  baseURL: "", // url = base url + request url
});
//`请求拦截器
service.interceptors.request.use(
  //.请求拦截
  (config) => {
    return config;
  },
  //.请求错误处理
  (error) => {
    return Promise.reject(error);
  }
);
//`响应拦截器
service.interceptors.response.use(
  (response) => {
    //.响应拦截
    return response;
  },
  (error) => {
    //.响应错误处理
    return Promise.reject(error);
  }
);
export default service;
