<template>
  <div class="Home">
    <!-- 轮播 -->
    <van-swipe class="my-swipe" :autoplay="4000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <!-- 公告 -->
    <van-notice-bar
      scrollable
      left-icon="volume-o"
      color="#e53333"
      background="#fff"
      :text="Notice"
    />
    <!-- 菜单 -->
    <div class="scrollStyle">
      <router-link :to="{name:'充值中心'}">
        <div>
          <div class="defFont m0">
            <van-icon name="bill" size="1.5rem" />
          </div>
          <div style="width:4.8rem">充值</div>
        </div>
      </router-link>
      <router-link :to="{name:'提现中心'}">
        <div>
          <div class="defFont m1">
            <van-icon name="gold-coin" size="1.5rem" />
          </div>
          <div style="width:4.8rem">提现</div>
        </div>
      </router-link>
      <router-link :to="{name:'客服中心'}">
        <div>
          <div class="defFont m2">
            <van-icon name="service" size="1.5rem" />
          </div>
          <div style="width:4.8rem">客服</div>
        </div>
      </router-link>
      <router-link :to="{name:'消息中心'}">
        <div>
          <div class="defFont m3">
            <van-icon name="volume" size="1.5rem" />
          </div>
          <div style="width:4.8rem">通知</div>
        </div>
      </router-link>
      <router-link :to="{name:'我的'}">
        <div>
          <div class="defFont m0">
            <van-icon name="manager" size="1.5rem" />
          </div>
          <div style="width:4.8rem">我的</div>
        </div>
      </router-link>
    </div>
    <!-- 玩法 -->
    <van-divider />
    <van-grid :column-num="3">
      <!-- <van-col @click="toLottery" v-for="i of 9" :key="i" :index="i" span="8">
        <van-image round width="2.5rem" height="2.5rem" :src="require('../assets/image/k3.png')" />
        <p>幸运快3</p>
        <p>115分钟1期</p>
      </van-col>-->
      <van-col
        v-for="item of LotterysList"
        :key="item.id"
        :index="item.id"
        span="8"
        @click="toLottery(item)"
      >
        <van-image round width="2.5rem" height="2.5rem" :src="require('../assets/image/k3.png')" />
        <p>{{item.name}}</p>
        <p>{{item.tip}}</p>
      </van-col>
    </van-grid>
  </div>
</template>

<script>
// @ is an alias to /src

import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      Notice: "欢迎来到500",
      title: "登录",
      leftText: "彩票",
      rightText: "更多  ",
      LotterysList: [
        {
          id: 0,
          code: "xyks",
          name: "幸运快3",
          pic: 0,
          tip: "15分钟1期",
        },
        {
          id: 1,
          code: "gdks",
          name: "广东快3",
          pic: 0,
          tip: "15分钟1期",
        },
        {
          id: 2,
          code: "njks",
          name: "南京快3",
          pic: 0,
          tip: "15分钟1期",
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(n, o) {},
  },
  computed: {},
  methods: {
    ...mapActions([
      "getLotterys",
      "getActivityDetail",
      "getAdvert",
      "getHotLottery",
    ]),
    init() {
      // this._getLotterys();
      // this._getActivityDetail();
      // this._getHotLottery();
    },
    toLottery(item) {
      this.$router.push({
        path: "Lottery",
        query: { code: item.code, name: item.name },
      });
    },
    _getActivityDetail() {
      let params = {
        id: 0,
      };
      this.getActivityDetail(params).then((res) => {
        console.log(res);
      });
    },
    _getAdvert() {
      // let params = {
      //   id: 0,
      // };
      this.getAdvert().then((res) => {
        console.log(res);
      });
    },
    _getBanner() {
      this.getBanner().then((res) => {
        console.log(res);
      });
    },
    _getHotLottery() {
      this.getHotLottery().then((res) => {
        console.log(res);
      });
    },
    _getLotterys() {
      let params = {
        type: "ks",
      };
      this.getLotterys(params).then((res) => {
        res.rows.map((item) => {
          item.pic = "k3.png";
          item.tip = "1分钟1期";

          if (item.code.indexOf("ssc") != -1) item.tip = "1分钟1期";
          if (item.code.indexOf("pk10") != -1) item.tip = "15分钟1期";
          if (item.code.indexOf("k3") != -1) item.tip = "3分钟1期";
          if (item.code.indexOf("6hc") != -1) item.tip = "15分钟1期";
          if (item.code.indexOf("11x5") != -1) item.tip = "15分钟1期";

          if (item.code.indexOf("ssc") != -1) item.pic = "ssc.png";
          if (item.code.indexOf("pk10") != -1) item.pic = "pk10.png";
          if (item.code.indexOf("k3") != -1) item.pic = "k3.png";
          if (item.code.indexOf("6hc") != -1) item.pic = "6hc.png";
          if (item.code.indexOf("11x5") != -1) item.pic = "11x5.png";
        });
        this.LotterysList = res.rows;
      });
    },
  },
};
</script>
<style lang="less">
.Home {
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
    a {
      color: #000;
    }
    // img {
    //   width: 10rem !important;
    // }
  }
  .scrollStyle::-webkit-scrollbar {
    display: none;
  }
}
</style>