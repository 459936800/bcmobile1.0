<template>
  <div class="Withdrawal">
    <van-form @submit="WithdrawalAmount">
      <!-- <van-field
				v-model="userName"
				name="提现人"
				label="提现人"
				placeholder="提现人"
				:rules="[{ required: true, message: '请填写提现人' }]"
			/>-->
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
        @input="onInput"
        type="number"
        name="提现金额"
        label="提现金额"
        placeholder="提现金额"
        :rules="[{ required: true, message: '请填写提现金额' }]"
      />
      <div style="margin: 16px">
        <van-button type="danger" round block native-type="submit"
          >确认提现</van-button
        >
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
    onInput(value) {
      if (!value) return;
      this.amount = parseInt(value);
      if (this.amount > 100000) {
        this.amount = 100000;
        Toast("最多100000元");
      }
    },
    WithdrawalAmount() {
      let params = {
        amount: parseInt(this.amount),
        bankAccount: this.bank_account,
        bankName: this.bank_name,
        address: this.bank_address,
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
}
</style>