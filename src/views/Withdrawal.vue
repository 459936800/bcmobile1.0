<template>
  <div class="Withdrawal">
    <van-form @submit="WithdrawalAmount">
      <van-field
        v-model="userName"
        name="提现人"
        label="提现人"
        placeholder="提现人"
        :rules="[{ required: true, message: '请填写提现人' }]"
      />
      <van-field
        v-model="bank_account"
        name="银行卡号"
        label="银行卡号"
        placeholder="银行卡号"
        :rules="[{ required: true, message: '请填写银行卡号' }]"
      />
      <van-field
        v-model="bank_name"
        name="银行名称"
        label="银行名称"
        placeholder="银行名称"
        :rules="[{ required: true, message: '请填写银行名称' }]"
      />
      <van-field
        v-model="bank_address"
        name="支行名称"
        label="支行名称"
        placeholder="支行名称"
        :rules="[{ required: true, message: '请填写支行名称' }]"
      />
      <van-field
        v-model="amount"
        type="number"
        name="提现金额"
        label="提现金额"
        placeholder="提现金额"
        :rules="[{ required: true, message: '请填写提现金额' }]"
      />
      <div style="margin: 16px;">
        <van-button type="danger" round block native-type="submit">确认提现</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "Withdrawal",
  components: {},
  computed: {},
  data() {
    return {
      userName: "",
      bank_account: "",
      bank_name: "",
      bank_address: "",
      amount: 0,
      isshowfield: false,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["withdraw"]),
    init() {},
    WithdrawalAmount() {
      let params = {
        userId: this.userName,
        amount: this.amount,
        bank_account: this.bank_account,
        bank_name: this.bank_name,
        bank_address: this.bank_address,
        type: "银行卡",
      };
      this.withdraw(params).then((res) => {
        console.log(res);
        Toast(res.msg);
      });
    },
  },
};
</script>
<style lang="less">
.Withdrawal {
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