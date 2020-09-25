<template>
  <div class="Recharge">
    <div v-if="isshowfield">
      <div class="van-cell">
        <div style="text-align: left" class="van-cell__title">
          <span> 收 款 人 ：</span>
          <span id="payee">{{ CardList.name }}</span>
        </div>
        <div class="van-cell__value">
          <span
            id="payee_btn"
            @click="copyLink('payee_btn')"
            data-clipboard-target="#payee"
            class="van-tag van-tag--primary"
            >复制</span
          >
        </div>
      </div>
      <div class="van-cell">
        <div style="text-align: left" class="van-cell__title">
          <span>收款账号：</span>
          <span id="cardnum">{{ CardList.num }}</span>
        </div>
        <div class="van-cell__value">
          <span
            id="cardnum_btn"
            @click="copyLink('cardnum_btn')"
            data-clipboard-target="#cardnum"
            class="van-tag van-tag--primary"
            >复制</span
          >
        </div>
      </div>
      <div class="van-cell">
        <div style="text-align: left" class="van-cell__title">
          <span>开户支行：</span>
          <span id="zhihang">{{ CardList.address }}</span>
        </div>
        <div class="van-cell__value">
          <span
            id="zhihang_btn"
            @click="copyLink('zhihang_btn')"
            data-clipboard-target="#zhihang"
            class="van-tag van-tag--primary"
            >复制</span
          >
        </div>
      </div>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="amount"
        type="number"
        name="充值金额"
        label="充值金额"
        placeholder="充值金额"
        :rules="[{ required: true, message: '请填写充值金额' }]"
      />
      <van-button @click="RechargeAmount" type="danger" round block
        >确认充值</van-button
      >
    </div>
    <div v-else @click="isshowfield = !isshowfield">
      <van-cell is-link>
        <div>
          <!-- <van-icon name="card" size="1.5rem" /> -->
          <img
            src="https://imagenew.zxdsa.cn/Images/Common/card.png"
            class="img"
          />
        </div>
        <span>银行支付</span>
      </van-cell>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "Recharge",
  components: {},
  computed: {},
  data() {
    return {
      username: "",
      amount: 0,
      isshowfield: false,
      CardList: {
        address: "地址",
        id: 1,
        name: "名字",
        num: "12345678910",
        remark: null,
      },
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["invest", "getBankCardList"]),
    init() {
      this._getBankCardList();
    },
    copyLink(id) {
      const _this = this;
      const clipboard = new this.clipboard("#" + id);
      clipboard.on("success", () => {
        Toast({
          message: "复制成功",
          duration: 1000,
        });
      });
      clipboard.on("error", () => {
        Toast({
          message: "复制失败",
          duration: 1000,
        });
      });
      console.log(clipboard);
    },
    RechargeAmount() {
      let params = {
        bankAccount: this.username,
        amount: this.amount,
      };
      this.invest(params).then((res) => {
        console.log(res);
        Toast(res.msg);
      });
    },
    _getBankCardList() {
      this.getBankCardList().then((res) => {
        console.log(res);
        this.CardList = res.data[0];
        // Toast(res.msg);
      });
    },
  },
};
</script>
<style lang="less">
.Recharge {
  .topInfo {
    background: linear-gradient(#e53333, #ec5639);
    border-bottom-left-radius: 0.8em;
    border-bottom-right-radius: 0.8em;
    height: 3.75em;
    position: absolute;
    width: 100%;
  }
  .topCard {
    margin: auto;
    background: #fff;
    height: 6.5em;
    border-radius: 0.8em;
    position: relative;
    width: 90%;
  }
  .cardTop {
    width: 80%;
    height: 50%;
    border-radius: 0.8em;
    padding: 1.5em 2em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #fff;
    position: relative;
  }
  .useInof {
    width: 100%;
    padding-top: 0.4em;
    padding-left: 0.9em;
    text-align: left;
  }
  .cardBottom {
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .options {
    width: 80%;
    margin: auto;
    .defFont_userCenter {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 0.5em;
      color: #fff;
      height: 1.5rem;
      width: 1.5rem;
      border-radius: 0.5rem;
      line-height: 1.65em;
      text-align: center;
      font-size: 0.65em;
    }
  }
  img {
    width: auto;
    height: 2.2em;
    max-width: 2.5em;
  }
  .van-cell,
  .van-cell__value {
    display: flex;
    align-items: center;
    span {
      margin-left: 1em;
    }
  }
}
</style>