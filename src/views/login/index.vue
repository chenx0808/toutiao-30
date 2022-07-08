<template>
  <div class="login-container">
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="cross" color="#fff" @click="tiaozhuan" />
      </template>
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <TouTiao icon="shouji" />
        </template>
      </van-field>
      <!-- type:指定输入框的类型 -->
      <!--maxlength：指定输入的最大位数  前面不加：是字符串-->
      <!-- required：是否显示必填* -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon>
          <TouTiao icon="yanzhengma" />
        </template>

        <template #button>
          <van-count-down
            @finish="isCountDownShow = false"
            v-if="isCountDownShow"
            :time="5000"
            format="ss s"
          />
          <van-button
            v-else
            size="small"
            native-type="button"
            class="send-sms-btn"
            type="primary"
            @click="sendSmsCode"
            :loading="isDisabied"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
      isCountDownShow: false,
      isDisabied: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await login(this.user);
        // console.log(values);
        // console.log(res);
        this.$store.commit("setUser", res.data.data);
        //登录成功 提示用户
        Toast.success("登录成功");
        this.$router.push("/");
      } catch (e) {
        // e >> 错误对象信息
        // if (e && e.response && e.response.data && e.response.data.message){
        //
        // }
        // 使用可选链运算符进行数据是否存在的判断
        // 为什么要判断：如果直接从undefined获取属性，会直接报错，导致程序停止进行
        Toast.fail(e?.response?.data?.message || "服务器错误");
      }
      //什么时候提示成功
      //什么时候提示失败
    },
    async sendSmsCode() {
      // 通过传入表单name值 决定校验哪个表单 validate(name?：string|string[])
      // Promise:异步解决方案 解决了什么问题？ 回调地狱-->链式调用形式-->每一天.then返回一个新的Promise
      // async await--> 链式调用（不够优雅）-->看起来是同步形式
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabied = true;

        await this.$refs.form.validate("mobile");
        // console.log("正在发送验证码");
        //button 合适的时机添加disabied
        await getSmsCode(this.user.mobile);
        //展示倒计时
        this.isCountDownShow = true;
        this.$toast.success("发送验证码成功");
      } catch (e) {
        this.$toast.fail(e.response.data.message || "出错了");
        this.isCountDownShow = false;
      } finally {
        // 不管成功或者失败都会执行的逻辑
        this.isDisabied = false;
      }
    },
    tiaozhuan() {
      this.$router.push("/my");
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  /deep/.toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 49px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
