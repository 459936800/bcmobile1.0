<template>
  <div class="Logon">
    <van-form @submit="onSubmit">
      <van-field @click="dialogShow = !dialogShow" name="头像" label="头像">
        <template #input>
          <div class="img_div">
            <van-image
              round
              width="4rem"
              height="4rem"
              :src="imgUrl + avatar"
            />
          </div>
        </template>
      </van-field>
      <van-field
        v-model="invite"
        name="邀请码"
        label="邀请码"
        placeholder="邀请码"
        :rules="[{ required: true, message: '请填写邀请码' }]"
      />
      <van-field name="性别" label="性别">
        <template #input>
          <van-radio-group v-model="sex" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
            <van-radio name="2">未知</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="userName"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="登录密码"
        label="登录密码"
        placeholder="登录密码"
        :rules="[{ required: true, message: '请填写登录密码' }]"
      />
      <van-field
        v-model="fundPassword"
        type="password"
        name="资金密码"
        label="资金密码"
        placeholder="资金密码"
        :rules="[{ required: true, message: '请填写资金密码' }]"
      />
      <van-field
        v-model="nickName"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
        v-model="email"
        name="邮箱地址"
        label="邮箱地址"
        placeholder="邮箱地址"
        :rules="[{ required: true, message: '请填写邮箱地址' }]"
      />
      <van-field
        v-model="phonenumber"
        name="手机号码"
        label="手机号码"
        placeholder="手机号码"
        :rules="[{ required: true, message: '请填写手机号码' }]"
      />
      <div style="margin: 16px">
        <van-button type="danger" round block native-type="submit"
          >免费注册</van-button
        >
      </div>
    </van-form>
    <van-dialog v-model="dialogShow" title="头像选择">
      <van-row class="content">
        <van-col
          v-for="(item, index) of images"
          :span="6"
          :key="index"
          :index="index"
        >
          <van-image
            @click="avatar = images[index]"
            round
            width="4rem"
            height="4rem"
            :src="'http://wycc168.com/prod-api' + item"
          />
        </van-col>
        <van-col :span="6">
          <van-uploader :after-read="afterRead" :max-count="1" />
        </van-col>
      </van-row>
    </van-dialog>
    <van-overlay :show="loadingShow">
      <div class="overlay-content">
        <div>
          <van-loading type="spinner" />
          <h3>正在注册,请稍后...</h3>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "Logon",
  components: {},
  data() {
    return {
      loadingShow: false,
      dialogShow: false,
      fileList: [],
      imgUrl: $conf.imgUrl,
      avatar: "/profile/upload/2020/09/25/039912c3f13ce661e8fe102496167251.gif",
      // avatar: "u1.png",
      email: "",
      fundPassword: "",
      invite: "",
      nickName: "",
      password: "",
      phonenumber: "",
      sex: "0",
      userName: "",
      code: "",
      uuid: "更多  ",
      images: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["addUser", "upload"]),
    ...mapMutations(["setToken", "setUser"]),
    init() {
      // this.getCaptchaImage();
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      const formData = new FormData(); // 声明一个FormData对象
      formData.append("file", file.file, file.file.name);
      this.upload(formData).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.images.push(res.imgUrl);
        } else {
        }
      });
    },
    onSubmit() {
      this.loadingShow = true;
      let params = {
        avatar: this.avatar,
        userName: this.userName,
        nickName: this.nickName,
        password: this.password,
        fundPassword: this.fundPassword,
        invite: this.invite,
        email: this.email,
        sex: this.sex,
        phonenumber: this.phonenumber,
      };
      this.addUser(params).then((res) => {
        if (res.code == "200") {
          Toast("注册成功");
          setTimeout(() => {
            this.$router.push({
              path: "/Login",
            });
          }, 2000);
        } else {
          Toast(res.msg);
        }
        this.loadingShow = false;
      });
    },
  },
};
</script>
<style lang="less">
.Logon {
  .img_div {
    width: 100%;
    display: flex;
    // justify-content: center;
    align-items: center;
  }

  .content {
    padding: 1em;
  }
}
</style>