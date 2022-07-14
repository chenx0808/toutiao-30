<template>
  <van-button
    v-if="!isFollow"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="follow"
    :loading="isFollowLoading"
    >关注</van-button
  >
  <van-button
    :loading="isFollowLoading"
    @click="follow"
    v-else
    class="follow-btn"
    round
    size="small"
    >已关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  name: "Followuser",
  //自定义父组件通过v-model 传递过来的属性的key  事件的名称
  model: {
    prop: "isFollow", //代表自定义属性名
    event: "changeFollow", //自定义事件的名称
  },
  data() {
    return {
      isFollowLoading: false, //关注的状态
    };
  },
  props: {
    //是否关注的状态需要从父组件接收
    //作者的id，需要从父组件接收
    artId: {
      type: [Number, String],
      require: true,
    },
    //是否关注的状态 需要从父组件接收
    // isFollowed: {
    //   type: Boolean,
    //   required: true,
    // },

    //组件添加v-model
    // 目的：允许子组件直接修改父组件的值
    //1:把值通过value属性传递给子组件  --》子组件可以通过props(value)属性接收
    // 2：提供子组件一个input事件 -->修改v-model后面的值
    isFollow: {
      type: Boolean,
    },
  },
  methods: {
    async follow() {
      //sentry 错误上报
      // 开启按钮的 loading 状态
      this.isFollowLoading = true;
      try {
        // 调用接口 关注/取消 当前作者
        if (this.isFollow) {
          // 取消关注
          await deleteFollow(this.artId);
        } else {
          // 去关注
          await addFollow(this.artId);
        }
        //让当前关注的状态取反-->界面响应式更新
        // this.isFollowed = !this.isFollowed;
        this.$emit("changeFollow", !this.isFollow);
        // 关注之后进行提示
        this.$notify({
          type: "success",
          message: this.isFollow ? "取消关注" : "关注成功",
        });
        this.isFollowLoading = false;
      } catch (e) {
        console.log(e);
        this.$notify({
          type: "danger",
          message: "操作失败",
        });
        // 关闭按钮的 loading 状态
        this.isFollowLoading = false;
      }
    },
  },
};
</script>

<style></style>
