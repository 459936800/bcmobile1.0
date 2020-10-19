<template>
  <div class="Remember">
    <van-form @submit="onSubmit">

      <van-field
        v-model="RememberValue"
        type="text"
        name=""
        :label="radio"
        :placeholder="radio"
        :rules="[{ required: true, message: '请填写'+radio }]"
      />
      <van-cell>
        <van-radio-group v-model="radio" direction="horizontal">
          <van-radio name="账号">账号</van-radio>
          <van-radio name="手机号码">手机号码</van-radio>
          <van-radio name="邮箱地址">邮箱地址</van-radio>
        </van-radio-group>
      </van-cell>
      <div style="margin: 16px;">
        <van-button type="danger" round block native-type="submit">确认修改</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "Remember",
  components: {},
  computed: {
    ...mapGetters({ user: "getUser" }),
    getType(){
      switch (this.radio) {
        case "账号":
          return "account";
          break;
        case "手机号码":
          return "phone";
          break;
        case "邮箱地址":
          return "mail";
          break;
        default:
          return "";
          break;
      }
    },
  },
  data() {
    return {
      radio:'邮箱地址',
      RememberValue:"",
      form1:{

      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["resetPwd","remember","resetPassword"]),
    ...mapMutations(["setToken", "setUser"]),
    init() {
      // this.getCaptchaImage();
    },
    onSubmit() {
        let type = this.getType
        // let params = {
        //   account: this.RememberValue,
        //   type: type,
        // };
        let params = {
          password: this.RememberValue,
          userId: 35,
        };
        // this.remember(params).then((res) => {
        this.resetPassword(params).then((res) => {
          console.log(res);
          if (res.code == "200") {
            Toast(res.msg);
          }
        });
    },
  },
};
</script>
<style lang="less">
.Remember {
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .scrollStyle {
    overflow-y: hidden;
    overflow-x: scroll;
    display: flex;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-align: center;
    align-items: center;
    // img {
    //   width: 10rem !important;
    // }
  }
  .scrollStyle::-webkit-scrollbar {
    display: none;
  }
  // .van-nav-bar {
  //   background-color: #fff !important;
  // }
  .van-icon,
  .van-nav-bar__text,
  .van-nav-bar__title {
    color: #000 !important;
  }
}
</style>