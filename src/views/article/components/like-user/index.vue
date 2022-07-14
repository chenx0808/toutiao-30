<template>
  <van-button class="btn" @click="changeCollected" :loading="loading">
    <template #icon>
      <van-icon
        :color="attitude === 1 ? 'red' : ''"
        :name="attitude === 1 ? 'good-job' : 'good-job-o'"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { deleteLike, addLike } from "@/api/article";
export default {
  name: "collectArticle",
  model: {
    prop: "attitude",
    event: "changeAttitude", //自定义事件名
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    attitude: {
      type: [Boolean, Number],
    },
    artId: {
      type: [Number, String],
    },
  },
  methods: {
    async changeCollected() {
      this.loading = true;
      //请求接口修改点赞的状态
      //判断是否已点赞
      try {
        if (this.attitude === 1) {
          //表明已经点赞 点击去 取消点赞
          await deleteLike(this.artId);
          // this.$emit("changeAttitude", 1);
        } else {
          //表明取消点赞  点击去 点赞
          await addLike(this.artId);
          // this.$emit("changeAttitude", -1);
        }
        //修改父组件的点赞状态-->界面更新
        this.$emit("changeAttitude", this.attitude === 1 ? -1 : 1);
        this.$toast(this.attitude === 1 ? "取消点赞" : "点赞成功");
        this.loading = false;
      } catch (e) {
        // console.log(e);
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.btn {
  border: none;
}
</style>
