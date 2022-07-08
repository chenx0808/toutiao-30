import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const tokenkey = "totiao_token";
import { getLocal, setLocal } from "@/utils/storage";
export default new Vuex.Store({
  // 用于储存全局状态的数据
  state: {
    user: getLocal(tokenkey),
  },

  getters: {},
  // 修改状态的唯一入口
  // 是允许有同步状态
  mutations: {
    // 第一个参数是仓库的状态
    //可以接收参数
    setUser(state, user) {
      state.user = user;
      setLocal(tokenkey, user);
    },
  },
  // 异步状态修改
  actions: {},
  modules: {},
});
