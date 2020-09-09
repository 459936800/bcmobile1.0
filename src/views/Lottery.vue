<template>
  <div class="Lottery">
    <div v-if="!showLottery">
      <div class="topLottery">
        <van-row>
          <van-col span="16">
            <van-tabs v-model="isActive">
              <van-tab title="我要投注"></van-tab>
              <van-tab title="最近投注"></van-tab>
            </van-tabs>
          </van-col>
          <van-col span="8">
            <van-row>
              <div class="balance">
                <span>余额：{{user.amount}}</span>
              </div>
            </van-row>
          </van-col>
        </van-row>
        <van-row style="padding-top:1em">
          <van-col span="12">
            <span>第08081700</span>
            <van-count-down :time="time" />
          </van-col>
          <van-col span="12">
            <span>08081700期开奖号码</span>
            <div>
              <!-- <i :class="'Dice Dice1'"></i>
            <i :class="'Dice Dice2'"></i>
              <i :class="'Dice Dice3'"></i>-->
              <i ref="rDice1" :class="'Dice rDice1'"></i>
              <i ref="rDice2" :class="'Dice rDice2'"></i>
              <i ref="rDice3" :class="'Dice rDice3'"></i>
            </div>
          </van-col>
        </van-row>
      </div>
      <div v-if="playTypeArr[playTypeNum]" class="Lottery-content">
        <button @click="ThreeDiceAnimation">ThreeDiceAnimation</button>
        <van-row :class="'Method Method'+classNum">
          <p class="MethodMsg">{{playTypeArr[playTypeNum].remark}}</p>
          <ul>
            <li
              ref="check_btn"
              @click="check_btn(item)"
              v-for="item of playTypeArr[playTypeNum].playTypeList"
              :key="item.id"
              :index="item.id"
              class
            >
              {{item.name}}
              <p>赔{{item.price}}</p>
            </li>
          </ul>
        </van-row>
      </div>
      <footer class="bottom">
        <table>
          <tbody>
            <tr>
              <td>每注</td>
              <td>
                <van-field
                  :disabled="bettingNumber==0"
                  @input="onInputBetting"
                  v-model="number"
                  type="number"
                />
              </td>
              <td>元</td>
              <td style="width: 1em;text-align: left;">
                <div>
                  最高可中
                  <span>{{numFilter(number*maxRatio,0)}}</span>元
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!---->
        <div class="ft0">
          <div v-if="bettingNumber!=0" @click="Refresh" class="fl">清空</div>
          <div v-else class="fl">机选</div>
          <p class="fl">
            <i style="color: rgb(255, 163, 25);">{{bettingNumber}}</i>注，
            <i style="color: rgb(255, 163, 25);">{{numFilter(number*bettingNumber,0)}}</i>元
          </p>
          <div class="f0">确认投注</div>
        </div>
      </footer>
    </div>
    <div v-else>
      <van-row class="moreLottery0">
        <p style="margin-bottom: 10px">快3</p>
        <van-row class="moreLottery1">
          <van-col span="8" @click="goToLottery(item)" v-for="item of LotterysList" :key="item.id">
            <span :class="{'active':LotteryCode==item.code}">{{item.name}}</span>
          </van-col>
        </van-row>
      </van-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";
export default {
  name: "Lottery",
  components: {},
  data() {
    return {
      isActive: 0,
      bettingNumber: 0,
      LotterysList: [
        {
          id: 0,
          code: "xyks",
          name: "幸运快3",
          pic: 0,
          tip: "5分钟1期",
        },
        {
          id: 1,
          code: "gdks",
          name: "广东快3",
          pic: 0,
          tip: "5分钟1期",
        },
        {
          id: 2,
          code: "njks",
          name: "南京快3",
          pic: 0,
          tip: "5分钟1期",
        },
      ],
      bettingList: {
        name: [],
        price: [],
      },
      SumBettingList: [],
      time: 60 * 60 * 1000,
      maxRatio: 0,
      number: 0,
      LotteryCode: -1,
      isDiceAnimation: false,
      showLottery: false,
      LotteryShortName: "",
      playTypeArr: [],
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    $route(n, o) {
      this.LotteryCode = this.$route.query.code;
      this.setLotteryShortName(this.$route.query.name.substr(0, 2));
    },
    _playtype(n, o) {
      // this.Refresh();
    },
    _showLottery(n, o) {
      this.showLottery = this._showLottery;
    },
  },
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
  methods: {
    ...mapMutations(["setLotteryShortName", "setPlayTypeColumns"]),
    ...mapActions([
      "getLotterys",
      "getPlayTypeByCode",
      "getPlayTypeDetailByCode",
      "getAwardsHistory",
      "getLast5Awards",
      "addBetting",
    ]),
    init() {
      // this._getLotterys();
      this._getPlayTypeDetailByCode();
      this._getAwardsHistory();
    },
    goToLottery(item) {
      this.LotteryCode = item.code;
      this.LotteryShortName = item.name.substr(0, 2);
      this.$router.push({
        path: "Lottery",
        query: { code: item.code, name: item.name },
      });
    },
    _addBetting() {
      let params = {
        awardNumber: "string",
        bettingAmount: 0.0,
        bettingNumber: 0,
        bettingPrice: 0.0,
        bettingTime: "string",
        bettingValue: "string",
        id: 0,
        lotteryCode: "string",
        lotteryWay: "string",
        status: "string",
        userId: 0,
      };
      this.addBetting(params).then((res) => {
        this.LotterysList = res.rows;
      });
    },
    _getLotterys() {
      let params = {
        type: "",
      };
      this.getLotterys(params).then((res) => {
        this.LotterysList = res.rows;
      });
    },
    _getLast5Awards() {
      let params = {
        code: "ahks",
      };
      this.getLast5Awards(params).then((res) => {
        console.log(res);
      });
    },
    _getAwardsHistory() {
      let params = {
        code: "ahks",
        num: 10,
      };
      this.getAwardsHistory(params).then((res) => {
        console.log(res);
      });
    },
    _getPlayTypeDetailByCode() {
      let arr = [];
      this.playTypeArr = [];

      // this.playTypeArr.map(item => {
      // 	arr.push(item.name);
      // });
      this.getPlayTypeDetailByCode({
        code: this.$route.query.code,
      }).then((res) => {
        res.data.map((item) => {
          arr.push(item.name);
          this.playTypeArr.push(item);
        });
        this.setPlayTypeColumns(arr);
      });
    },
    Refresh() {
      this.$refs.check_btn.map((item) => {
        item.classList.remove("checked");
      });
      this.bettingList = {
        name: [],
        price: [],
      };
      this.bettingNumber = 0;
      this.maxRatio = 0;
      this.number = 0;
    },
    onInputBetting(value) {
      if (this.bettingList.name.length != 0) {
        function downsort(a, b) {
          return b - a;
        }
        this.maxRatio = this.bettingList.price.sort(downsort)[0];
      }
      if (!value) return;
      this.number = parseInt(value);
      if (this.number > 100000) {
        this.number = 100000;
        Toast("目前只支持一注购买10000元");
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
        num == 3 ? (num = 0) : num;
        e.classList.value = "Dice rDice" + num;
        if (_this.isDiceAnimation) {
          _this.diceAnimation(e);
        } else {
          e.classList.value = "Dice Dice" + Math.ceil(Math.random() * 6);
        }
      }, 50);
    },
    clearDiceAnimation() {
      this.isDiceAnimation = false;
    },
    startDiceAnimation(e) {
      let _this = this;
      e.classList.value = "Dice rDice0";
      this.isDiceAnimation = true;
      this.diceAnimation(e);
      setTimeout(function () {
        _this.clearDiceAnimation();
      }, 1000);
    },
    ThreeDiceAnimation() {
      this.startDiceAnimation(this.$refs.rDice1);
      this.startDiceAnimation(this.$refs.rDice2);
      this.startDiceAnimation(this.$refs.rDice3);
    },
    check_btn(item) {
      if (this.$refs.check_btn[item.id].classList.length == 0) {
        this.bettingNumber++;
        // this.$refs.check_btn[item.id].classList.replace(
        // 	"normalBtn",
        // 	"focusBtn"
        // );
        this.$refs.check_btn[item.id].classList.add("checked");
        this.bettingList.name.push(item.name);
        this.bettingList.price.push(item.price);
      } else {
        this.$refs.check_btn[item.id].classList.remove("checked");
        this.bettingNumber--;
        this.delOne(item.name, this.bettingList.name);
        this.delOne(item.price, this.bettingList.price);
      }
      this.onInputBetting();
    },
    delOne(str, arr) {
      let index = arr.indexOf(str);
      arr.splice(index, 1);
    },
  },
};
</script>
<style lang="less">
.Lottery {
  .topLottery {
    width: 100%;
    top: 3em;
    position: fixed;
    z-index: 0;
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