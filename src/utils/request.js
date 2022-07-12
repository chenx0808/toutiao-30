//配置axios实例
import axios from "axios";
import store from "@/store";
import JSONBig from "json-bigint";

const request = axios.create({
  baseURL: "http://42.192.129.12:8000",
  transformResponse: {
    function(data) {
      try {
        return JSONBig.parse(data);
      } catch (e) {
        return data;
      }
    },
  },
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

request.get("http://localhost:3000/age").then((res) => {
  console.log(res);
});

export default request;
