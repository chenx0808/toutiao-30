//配置axios实例
import axios from "axios";
import store from "@/store";

const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
});

//设置请求拦截器
request.interceptors.request.use(
  (config) => {
    // config是当前的配置项
    // 设置token
    // 判断token 是否存在
    const token = store.state?.user?.token;

    // 判断token 是否存在  存在的话在添加请求头
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    //为了报错
    return Promise.reject(err);
  }
);
request.interceptors.response.use();

export default request;
