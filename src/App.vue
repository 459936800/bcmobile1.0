<template>
  <div id="app">
    <!-- <header class="top" :style="'width:'+screenWidth+'px'" @click="showVconsole"> -->
    <header class="top">
      <!-- <van-nav-bar
        v-if="!showTabbar&&this.$route.name!='Lottery'"
        :title="this.$route.name"
        :left-text="leftText"
        :left-arrow="leftText!=null"
        :right-text="rightText"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />-->
      <!-- Lottery -->
      <span class="modeDropdown" v-if="this.$route.name == 'Lottery'">
        <div class="van-nav-bar__left">
          <i
            @click="onback"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          >
            <!---->
          </i>
        </div>
        <p>玩法</p>
        <span @click="showPicker = true">
          {{ playTypeTitle }}
          <van-icon v-if="showPicker" name="arrow-up" />
          <van-icon v-else name="arrow-down" />
        </span>
        <!-- 彩票切换 -->
        <div @click="showLottery = !showLottery" class="van-nav-bar__right">
          {{ LotteryShortName }}
          <van-icon v-if="showLottery" name="arrow-up" />
          <van-icon v-else name="arrow-down" />
        </div>
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="playTypeColumns"
            @cancel="showPicker = false"
            @confirm="onConfirmPlaytype"
          />
        </van-popup>
      </span>
      <!-- other -->
      <span v-else>
        <div class="van-nav-bar__left">
          <i
            v-if="!showTabbar"
            @click="onback"
            class="van-icon van-icon-arrow-left van-nav-bar__arrow"
          >
            <!---->
          </i>
        </div>
        <span @click="showVconsole">
          {{ this.$route.name }}
        </span>
      </span>
    </header>
    <!-- <div class="main" :style="'height:'+screeHeight+'px;width:'+screenWidth+'px'"> -->
    <div class="main">
      <transition>
        <router-view />
      </transition>
    </div>
    <!-- 底部 -->
    <van-tabbar
      v-if="showTabbar"
      @change="onChange"
      v-model="active"
      active-color="#ea2222"
      inactive-color="#6f6f6f"
    >
      <van-tabbar-item name="Home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="Caigou" icon="gold-coin-o">彩购</van-tabbar-item>
      <van-tabbar-item name="My" icon="contact">我的</van-tabbar-item>
    </van-tabbar>
    <van-dialog
      @click="show = !show"
      v-model="show"
      title="公告"
      show-cancel-button
    >
      <van-swipe class="my-swipe" :autoplay="4000" indicator-color="#e53333">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </van-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      active: "Home",
      title: "登录",
      playTypeTitle: "和值",
      leftText: "返回",
      rightText: null,
      show: false,
      showPicker: false,
      showLottery: false,
      LotteryShortName: "幸运",
      playTypeColumns: ["和值"],
      vconsoleCounter: 10,
      screenWidth: document.body.clientWidth, // 屏幕宽
      screeHeight:
        document.documentElement.clientHeight || document.body.clientHeight, // 屏幕高
    };
  },

  computed: {
    ...mapGetters({
      _LotteryShortName: "getLotteryShortName",
      _playTypeColumns: "getPlayTypeColumns",
    }),
    showTabbar() {
      let str = "首页,彩购,我的,";
      if (str.indexOf(this.$route.name) != -1) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    $route(newVal, oldVal) {
      this.setTabber();
    },
    showLottery(newVal, oldVal) {
      this.setShowLottery(newVal);
    },
    _LotteryShortName(newVal, oldVal) {
      this.LotteryShortName = newVal;
    },
    _playTypeColumns(newVal, oldVal) {
      this.playTypeColumns = newVal;
      this.setPlaytype(this.playTypeTitle);
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["getInfo", "refreshUserInfo"]),
    ...mapMutations(["setPlaytype", "setUser", "setShowLottery"]),
    callLotteryRefresh() {
      this.$root.Bus.$emit("Lottery_Refresh");
    },
    init() {
      // let vconsole = require("./js/vconsole.min");
      // vconsole = new vconsole();
      this.playTypeTitle = this.playTypeColumns[0];
      this.setTabber();
      if (this.$route.name == "登录") return;
      this.refreshUserInfo().then((res) => {
        console.log(res);
        if (res.code != "200") return;
        const user = res.data;
        this.$comFun.cookie.setCookie("user", user);
        this.setUser(res.data);
      });
    },
    setTabber() {
      switch (this.$route.name) {
        case "首页":
          this.active = "Home";
          break;
        case "彩购":
          this.active = "Caigou";
          break;
        default:
          this.active = "My";
          break;
      }
    },
    onConfirmPlaytype(value) {
      this.playTypeTitle = value;
      this.setPlaytype(value);
      this.showPicker = false;
      this.callLotteryRefresh();
    },
    onConfirmLottery(value) {
      this.value = value;
      this.showLottery = false;
    },
    onChange(index) {
      // if (index == "My") {
      //   index = "Login";
      // }
      this.$router.push({
        path: index,
      });
    },
    onback() {
      this.$comFun.methods.back(this.$router);
    },
    onClickLeft(index) {
      // this.$router.go(-1);
      this.$router.push({
        path: "Home",
      });
    },
    onClickRight(index) {
      // Notify({ type: "primary", message: index });
    },
    showVconsole() {
      if (this.vconsoleCounter === 0) {
        // if ($conf.isTest) {
        let vconsole = require("./js/vconsole.min");
        vconsole = new vconsole();
        // }
      } else if (this.$router.app._route.name == "首页") {
        console.log(this.vconsoleCounter);
        this.vconsoleCounter--;
      }
    },
  },
};
</script>
<style  lang="less">
#app {
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  i {
    font-style: normal !important;
  }
  p {
    margin-bottom: 0.2em;
    margin-top: 0px;
  }
  .top {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2.7em;
    line-height: 2.7em;
    background: #e53333;
    color: #fff;
    z-index: 1;
    .modeDropdown {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 0.8em;
        width: 0.8em;
        line-height: 1.2em;
      }
      span {
        border-radius: 0.2em;
        border: 1px solid hsla(0, 0%, 100%, 0.5);
        vertical-align: top;
        height: 2em;
        margin: 0.6em 1em;
        line-height: 2em;
        padding: 0 0.4em;
        font-size: 0.9em;
      }
    }
    img {
      vertical-align: initial;
      margin-top: 0.49em;
      height: 2em;
    }
  }
  .main {
    width: 100%;
    margin-top: 2.65em;
    padding-bottom: 3.2em;
  }
  .my-swipe .van-swipe-item {
    font-size: 20px;
    height: 10em;
    text-align: center;
  }
  .van-swipe__indicator {
    background-color: #2c3e50;
  }
  .van-dropdown-menu__bar {
    background: #e53333;
    span {
      color: #fff;
    }
  }
}

.v-enter {
  // position: absolute;
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  // 解决页面从上往下位移问题
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.35s ease;
}
.defFont {
  margin: auto;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon {
    color: #fff;
  }
}
.m0 {
  background: linear-gradient(180deg, #fc816b, #fd6470);
}
.m1 {
  background: linear-gradient(180deg, #64caff, #4197ff);
}
.m2 {
  background: linear-gradient(180deg, #69e5a7, #4dcfa1);
}
.m3 {
  background: linear-gradient(180deg, #d78dff, #af83ff);
}
.m4 {
  background: linear-gradient(180deg, rgb(253, 201, 99), rgb(253, 168, 32));
}

.overlay-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    color: #fff;
  }
}

.van-nav-bar {
  background-color: #e53333 !important;
  .van-nav-bar__text,
  .van-nav-bar__title {
    color: #fff !important;
  }
}
</style>
