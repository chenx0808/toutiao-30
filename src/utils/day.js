import dayjs from "dayjs";

//注册中文包
import "dayjs/locale/zh-cn";

// 引入相对时间包
import relativeTime from "dayjs/plugin/relativeTime";
import Vue from "vue";

// 注册相对时间
dayjs.extend(relativeTime);

// 注册中文语言包
dayjs.locale("zh-cn");

// console.log(dayjs().format("YYYY-MM-DD"));

// 当前时间  to 目标时间
// console.log(dayjs().to(dayjs("2002-08-08")));

//定义过滤器  在components index.vue里使用
Vue.filter("relativeTime", (value) => {
  return dayjs().to(new Date(value));
});
