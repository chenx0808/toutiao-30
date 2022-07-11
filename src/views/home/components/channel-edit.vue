<template>
  <div class="channel-edit">
    <van-cell style="text-align: center" title="编辑频道"></van-cell>
    <van-cell title="我的频道">
      <template #default>
        <van-button
          type="danger"
          size="mini"
          round
          plain
          class="edit-btn"
          @click="isEdit = !isEdit"
          >{{ isEdit ? "完成" : "编辑" }}</van-button
        >
      </template>
    </van-cell>
    <van-grid :gutter="10" class="my-channel">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in userChannels"
        :key="value.id"
        @click="onMyChannelClick(value, index)"
      >
        <template #icon v-if="isEdit && index !== 0">
          <van-icon name="clear"></van-icon>
        </template>
        <template #text>
          <span class="text" :class="{ active: active === index }">{{
            value.name
          }}</span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道" :border="false"> </van-cell>
    <van-grid :gutter="10" direction="horizontal" class="recommend-channel">
      <van-grid-item
        class="channel-item"
        v-for="value in recommendChannels"
        :key="value.id"
        icon="plus"
        @click="addchannel(value)"
      >
        <template #text>
          <span class="text">{{ value.name }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {
  fethAllChannels,
  fethAddChannels,
  deleteUserChannel,
} from "@/api/channel";
import differenceBy from "lodash/differenceBy";
import { mapState } from "vuex";
import { Notify } from "vant";
import { setLocal } from "@/utils/storage";
import { USERCHANNELKEY } from "@/constants";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    userChannels: {
      type: Array,
      default: () => [],
    },
    active: {
      type: Number,
    },
  },
  data() {
    return {
      allChannel: [],
      isEdit: false,
    };
  },
  computed: {
    recommendChannels() {
      // return this.allChannel.filter((item) => {
      //   return !this.userChannels.some((userItem) => userItem.id === item.id);
      // });

      return differenceBy(this.allChannel, this.userChannels, "id");
    },
    ...mapState(["user"]),
  },
  watch: {},
  created() {
    this.loadAllChannels();
  },
  mounted() {},
  methods: {
    async loadAllChannels() {
      const res = await fethAllChannels();
      // console.log(res);
      this.allChannel = res.data.data.channels;
    },
    async addchannel(channel) {
      this.userChannels.push(channel);
      if (this.user) {
        // console.log(2);
        try {
          await fethAddChannels({
            id: channel.id,
            seq: this.userChannels.length,
          });
          this.$toast("添加成功");
        } catch (e) {
          this.$toast("添加失败");
        }
      } else {
        setLocal(USERCHANNELKEY, this.userChannels);
      }
    },
    async deleteChannel(value) {
      try {
        if (this.user) {
          await deleteUserChannel(value.id);
        } else {
          setLocal(USERCHANNELKEY, this.userChannels);
        }
        this.$toast("删除成功");
      } catch (e) {
        this.$toast("删除失败");
      }
    },
    onMyChannelClick(value, index) {
      console.log(value, index);
      if (this.isEdit) {
        if (index === 0) return Notify({ type: "danger", message: "不能删" });
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.userChannels.splice(index, 1);
        this.deleteChannel(value);
      } else {
        // 处于非编辑
        this.$emit("update-active", index, false);
      }
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  .edit-btn {
    width: 100px;
    line-height: 20px;
  }
  .channel-item .text {
    font-size: 20px;
    color: #222;
    margin-top: 0;
    &.active {
      color: red;
    }
  }
  /deep/.channel-item .van-grid-item__content {
    background-color: #f4f5f6;
  }
  /deep/.recommend-channel {
    .van-icon-plus {
      color: #222;
      font-size: 20px;
      margin-right: 5px;
    }
  }
  .my-channel {
    /deep/.van-icon-clear {
      position: absolute;
      font-size: 20px;
      right: -10px;
      top: -10px;
      color: #cacaca;
    }
  }
  /deep/.van-grid-item__icon-wrapper {
    position: unset;
  }
}
</style>
