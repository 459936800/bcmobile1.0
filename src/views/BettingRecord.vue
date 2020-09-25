<template>
  <div class="BettingRecord">
    <van-tabs sticky v-model="activeName">
      <van-tab
        v-for="tab of tabsList"
        :key="tab.id"
        :title="tab.title"
        :name="tab.name"
      >
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            style="padding: 1em"
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-row v-for="item in RecordsList" :key="item.id">
              <van-col>
                <div>
                  <p>中奖状态</p>
                  <van-cell :title="_getStatus(item.status)" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>期号</p>
                  <van-cell class="value1" :title="item.awardNumber" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>彩票号码</p>
                  <van-cell :title="item.lotteryCode" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>玩法</p>
                  <van-cell :title="item.playType" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>投注</p>
                  <van-cell class="value1" :title="item.bettingValue" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>注数</p>
                  <van-cell :title="item.bettingNumber" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>每注金额</p>
                  <van-cell :title="item.bettingPrice" />
                </div>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
        <!-- v-if="RecordsList.length > 0"
        <van-empty v-else-if="!isloading" description="暂无全部数据" />
        <h3 v-else>正在加载数据稍等片刻。。。</h3> -->
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
  computed: {
    getStatus() {
      switch (this.activeName) {
        // 全部则status不传，已中奖status：WIN，
        // 未中奖：UNWIN，等待开奖：CALING
        case "全部":
          return "";
          break;
        case "等待开奖":
          return "CALING";
          break;
        case "已中奖":
          return "WIN";
          break;
        case "未中奖":
          return "UNWIN";
          break;
        default:
          return "";
          break;
      }
    },
  },
  data() {
    return {
      tabsList: [
        { id: 0, title: "全部", name: "全部" },
        { id: 1, title: "等待开奖", name: "等待开奖" },
        { id: 2, title: "已中奖", name: "已中奖" },
        { id: 3, title: "未中奖", name: "未中奖" },
      ],
      page: 1,
      isloading: true,
      refreshing: false,
      loading: false,
      finished: false,
      RecordsList: [],
      activeName: "全部",
      userName: "",
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    activeName(n, o) {
      this.init();
      this._getBettingRecord();
    },
  },
  methods: {
    ...mapActions(["getBettingRecord"]),
    init() {
      this.page = 1;
      this.RecordsList = [];
    },
    _getStatus(name) {
      switch (name) {
        // 全部则status不传，已中奖status：WIN，
        // 未中奖：UNWIN，等待开奖：CALING
        case "全部":
          return "";
          break;
        case "等待开奖":
          return "CALING";
          break;
        case "已中奖":
          return "WIN";
          break;
        case "未中奖":
          return "UNWIN";
          break;
        default:
          return "";
          break;
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log("onload");
      if (this.refreshing) {
        this.RecordsList = [];
        this.refreshing = false;
      }
      setTimeout(() => {
        this._getBettingRecord();
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据

      this.finished = false;
      this.page = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    _getBettingRecord() {
      // {"current":1,"size":30,"data":{"status":"UNWIN"}}
      // 全部则status不传，已中奖status：WIN，
      // 未中奖：UNWIN，等待开奖：CALING
      this.isloading = true;
      let params = {
        current: this.page,
        size: 10,
        data: {
          status: this.getStatus,
        },
      };
      this.getBettingRecord(params).then((res) => {
        // console.log(res);
        // Toast(res.msg);

        if (res.data.records.length > 0) {
          this.RecordsList = this.RecordsList.concat(res.data.records);
        } else {
          this.finished = true;
        }
        this.page++;
        this.isloading = false;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="less">
.BettingRecord {
  .van-list {
    overflow-x: scroll;
    .van-row {
      display: flex;
      .van-col {
        border: 1px solid;
        .van-cell {
          min-width: 4em;
        }
        .value1 {
          width: 8.5em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          border-bottom: 1px solid;
          font-size: 0.5em;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>