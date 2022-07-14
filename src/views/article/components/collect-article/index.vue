<template>
  <van-button class="btn" @click="changeCollected" :loading="loading">
    <template #icon>
      <van-icon
        :color="isCollected ? 'red' : ''"
        :name="isCollected ? 'star' : 'star-o'"
      ></van-icon>
    </template>
  </van-button>
</template>

<script>
import { deleteCollect, addCollect } from "@/api/article";
export default {
  name: "collectArticle",
  model: {
    prop: "isCollected",
    event: "changeCollected", //自定义事件名
  },
  data() {
    return {
      loading: false,
    };
  },
  props: {
    isCollected: {
      type: Boolean,
    },
    artId: {
      type: [Number, String],
    },
  },
  methods: {
    async changeCollected() {
      this.loading = true;
      //请求接口修改收藏的状态
      //判断是否已收藏
      try {
        if (this.isCollected) {
          //表明已经收藏 点击去 取消收藏
          await deleteCollect(this.artId);
        } else {
          //表明取消收藏 点击去 收藏
          await addCollect(this.artId);
        }
        //修改父组件的收藏状态-->界面更新
        this.$emit("changeCollected", !this.isCollected);
        this.$toast(this.isCollected ? "取消收藏" : "收藏成功");
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
