<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="success"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="出错了"
      >
        <ArticleItem
          :article="item"
          v-for="item in list"
          :key="item.art_id"
        ></ArticleItem>
        <!-- <van-cell
          v-for="(item, index) in list"
          :key="index"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
import ArticleItem from "../../../components/article-item/index.vue";
export default {
  name: "ArticleList",
  components: { ArticleItem },
  props: {
    channel: {
      type: Object,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isRefreshLoading: true,
      success: "刷新成功了",
    };
  },
  methods: {
    async onLoad() {
      try {
        const res = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1,
        });
        // console.log(res);
        this.list = [...this.list, ...res.data.data.results];
        this.loading = false;
        if (res.data.data.results.length === 0) {
          this.finished = true;
        } else {
          this.timestamp = res.data.data.pre_timestamp;
        }
      } catch (e) {
        console.log(e);
        this.error = true;
        this.loading = false;
      }
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1);
      //   }
      //   // 加载状态结束
      //   this.loading = false;
      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true;
      //   }
      // }, 1000);
    },
    async onRefresh() {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.list = [...res.data.data.results, ...this.list];
      this.isRefreshLoading = false;
      this.success = `更新了${res.data.data.results.length}条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.artcile-list {
  height: 79vh;
  overflow: auto;
}
</style>
