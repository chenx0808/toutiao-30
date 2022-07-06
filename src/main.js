import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
// 引入组件
import TouTiao from "@/components/TouTiao";
Vue.config.productionTip = false;

//vant注册
import Vant from "vant";

// 引入vant样式
import "vant/lib/index.less";
Vue.use(Vant);

//测试下接口是否能用
// import request from "./utils/request";
// request.get("/v1_0/channels").then((res) => {
//   console.log(res);
// });
//引入amfe-flexible
import "amfe-flexible";
// 注册全局组件
Vue.component("TouTiao", TouTiao);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
