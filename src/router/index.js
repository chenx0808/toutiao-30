import Vue from "vue";
import VueRouter from "vue-router";

// 1000个界面(有可能一次加载文件的时候就会很慢)
// 用户只能同时看一个界面  只把用户当前访问的界面返回

//第一种 直接引入登录组件 同步加载路由（按需）
// 只要页面一刷新 所有的页面数据全部一次性加载
// import Login from "@/views/login";

//第二种 直接import('路径'路由的懒加载)
// 访问到某一个路由的时候再去加载当前路由文件
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login"),
    name: "Login",
  },
  {
    path: "/demo",
    component: () => import("@/views/demo.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/search",
    component: () => import("@/views/search"),
  },
  {
    path: "/art/:articleId",
    component: () => import("@/views/article/index.vue"),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
