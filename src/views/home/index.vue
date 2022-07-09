<template>
  <div class="home-container">
    <van-nav-bar title="测试" fixed>
      <template #title>
        <van-button
          icon="search"
          block
          class="search-btn"
          size="small"
          type="info"
          round
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs swipeable animated v-model="active" class="channel-tabs">
      <van-tab v-for="item in userChannels" :key="item.id" :title="item.name">
        <ArticleList :channel="item"></ArticleList>
      </van-tab>
      <!-- <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
      <van-tab title="标签 4">内容 4</van-tab> -->
      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="show = true">
          <TouTiao icon="gengduo" />
        </div>
      </template>
    </van-tabs>

    <!--弹出层 -->
    <van-popup
      v-model="show"
      style="height: 80%"
      position="bottom"
      closeable
      close-icon-position="top-left"
    >
      <!-- <van-cell style="text-align: center" title="频道编辑"></van-cell> -->
      <ChannelEdit
        :userChannels="userChannels"
        :active="active"
        @update-active="onUpdateActive"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from "@/api/channel";
import ArticleList from "./components/article-list.vue";
import ChannelEdit from "./components/channel-edit.vue";
export default {
  name: "HomePage",
  components: { ArticleList, ChannelEdit },
  props: {},
  data() {
    return {
      active: 0,
      userChannels: [],
      show: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.handleGetUserChannel();
  },
  mounted() {},
  methods: {
    async handleGetUserChannel() {
      const res = await getUserChannels();
      // console.log(res);
      this.userChannels = res.data.data.channels;
    },
    onUpdateActive(index, status) {
      this.active = index;
      this.show = status;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  padding-top: 170px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    width: 70%;
    max-width: unset;
  }
  .van-nav-bar .van-icon {
    color: #fff;
  }
  .search-btn {
    background-color: #5babfb;
  }
}
/deep/ .channel-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 82px;
  }
  .van-tab {
    border-right: 1px solid #edeff3;
    min-width: 200px;
    height: 80px;
    .van-tab__text {
      font-size: 27px;
      color: #777777;
    }
  }

  .van-tab--active .van-tab__text {
    color: #333 !important;
  }
  .van-tabs__line {
    width: 31px !important;
    height: 6px;
    background: rgba(50, 150, 250, 1);
    border-radius: 3px;
    bottom: 8px;
  }
  .van-tabs__nav {
    padding: 0;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
}
</style>
