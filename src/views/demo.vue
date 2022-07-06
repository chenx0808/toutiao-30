<template>
  <div>
    <!-- <p>{{ const }}</p> -->
    <h2>{{ $store.state.user.name }}</h2>
    <van-field type="number" v-model.number="num"></van-field>
    <!-- <button @click="count2">点击++</button> -->
    <button @click="countName">点击变成李四</button>
    <button @click="count1">点击传参</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
//store中定义数据
// 组件中获取数据
export default {
  data() {
    return {
      num: 0,
    };
  },
  computed: {
    ...mapState(["const"]),
  },
  methods: {
    count2() {
      // 调用mutations内部的方法，commit('mutations内部的时间名称')
      this.$store.commit("changeConst");
    },
    countName() {
      this.$store.commit("changeName");
    },
    // 可以动态传递参数
    count1() {
      this.$store.commit("changeConst1", this.num);
    },
  },
};
</script>

<style></style>
