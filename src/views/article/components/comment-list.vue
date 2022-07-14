<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="加载失败 点击重试"
    >
      <CommentItem
        v-for="item in list"
        :key="item.com_id"
        :comment="item"
      ></CommentItem>
      <!-- <van-cell :title="item.content" v-for="item in list" :key="item.com_id" /> -->
    </van-list>
    <!-- 评论列表 -->
  </div>
</template>

<script>
import { getComments } from "@/api/comment";
import CommentItem from "./comment-item.vue";
export default {
  name: "ArticleComment",
  props: {
    source: {
      type: [Number, String],
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      error: false,
    };
  },
  methods: {
    async onLoad() {
      try {
        const res = await getComments({
          type: "a",
          source: this.source,
          offset: this.offset,
          limit: this.limit, // 每页大小
        });
        // console.log(res);
        this.list.push(...res.data.data.results);
        //请求完数据之后 loading该变成false
        this.loading = false;
        //说明当前数据的最后一条的id和所有数据最后一条id相等-->没有数据
        // end_id：所有数据的最后一条
        if (res.data.data.last_id === res.data.data.end_id) {
          this.finished = true;
        } else {
          this.offset = res.data.data.last_id;
        }
      } catch (e) {
        // console.log(e);
        this.error = true;
        this.loading = false;
      }
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i <script 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 500);
    },
  },
  components: { CommentItem },
};
</script>

<style scoped lang="less">
.van-list {
  margin-bottom: 45px;
}
</style>
