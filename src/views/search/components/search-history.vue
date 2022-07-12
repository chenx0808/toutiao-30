<template>
  <div>
    <van-cell title="搜索历史">
      <template #default>
        <template v-if="isDeleteStatus">
          <van-tag class="btn" type="danger" @click="deleteAll"
            >全部删除</van-tag
          >
          <van-tag class="btn" type="success" @click="isDeleteStatus = false"
            >完成</van-tag
          >
        </template>
        <van-icon
          name="delete"
          v-else
          @click="isDeleteStatus = true"
        ></van-icon>
      </template>
    </van-cell>
    <van-cell
      @click="clickHistoryTtem(item, index)"
      :title="item"
      v-for="(item, index) in SearchHistories"
      :key="index"
    >
      <template #default v-if="isDeleteStatus">
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell>
    <!-- <van-cell title="我是搜索历史">
      <template #default>
        <van-icon name="clear"></van-icon>
      </template>
    </van-cell> -->
  </div>
</template>

<script>
export default {
  name: "SearchHistory",
  props: {
    SearchHistories: {
      type: Array,
    },
  },
  data() {
    return {
      isDeleteStatus: false,
    };
  },
  methods: {
    deleteAll() {
      // 通过自定义事件让父组件进行删除操作
      this.$emit("deleteAll");
    },
    clickHistoryTtem(item, index) {
      // 点击了历史项的是 需要添加判断
      // 如果处于删除状态 点击就是删除当前项
      // 如果不处于删除状态 点击去搜索
      if (this.isDeleteStatus) {
        // 删除
        this.SearchHistories.splice(index, 1);
      } else {
        // 去搜索
        this.$emit("onSearch", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.btn {
  margin-right: 10px;
}
</style>
