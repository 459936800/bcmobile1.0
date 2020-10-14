<template>
  <div class="Withdrawal">
    <van-form @submit="WithdrawalAmount">
      <van-field
				v-model="userName"
				name="真实姓名"
				label="真实姓名"
				placeholder="真实姓名"
				:rules="[{ required: true, message: '请填写真实姓名' }]"
        :disabled="userName.length>0"
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
    ...mapActions(["withdraw","myWithdraw"]),
    init() {
      this._myWithdraw()
    },
    onInput(value) {
      if (!value) return;
      this.amount = parseInt(value);
      if (this.amount > 100000) {
        this.amount = 100000;
        Toast("最多100000元");
      }
    },
    _myWithdraw(){
      let now = new Date().toJSON().split('T')[0];
      let params = {
        current: 1,
        size: 100,
        userId: 0
      };
      this.myWithdraw(params).then((res) => {
        res.data.records.map(item=>{
         if(item.approveName!=null&&item.approveName!=""){
          this.userName=item.approveName;
          return;
         }
        })
      });
    },
    WithdrawalAmount() {
      let params = {
        amount: parseInt(this.amount),
        userName: this.userName,
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