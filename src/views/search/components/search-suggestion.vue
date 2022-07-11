<template>
  <div>
    <van-cell
      @click="hanceClick(item)"
      :key="index"
      v-for="(item, index) in list"
      icon="search"
      :title="item"
    >
      <template #title>
        <div v-html="highLight(item)"></div>
      </template>
    </van-cell>
    <!-- <van-cell icon="search" title="建议"></van-cell>
    <van-cell icon="search" title="建议"></van-cell>
    <van-cell icon="search" title="建议"></van-cell>
    <van-cell icon="search" title="建议"></van-cell> -->
  </div>
</template>

<script>
import { getSearchSuggestion } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "SearchSuggestion",
  data() {
    return {
      list: [],
    };
  },
  props: {
    searchText: String,
  },
  watch: {
    // 监听搜索内容的变化-->发送请求获取搜索列表数据
    searchText: {
      handler: debounce(function (value) {
        // console.log(value);
        this.getSuggestion(value);
      }, 500),
      immediate: true, //首次也需要监听
    },
  },
  methods: {
    highLight(item) {
      const reg = new RegExp(this.searchText, "gi");
      // console.log(reg);
      //把获取到的搜索建议进行正则替换 替换成 标签+用户输入的内容  -->实现高亮效果
      return item.replace(
        reg,
        `<span style="color:red">${this.searchText}</span>`
      );
    },
    hanceClick(value) {
      console.log(value);
      this.$emit("onSearch", value);
    },
    async getSuggestion(q) {
      const res = await getSearchSuggestion(q);
      // console.log(res);
      this.list = res.data.data.options || [];
      // this.list = res.data.data.options.map((item) => {
      //   // 构建替换得正则表达式 g是全局匹配 i是忽略大小写
      //   const reg = new RegExp(this.searchText, "gi");
      //   // console.log(reg);
      //   //把获取到的搜索建议进行正则替换 替换成 标签+用户输入的内容  -->实现高亮效果
      //   return item.replace(
      //     reg,
      //     `<span style="color:red">${this.searchText}</span>`
      //   );
      // });
    },
  },
};
</script>

<style></style>
