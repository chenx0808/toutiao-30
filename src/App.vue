<template>
  <div id="app">
    <!-- <i class="toutiao toutiao-wode"></i> -->
    <!-- <TouTiao icon="wode" />
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="box">黑马</div> -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped lang="less">
.box {
  font-size: 10px;
}
</style>
