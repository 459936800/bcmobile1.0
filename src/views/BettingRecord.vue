<template>
  <div class="BettingRecord">
    <van-tabs sticky v-model="activeName">
      <van-tab title="全部" name="全部">
        <van-empty description="暂无全部数据" />
      </van-tab>
      <van-tab title="已中奖" name="已中奖">
        <van-empty description="暂无已中奖数据" />
      </van-tab>
      <van-tab title="未中奖" name="未中奖">
        <van-empty description="暂无未中奖数据" />
      </van-tab>
      <van-tab title="等待开奖" name="等待开奖">
        <van-empty description="暂无等待开奖数据" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "BettingRecord",
  components: {},
  computed: {},
  data() {
    return {
      activeName: "全部",
      userName: "",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["getBettingRecord"]),
    init() {},
    _getBettingRecord() {
      let params = {};
      this.getBettingRecord(params).then((res) => {
        console.log(res);
        Toast(res.msg);
      });
    },
  },
};
</script>
<style lang="less">
.BettingRecord {
}
</style>