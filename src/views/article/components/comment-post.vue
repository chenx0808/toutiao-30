<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button class="post-btn" size="small" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "PostComment",
  components: {},
  props: {
    target: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      //loaing效果
      this.$toast.loading({
        duration: 0, //表示toast不会消失
        forbidClick: true, //禁用背景点击
      });
      try {
        //点击发布评论的时候调用接口发布评论
        const res = await addComment({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: null, // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        });
        //成功的提示
        this.$toast.success("发布评论成功");
        console.log(res);
      } catch (e) {
        this.$toast.success("发布评论失败");
        console.log(e);
      }
    },
  },
};
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
