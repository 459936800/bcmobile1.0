<template>
  <div class="Profit">
    {{data1}}
    <van-row>
      <h3>会员您好！这是您今日的盈利总额！</h3>
    </van-row>
    <van-row>
      <van-col :span="12">
        <div class="active">
          <van-icon name="gem-o" />
          <div>
            <div class="title">盈利总额（元）</div>
            <div class="value">1000</div>
          </div>
        </div>
      </van-col>
      <van-col :span="12">
        <div class="active">
          <div>
            <div class="title">盈亏计算公式</div>
            <div class="value">盈利=中奖-投注+返点</div>
          </div>
        </div>
      </van-col>
    </van-row>
    <van-row>
      <van-col :span="8">
        <div class="active">
          <div>
            <van-icon name="gem-o" />
            <div class="title">投注</div>
            <div class="value0">0</div>
          </div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="active">
          <div>
            <van-icon name="gem-o" />
            <div class="title">中奖</div>
            <div class="value0">0</div>
          </div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="active">
          <div>
            <van-icon name="gem-o" />
            <div class="title">充值</div>
            <div class="value0">0</div>
          </div>
        </div>
      </van-col>
      <van-col :span="8">
        <div class="active">
          <div>
            <van-icon name="gem-o" />
            <div class="title">返点</div>
            <div class="value0">0</div>
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
        this._data = res;
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
    padding: 10px 5%;
    .title {
      text-align: left;
      font-size: 0.72em;
      color: #616161;
    }
    .value {
      text-align: left;
      font-size: 0.68em;
      color: #ff2929;
    }
    .value0 {
      font-size: 0.68em;
      color: #ff2929;
    }
  }

  .fr {
    float: right;
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