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
    <SearchResult v-if="isShowResult" />

    <!-- 搜索建议列表组件 -->
    <SearchSuggestion
      @onSearch="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    />

    <!-- 搜索历史组件 -->
    <SearchHistory v-else />
  </div>
</template>

<script>
import SearchHistory from "./components/search-history.vue";
import SearchSuggestion from "./components/search-suggestion.vue";
import SearchResult from "./components/search-result.vue";
export default {
  name: "SearchPage",
  components: { SearchHistory, SearchSuggestion, SearchResult },
  props: {},
  data() {
    return {
      searchText: "",
      isShowResult: false, //是否展示搜索结果页面
    };
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSearch(value) {
      // console.log(value);
      // 默认-->搜索历史
      // 输入框有值-->搜索内容
      // 按下回车-->搜索结果
      console.log("开始搜索");
      this.isShowResult = true;
      this.searchText = value;
    },
    onCancel() {
      console.log("点击了取消");
    },
  },
};
</script>

<style scoped></style>
