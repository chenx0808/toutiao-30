<template>
  <div class="article-item">
    <meta name="referrer" content="no-referrer" />
    <van-cell :title="article.title" :to="`/art/${article.art_id}`">
      <template #default v-if="article.cover.type === 1">
        <van-image class="img" :src="article.cover.images[0]"></van-image>
      </template>

      <template #label>
        <div class="img-container" v-if="article.cover.type === 3">
          <van-image
            class="img-three"
            v-for="item in article.cover.images"
            :key="item"
            :src="item"
          ></van-image>
        </div>

        <div class="label-container">
          <span>{{ article.aut_name }}</span>
          <span>评论{{ article.comm_count }}</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.img {
  width: 200px;
}
.img-three {
  width: 200px;
}
.img-container {
  display: flex;
  justify-content: space-between;
}
.label-container span {
  padding-left: 15px;
}
.van-cell__label {
  line-height: 45px;
}
</style>
