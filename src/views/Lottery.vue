<template>
  <div class="Lottery">
    <div v-show="!showLottery">
      <div class="topLottery">
        <van-row>
          <van-col span="16">
            <van-tabs v-model="isActive" @click="goToBettingRecord">
              <van-tab title="我要投注"></van-tab>
              <van-tab title="最近投注"></van-tab>
            </van-tabs>
          </van-col>
          <van-col span="8">
            <van-row>
              <div class="balance">
                <span>余额：{{ user.amount }}</span>
              </div>
            </van-row>
          </van-col>
        </van-row>
        <van-row class="LotteryNumber" style="padding-top: 1em">
          <van-col span="12">
            <!-- v-if="isLastLottery" -->
            <span>第{{ lotteryDetall.lastAwards.lotteryNumber }}</span>
            <!-- <span>第{{ lotteryDetall.newLottery.lotteryNumber }}</span> -->
            <van-count-down :time="Lotterytime" />
          </van-col>
          <van-col span="12">
            <!-- v-if="isLastLottery" -->
            <span v-if="isLastLottery"
              >{{ lotteryDetall.lastAwards.lotteryNumber }}期开奖号码</span
            >
            <span v-else
              >{{ lotteryDetall.newLottery.lotteryNumber }}期开奖号码</span
            >
            <div>
              <div v-show="!isLastLottery">
                <i :class="'Dice Dice' + DiceNum[0]"></i>
                <i :class="'Dice Dice' + DiceNum[1]"></i>
                <i :class="'Dice Dice' + DiceNum[2]"></i>
              </div>
              <div v-show="isLastLottery">
                <i ref="rDice1" :class="'Dice rDice1'"></i>
                <i ref="rDice2" :class="'Dice rDice2'"></i>
                <i ref="rDice3" :class="'Dice rDice3'"></i>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <!-- 玩法 s-->
      <div v-if="playTypeArr[playTypeNum]" class="Lottery-content">
        <!-- <button @click="ThreeDiceAnimation">ThreeDiceAnimation</button> -->
        <van-row :class="'Method Method' + classNum">
          <p class="MethodMsg">{{ playTypeArr[playTypeNum].remark }}</p>
          <ul>
            <li
              ref="check_btn"
              @click="check_btn(item)"
              v-for="item of playTypeArr[playTypeNum].playTypeList"
              :key="item.index"
              :index="item.index"
              class
            >
              {{ item.name }}
              <p>赔{{ item.price }}</p>
            </li>
          </ul>
        </van-row>
      </div>
      <!-- 玩法 e-->
      <footer class="bottom">
        <table>
          <tbody>
            <tr>
              <td>
                <!-- <van-field
									:disabled="bettingList.obj.length==0"
									@input="onInputBettingNumber"
									v-model="bettingNumber"
									type="number"
                />-->
              </td>
              <td>注</td>
              <td>
                <van-field
                  :disabled="bettingList.obj.length == 0"
                  @input="onInputBetting"
                  v-model="number"
                  type="number"
                />
              </td>
              <td>元</td>
              <td style="width: 1em; text-align: left">
                <div>
                  最高可中
                  <span>{{ numFilter(number * maxRatio, 0) }}</span
                  >元
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!---->
        <div class="ft0">
          <div v-if="bettingNumber != 0" @click="Refresh" class="fl">清空</div>
          <!-- <div v-else class="fl">机选</div> -->
          <p class="fl">
            <i style="color: rgb(255, 163, 25)">{{ bettingNumber }}</i
            >注，
            <i style="color: rgb(255, 163, 25)">{{
              numFilter(number * bettingNumber * playTypeNumber, 0)
            }}</i
            >元
          </p>
          <div @click="_buyLottery" class="f0">确认投注</div>
        </div>
      </footer>
    </div>
    <!-- 选择其他彩票种类 -->
    <div v-show="showLottery">
      <van-row
        v-for="Lotterys of AllLotterys"
        :key="Lotterys.id"
        :index="Lotterys.id"
        class="moreLottery0"
      >
        <p style="margin-bottom: 10px">{{ Lotterys.title }}</p>
        <van-row class="moreLottery1">
          <van-col
            span="8"
            @click="goToLottery(item)"
            v-for="item of Lotterys.list"
            :key="item.id"
          >
            <span :class="{ active: LotteryCode == item.code }">{{
              item.name
            }}</span>
          </van-col>
        </van-row>
      </van-row>
    </div>
    <van-overlay :show="overlayShow">
      <div class="overlay-content">
        <div>
          <van-loading type="spinner" />
          <h3>正在投注,请稍后...</h3>
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
  name: "Lottery",
  components: {},
  computed: {
    ...mapGetters({
      _playtype: "getPlaytype",
      _showLottery: "getShowLottery",
      user: "getUser",
    }),
    playTypeNum() {
      switch (this._playtype) {
        case "和值":
          return 0;
          break;
        case "三同号通选":
          return 1;
          break;
        case "三同号单选":
          return 2;
          break;
        case "三不同号":
          return 3;
          break;
        case "三连号通选":
          return 4;
          break;
        case "二同号复选":
          return 5;
          break;
        case "二同号单选":
          return 6;
          break;
        case "二不同号":
          return 7;
          break;
        default:
          return -1;
          break;
      }
    },

    classNum() {
      if (this.playTypeArr[this.playTypeNum].name.indexOf("通选") != -1)
        return 1;
      return 0;
    },
  },
  data() {
    return {
      websock: null,
      overlayShow: false,
      isActive: 0,
      AllLotterys: [
        {
          id: 0,
          title: "幸运快三",
          list: [
            {
              id: 0,
              type: "ks",
              code: "xyks",
              name: "幸运快3",
              pic: 0,
              tip: "15分钟1期",
            },
            {
              id: 1,
              type: "ks",
              code: "gdks",
              name: "广东快3",
              pic: 0,
              tip: "15分钟1期",
            },
            {
              id: 2,
              type: "ks",
              code: "njks",
              name: "南京快3",
              pic: 0,
              tip: "15分钟1期",
            },
          ],
        },
      ],
      bettingList: {
        name: [],
        price: [],
        obj: [],
      }, //玩法数组
      SumBettingList: [],
      Lotterytime: -1,
      newTime: "日",
      maxRatio: 0,
      number: 0,
      bettingNumber: 0,
      playTypeNumber: 1,
      LotteryCode: -1,
      LotteryType: "",
      isDiceAnimation: false,
      showLottery: false,
      LotteryShortName: "",
      playTypeArr: [],
      isLastLottery: false,
      isOpen: false,
      DiceNum: [6, 6, 6],
      lotteryDetall: {
        lastAwards: {
          createTime: 0,
          id: 642,
          lotteryCode: "ahks",
          lotteryNumber: "000000000",
          lotteryTime: 0,
          lotteryValue: "1,3,4",
        },
        newLottery: {
          createTime: 0,
          id: 652,
          lotteryCode: "ahks",
          lotteryNumber: "000000000",
        },
      },
    };
  },
  created() {},
  mounted() {
    this._refreshUserInfo();
  },
  destroyed() {
    console.log("destroyed");
    this.clearDiceAnimation();
    this.websock.close();
    this.websock = null;
    this.$root.Bus.$off("Lottery_Refresh");
  },
  watch: {
    $route(n, o) {
      this.LotteryCode = this.$route.query.code;
      this.LotteryType = this.$route.query.type;
      this.setLotteryShortName(this.$route.query.name.substr(0, 2));
    },
    _playtype(n, o) {
      // this.Refresh();
    },
    _showLottery(n, o) {
      this.showLottery = this._showLottery;
    },
    Lotterytime(n, o) {
      // console.log(n);
    },
  },

  methods: {
    ...mapMutations(["setUser", "setLotteryShortName", "setPlayTypeColumns"]),
    ...mapActions([
      "getLotterys",
      "getInfo",
      "refreshUserInfo",
      "getPlayTypeByCode",
      "getPlayTypeDetailByCode",
      "getAwardsHistory",
      "getLast5Awards",
      "addBetting",
      "buyLottery",
    ]),

    init() {
      let _this = this;
      this.AllLotterys = [];
      this.LotteryCode = this.$route.query.code;
      this.LotteryType = this.$route.query.type;
      this.$root.Bus.$off("Lottery_Refresh");
      this.$root.Bus.$on("Lottery_Refresh", () => {
        _this.Refresh();
      });
      // this._getLast5Awards();
      this.getNewLotterys();
      this.ThreeDiceAnimation();
      this._getPlayTypeDetailByCode();
      this._getLotterys();
    },
    getNewLotterys() {
      //初始化weosocket
      this.initWebSocket(this.user.userName);
    },
    _refreshUserInfo() {
      this.refreshUserInfo().then((res) => {
        if (res.code != "200") return;
        const user = res.data;
        this.$comFun.cookie.setCookie("user", user);
        this.setUser(res.data);
        this.init();
      });
    },
    //设置快三期号与中奖号码
    setLotterysDetall() {
      try {
        // let new_t = this.$comFun.methods.getTimer(
        //   this.$comFun.methods
        //     .stringToDate(this.lotteryDetall.newLottery.lotteryTime)
        //     .getTime()
        // );
        if (!this.lotteryDetall.lastAwards) return;
        let last_t = this.$comFun.methods.getTimer(
          this.$comFun.methods
            .stringToDate(this.lotteryDetall.lastAwards.lotteryTime)
            .getTime(),
          this.$comFun.methods
            .stringToDate(this.lotteryDetall.systemTime)
            .getTime()
        );
        this.newTime = this.lotteryDetall;
        // 计算如果最新数据还没,前端续一分钟
        if (last_t.mss <= 0 && this.Lotterytime <= 0) {
          this.isLastLottery = true;
          this.Lotterytime = 1000 * 61;
        } else if (this.Lotterytime <= 0) {
          this.Lotterytime = last_t.mss;
        }
        // 30秒后开始要骰子
        if (this.Lotterytime > 1000 * 30) {
          this.isLastLottery = false;
          this.DiceNum = this.lotteryDetall.newLottery.lotteryValue.split(",");
        } else {
          this.isLastLottery = true;
        }

        this.Lotterytime = this.Lotterytime - 1000;

        console.log(this.Lotterytime);
        console.log(this.lotteryDetall.lastAwards.lotteryTime);
        console.log(this.lotteryDetall.lastAwards.lotteryNumber);
        // console.log(this.lotteryDetall.newLottery.lotteryTime);
        // this.isLastLottery = false;
        // this.Lotterytime = last_t.mss;
        // console.log(this.lotteryDetall.lastAwards);
        // console.log(last_t.timer);
        // console.log(this.lotteryDetall.newLottery.lotteryNumber);
      } catch (error) {
        console.error(error);
        this.isLastLottery = true;
        this.websock.close();
        setTimeout(() => {
          this.initWebSocket(this.user.userName);
        }, 5000);
      }
    },
    goToLottery(item) {
      this.LotteryCode = item.code;
      this.LotteryType = item.type;
      this.LotteryShortName = item.name.substr(0, 2);
      this.$router.push({
        path: "Lottery",
        query: { type: item.type, code: item.code, name: item.name },
      });
      location.reload();
    },
    goToBettingRecord(e) {
      if (e != 1) return;
      this.$router.push({
        path: "BettingRecord",
      });
    },
    PlayTypeFilter() {
      let obj = {
        state: false,
        msg: "不通过",
      };
      switch (this._playtype) {
        case "三不同号":
          if (this.bettingNumber == 3) {
            obj.state = true;
            obj.msg = "通过";
          } else {
            obj.msg = "该玩法需要只选3个号码。";
          }
          break;
        default:
          obj.state = true;
          obj.msg = "通过";
          break;
      }
      return obj;
    },
    _buyLottery() {
      let now = new Date().toJSON();
      let params = [];
      let numArr = [];
      let Filter = this.PlayTypeFilter();
      if (!Filter.state) {
        Toast(Filter.msg);
        return;
      }
      if (params.length <= 0 && this.number <= 0) {
        Toast("请选择玩法和输入金额再确认投注！");
        return;
      }
      this.overlayShow = true;
      // bettingValue: "2";
      // playTypeCode: "2";
      this.bettingList.obj.map((item) => {
        if (this._playtype == "三不同号") {
          numArr.push(parseInt(item.name));
        } else {
          let param = {
            bettingAmount: this.number,
            // bettingNumber: this.bettingNumber,
            bettingNumber: 1,
            bettingTime: now,
            bettingValue: item.name,
            lotteryCode: this.LotteryCode,
            lotteryNumber: this.lotteryDetall.newLottery.lotteryNumber,
            lotteryWay: this.playTypeArr[this.playTypeNum].lotteryCode,
            playType: this.playTypeArr[this.playTypeNum].code,
            playTypeCode: item.code,
          };
          params.push(param);
        }
      });
      if (params.length <= 0) {
        numArr.sort((a, b) => {
          const end = a - b;
          return end;
        });
        numArr.join(",");
        let param = {
          bettingAmount: this.number,
          // bettingNumber: this.bettingNumber,
          bettingNumber: 1,
          bettingTime: now,
          bettingValue: numArr.join(","),
          lotteryCode: this.LotteryCode,
          lotteryNumber: this.lotteryDetall.newLottery.lotteryNumber,
          lotteryWay: this.playTypeArr[this.playTypeNum].lotteryCode,
          playType: this.playTypeArr[this.playTypeNum].code,
          playTypeCode: this.bettingList.obj[0].code,
        };
        params.push(param);
      }
      console.log(params);
      this.buyLottery(params).then((res) => {
        this.overlayShow = false;
        if (res.code != "200") return;
        Toast("投注成功！");
        // console.log(res);
        this.refreshUserInfo().then((res) => {
          console.log(res);
          if (res.code != "200") return;
          const user = res.data;
          this.$comFun.cookie.setCookie("user", user);
          this.setUser(res.data);
        });
      });
    },
    // _addBetting() {
    // 	let now = new Date().toJSON();
    // 	let playTypeCode = "";
    // 	this.bettingList.obj.map(item => {
    // 		if (item.price == this.maxRatio) playTypeCode = item.code;
    // 	});
    // 	console.log(now);
    // 	let params = {
    // 		awardNumber: this.lotteryDetall.newLottery.lotteryNumber,
    // 		bettingAmount: this.number,
    // 		bettingNumber: this.bettingNumber,
    // 		bettingTime: now,
    // 		bettingValue: this.bettingList.name.join(","),
    // 		// lotteryCode: this.LotteryCode,
    // 		lotteryCode: "ahks",
    // 		lotteryNumber: this.lotteryDetall.newLottery.lotteryNumber,
    // 		lotteryWay: this.playTypeArr[this.playTypeNum].lotteryCode
    // 	};

    // 	this.addBetting(params).then(res => {
    // 		console.log(res);
    // 	});
    // },
    _getPlayTypeDetailByCode() {
      let arr = [];
      this.playTypeArr = [];
      this.getPlayTypeDetailByCode({
        code: this.LotteryType,
      }).then((res) => {
        console.log(res);

        res.data.map((item) => {
          arr.push(item.name);
          item.playTypeList.map((item0, index) => {
            item0.index = index;
          });
          this.playTypeArr.push(item);
        });
        this.setPlayTypeColumns(arr);
      });
    },
    _getLotterys() {
      let typeArr = [
        { tltle: "快三", type: "ks" },
        { tltle: "时时彩", type: "ssc" },
        { tltle: "pk10", type: "pks" },
        { tltle: "11选5", type: "syxw" },
      ];
      let i = this.AllLotterys.length;
      if (i != typeArr.length) {
        let params = {
          type: typeArr[i].type,
        };
        this.getLotterys(params).then((res) => {
          // console.log(res.rows);
          let obj = {};
          obj.id = i;
          obj.title = typeArr[i].tltle;
          obj.list = res.rows;
          this.AllLotterys.push(obj);
          this._getLotterys();
        });
      }
    },
    _getLast5Awards() {
      let params = {
        code: "ahks",
      };
      this.getLast5Awards(params).then((res) => {
        console.log(res);
      });
    },
    // _getAwardsHistory() {
    //   let params = {
    //     code: "ahks",
    //     num: 10,
    //   };
    //   this.getAwardsHistory(params).then((res) => {
    //     console.log(res);
    //   });
    // },

    Refresh() {
      this.$refs.check_btn.map((item) => {
        item.classList.remove("checked");
      });
      this.bettingList = {
        name: [],
        price: [],
        obj: [],
      };
      this.bettingNumber = 0;
      this.playTypeNumber = 1;
      this.number = 0;
      this.maxRatio = 0;
    },
    downsort(a, b) {
      return b - a;
    },
    onInputBetting(value) {
      this.bettingList.obj.length == 0 ? (this.number = 0) : null;
      if (this.bettingList.name.length != 0) {
        this.maxRatio = this.bettingList.price.sort(this.downsort)[0];
      }
      if (!value) return;
      this.number = parseInt(value);
      if (this.number > 100000) {
        this.number = 100000;
        Toast("目前只支持一注购买10000元");
      }
    },
    onInputBettingNumber(value) {
      if (this.bettingList.name.length != 0) {
        this.maxRatio = this.bettingList.price.sort(this.downsort)[0];
      }
      if (!value) return;
      this.bettingNumber = parseInt(value);
      if (this.bettingNumber > 100) {
        this.bettingNumber = 100;
        Toast("目前只支持100注");
      }
    },
    numFilter(value, num = 2) {
      const realVal = parseFloat(value).toFixed(num);
      return realVal;
    },
    diceAnimation(e) {
      let t;
      let _this = this;
      clearTimeout(t);
      t = setTimeout(function () {
        let num =
          parseInt(e.classList.value.substring(e.classList.value.length - 1)) +
          1;
        let _num = Math.ceil(Math.random() * 3 - 1);
        num == _num ? (num = _num + 1) : _num;
        num == 3 ? (num = 0) : num;
        e.classList.value = "Dice rDice" + Math.abs(num);
        if (_this.isDiceAnimation) {
          _this.diceAnimation(e);
        } else {
          e.classList.value = "Dice Dice" + Math.ceil(Math.random() * 6);
        }
      }, 150);
    },
    clearDiceAnimation() {
      this.isDiceAnimation = false;
    },
    startDiceAnimation(e) {
      let _this = this;
      e.classList.value = "Dice rDice0";
      this.isDiceAnimation = true;
      this.diceAnimation(e);
      // setTimeout(function () {
      //   _this.clearDiceAnimation();
      // }, 1000);
    },
    ThreeDiceAnimation() {
      this.startDiceAnimation(this.$refs.rDice1);
      this.startDiceAnimation(this.$refs.rDice2);
      this.startDiceAnimation(this.$refs.rDice3);
    },
    check_btn(item) {
      if (this.$refs.check_btn[item.index].classList.length == 0) {
        this.bettingNumber++;
        this.$refs.check_btn[item.index].classList.add("checked");
        this.bettingList.obj.push(item);
        this.bettingList.name.push(item.name);
        this.bettingList.price.push(item.price);
      } else {
        this.bettingNumber--;
        this.$refs.check_btn[item.index].classList.remove("checked");
        for (var i = 0; i < this.bettingList.obj.length; i++) {
          if (this.bettingList.obj[i].name == item.name) {
            this.bettingList.obj.splice(i, 1);
          }
        }
        this.delOne(item.name, this.bettingList.name);
        this.delOne(item.price, this.bettingList.price);
      }
      this.onInputBetting();
    },
    delOne(str, arr) {
      let index = arr.indexOf(str);
      arr.splice(index, 1);
    },
    initWebSocket(userId = 0) {
      //初始化weosocket
      // code jzks  ahks

      console.log("初始化weosocket");
      const wsuri =
        $conf.wsUrl + "ws/lottery/" + this.LotteryCode + "/" + userId;
      console.log(wsuri);
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      console.log("onOpen");
      // let actions = { test: '12345' };
      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror() {
      console.log("onError");
      //连接建立失败重连
      // this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
      if (this.$route.name != "Lottery") this.websock.close();
      let str = e.data;
      console.log(JSON.parse(str));
      if (str.length > 2) {
        this.lotteryDetall = JSON.parse(str);
      }
      this.setLotterysDetall();
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    },
  },
};
</script>
<style lang="less">
.Lottery {
  .topLottery {
    width: 100%;
    top: 2.7em;
    position: fixed;
    z-index: 0;
    .LotteryNumber {
      span {
        font-size: 0.75em;
      }
    }
    .van-count-down {
      margin: auto;
      color: #e53333;
      font-size: 1.5em;
      text-align: center;
    }
    .van-col,
    .van-row,
    .van-tabs__nav {
      background: #f7f7f7;
    }
  }
  .Lottery-content {
    margin-top: 11em;
    margin-bottom: 3.5em;
    width: 100%;

    * {
      z-index: -1;
    }
  }
  .Method {
    // vertical-align: middle;
    width: 100%;
    margin: 0 auto;
    height: auto;
    color: #dc3b40;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    .MethodMsg {
      min-width: 80%;
      font-size: 0.7em;
      height: auto;
      line-height: 1.5em;
      padding: 0 2.2em;
      color: #222;
      word-break: break-all;
    }
    ul li {
      vertical-align: top;
      display: inline-block;
      text-align: center;
      background: #fff;
      border: 1px solid #ddd;
    }
    .checked {
      color: #fff !important;
      background: #dc3b40 !important;
      border-color: #c92020 !important;
      p {
        color: #fff;
      }
    }
  }

  .Method0 {
    li {
      width: 4.1rem;
      height: 2.2em;
      padding-top: 0.3em;
      overflow: hidden;
      margin: 0.2em 0.3em;
      line-height: 1.22em;
      border-radius: 0.2rem;
      font-size: 1.5em;
      p {
        margin-top: 0.2em;
        font-size: 0.6em;
        line-height: 1.2em;
        color: #444;
      }
    }
  }
  .Method1 {
    li {
      width: 7.1rem;
      height: 2.2em;
      padding-top: 0.3em;
      overflow: hidden;
      margin: 0.2em 0.3em;
      line-height: 1.22em;
      border-radius: 0.2rem;
      font-size: 1em;
      p {
        margin-top: 0.2em;
        font-size: 0.6em;
        line-height: 1.2em;
        color: #444;
      }
    }
  }
  footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    .bottom {
      height: auto;
      background: #333;
      z-index: 2;
      width: 100%;
      height: 2.5em;
      background: #f9f9f9;
    }
    table {
      width: 100%;
      background: #fff;
      color: #000;
      tr {
        font-size: 1.1em;
        height: 3.2em;
        display: table-row;
        vertical-align: inherit;
        border-color: inherit;
        td {
          .van-cell {
            padding: 0;
          }
          text-align: center;
          display: table-cell;
          vertical-align: inherit;
          width: 14%;
        }
      }
    }
    tbody {
      display: table-row-group;
      vertical-align: middle;
      border-color: inherit;
    }
    .van-field__control {
      border: 1px #ddd solid;
      border-radius: 0.2rem;
      height: 2.2em;
      width: 5.3em;
      text-align: center;
    }
    .ft0 {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #000;
      color: #fff;
      .fl {
        flex-direction: column;
        width: 100%;
      }
      .f0 {
        width: 100%;
        background: #e53333;
        height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
  .van-tabs__wrap,
  .balance {
    height: 2em !important;
    span {
      font: 10px sans-serif;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .van-tabs__content {
    width: 150%;
  }
  .moreLottery0 {
    padding: 1.5em;
    p {
      text-align: left;
    }
  }
  .moreLottery1 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    .van-col {
      padding: 0.25em 0;
      height: 3em;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      span {
        width: 6em;
        color: #777;
        text-align: center;
        border: 1px solid #ddd;
        padding: 0.25em 0;
        border-radius: 0.2em;
      }
      .active {
        color: #e72145;
        border: 1px solid #e72145;
      }
    }
  }
  .balance {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .Dice {
    background-image: url(../assets/image/diceK3.png);
    display: inline-block;
    background-size: 200% 600%;
    vertical-align: middle;
    width: 2em;
    height: 2em;
  }
  .Dice1 {
    background-position: 0 0;
  }
  .Dice2 {
    background-position: 0 -100%;
  }
  .Dice3 {
    background-position: 0 -200%;
  }
  .Dice4 {
    background-position: 0 -300%;
  }
  .Dice5 {
    background-position: 0 -400%;
  }
  .Dice6 {
    background-position: 0 -500%;
  }
  .rDice0 {
    background-position: -100% -0%;
  }
  .rDice1 {
    background-position: -100% -100%;
  }
  .rDice2 {
    background-position: -100% -200%;
  }
  .rDice3 {
    background-position: -100% -300%;
  }
}
</style>