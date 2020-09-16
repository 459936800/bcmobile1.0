<template>
  <div class="RetrievePassword">
    <van-form @submit="onSubmit">
      <van-field
        v-model="password1"
        type="password"
        name="原密码"
        label="原密码"
        placeholder="原密码"
        :rules="[{ required: true, message: '请填写原密码' }]"
      />
      <van-field
        v-model="password2"
        type="password"
        name="新密码"
        label="新密码"
        placeholder="新密码"
        :rules="[{ required: true, message: '请填写新密码' }]"
      />
      <van-field
        v-model="password3"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="确认密码"
        :rules="[{ required: true, message: '请填写确认密码' }]"
      />
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
  name: "RetrievePassword",
  components: {},
  computed: {
    ...mapGetters({ user: "getUser" }),
  },
  data() {
    return {
      password1: "",
      password2: "",
      password3: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["resetPwd"]),
    ...mapMutations(["setToken", "setUser"]),
    init() {
      // this.getCaptchaImage();
    },
    onSubmit() {
      if (this.password3 == this.password2) {
        let params = {
          password: this.password3,
          userId: this.user.userName,
        };
        this.resetPwd(params).then((res) => {
          console.log(res);
          if ((res.code = "200")) {
            Toast("修改密码成功");
          }
        });
      } else {
        Toast("密码不相同，请重新输入");
      }
    },
  },
};
</script>
<style lang="less">
.RetrievePassword {
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