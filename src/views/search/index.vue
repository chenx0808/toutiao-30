<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isShowResult = false"
      />
    </form>

    <!-- 搜索结果页 -->
    <SearchResult v-if="isShowResult" :searchText="searchText" />

    <!-- 搜索建议列表组件 -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    />

    <!-- 搜索历史组件 -->
    <SearchHistory
      v-else
      :SearchHistories="SearchHistories"
      @onSearch="onSearch"
      @deleteAll="deleteAll"
    />
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
import { setLocal } from "@/utils/storage";
import { HISTORYKEY } from "@/constants";
import { getLocal } from "@/utils/storage";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false, //是否展示搜索结果页面
      SearchHistories: getLocal(HISTORYKEY) || [], //搜索历史列表
    };
  },
  computed: {},
  watch: {
    SearchHistories(val) {
      setLocal(HISTORYKEY, val);
    },
  },
  created() {},
  methods: {
    onSearch(value) {
      // console.log(value);
      // 默认-->搜索历史
      // 输入框有值-->搜索内容
      // 按下回车-->搜索结果
      // console.log("开始搜索");
      this.isShowResult = true;
      // 搜索结果页面展示
      this.searchText = value;
      // 添加之前  先判断value是否已经在搜索历史列表里面
      const index = this.SearchHistories.indexOf(value);
      // console.log(index);
      if (index !== -1) {
        // 找到的这项删除
        this.SearchHistories.splice(index, 1);
      }
      this.SearchHistories.unshift(value);
    },
    onCancel() {
      console.log("点击了取消");
      this.$router.push("/home");
    },
    deleteAll() {
      this.SearchHistories = [];
    },
  },
};
</script>

<style scoped></style>
