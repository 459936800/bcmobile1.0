<template>
  <div class="Profit">
    <van-row>
      <div class="top_content">
        <div>
          <div>个人盈亏（元）</div>
          <h2>{{ data1.total }}</h2>
        </div>
      </div>
    </van-row>
    <van-row>
      <div class="active tip">
        <van-icon name="info-o" />
        <div>盈亏计算公式:盈利=中奖-投注+返点</div>
      </div>
    </van-row>
    <van-row>
      <van-col :span="8">
        <div class="active">
          <div>
            <div class="title">投注金额（元）</div>
            <div class="value0">{{ data1.buy }}</div>
          </div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="active">
          <div>
            <div class="title">中奖金额（元）</div>
            <div class="value0">{{ data1.win }}</div>
          </div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="active">
          <div>
            <div class="title">充值金额（元）</div>
            <div class="value0">{{ data1.invest }}</div>
          </div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="active">
          <div>
            <div class="title">返点金额（元）</div>
            <div class="value0">{{ data1.profit }}</div>
          </div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "Profit",
  components: {},
  computed: {},
  data() {
    return {
      show: false,
      data1: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["getLiRun"]),
    init() {
      this._getLiRun();
    },
    showDialog(item) {
      this.Dialog = item;
      this.show = true;
    },
    _getLiRun() {
      let params = {
        endTime: "2020-09-02 22:22:22",
        startTime: "2020-09-31 22:22:22",
      };
      this.getLiRun(params).then((res) => {
        console.log(res);
        // Toast(res.msg);
        this.data1 = res.data;
      });
    },
  },
};
</script>
<style lang="less">
.Profit {
  .active {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
    .title {
      text-align: center;
      padding: 5px;
      font-size: 0.82em;
      color: #616161;
    }

    .value0 {
      font-size: 1em;
      color: #ff2929;
    }
  }
  .tip {
    height: 2.6em;
    background: linear-gradient(95deg, #f79112, #ec5639);
    font-size: 0.8em;
    line-height: 2.7em;
    color: #fff;
    position: relative;
  }
  .top_content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7em;
    width: 100%;
    background: linear-gradient(135deg, #e63028, #ec5639);
    color: #fff;
  }
  .van-dialog__content {
    padding: 1em;
    .title {
      padding: 0.2em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      padding: 0.2em;
      max-height: 10em;
      overflow-y: auto;
    }
  }
}
</style>