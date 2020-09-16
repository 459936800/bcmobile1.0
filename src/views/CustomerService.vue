<template>
  <div class="CustomerService">
    <!-- <van-empty description="该功能尚未开通" /> -->
    <van-row>
      <van-cell>客服二维码</van-cell>
    </van-row>
    <van-row>
      <van-cell>
        <img src="../assets/image/twom.jpg" alt="客服二维码" />
      </van-cell>
    </van-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "CustomerService",
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
    // ...mapActions(["withdraw"]),
    init() {},
  },
};
</script>
<style lang="less">
.CustomerService {
  .van-cell__value {
    text-align: center;
  }
}
</style>