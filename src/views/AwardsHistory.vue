<template>
  <div class="AwardsHistory">
    <!-- 彩票历史投注明细 -->
    <van-tabs sticky v-model="activeName" @click="onRefresh">
      <van-tab
        v-for="tab of tabsList"
        :key="tab.id"
        :title="tab.title"
        :name="tab.name"
      >
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-row v-for="item in RecordsList" :key="item.id">
              <van-col>
                <div>
                  <p>期号</p>
                  <van-cell class="value1" :title="item.lotteryNumber" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>彩票号码</p>
                  <van-cell :title="item.lotteryCode" />
                  <!-- <van-cell :title="item.lotteryCodeName" /> -->
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>开奖号码</p>
                  <van-cell :title="item.lotteryValue" />
                </div>
              </van-col>
              <van-col>
                <div>
                  <p>开奖时间</p>
                  <van-cell style="width: 100%" :title="item.lotteryTime" />
                </div>
              </van-col>
            </van-row>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "AwardsHistory",
  components: {},
  computed: {
    getAwards() {
      switch (this.activeName) {
        // 全部则status不传，已中奖status：WIN，
        // 未中奖：UNWIN，等待开奖：CALING
        case "近30期":
          return 30;
          break;
        case "近50期":
          return 50;
          break;
        case "近100期":
          return 100;
        default:
          return 30;
          break;
      }
    },
  },
  data() {
    return {
      tabsList: [
        { id: 0, title: "近30期", name: "近30期" },
        { id: 1, title: "近50期", name: "近50期" },
        { id: 2, title: "近100期", name: "近100期" },
      ],
      page: 1,
      isloading: true,
      refreshing: false,
      loading: false,
      finished: false,
      RecordsList: [],
      activeName: "近30期",
      userName: "",
    };
  },
  created() {
    this.onLoad();
  },
  mounted() {
    this.init();
  },
  watch: {
    activeName(n, o) {
      this.init();
    },
  },
  methods: {
    ...mapActions(["getAwardsHistory", "getAwardsHistoryList"]),
    init() {
      this.page = 1;
      this.RecordsList = [];
      // this.onLoad();
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      console.log("onload");
      if (this.refreshing) {
        this.RecordsList = [];
        this.refreshing = false;
      }
      this.loading = true;
      this.isloading = false;

      setTimeout(() => {
        this._getAwardsHistory();
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据

      this.finished = false;
      this.page = 1;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      if (!this.loading) this.onLoad();
    },
    _getAwardsHistory() {
      // {"current":1,"size":30,"data":{"status":"UNWIN"}}
      // 全部则status不传，已中奖status：WIN，
      // 未中奖：UNWIN，等待开奖：CALING
      this.isloading = true;
      let params = {
        code: this.$route.query.code,
        num: this.getAwards,
      };
      this.getAwardsHistory(params).then((res) => {
        // console.log(res);
        // Toast(res.msg);
        if (res.data && res.data.records.length > 0) {
          if (this.page == 1) res.data.records.shift();
          this.RecordsList = this.RecordsList.concat(res.data.records);
          this.page++;
        } else {
          this.finished = true;
          this.isloading = false;
        }
        this.finished = true;
        this.isloading = false;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="less">
.AwardsHistory {
  .van-list {
    overflow-x: scroll;
    margin: 1em;
    .van-row {
      display: flex;
      padding-right: 1em;
      .van-col {
        width: 100vh;
        border: 1px solid;
        .van-cell {
          width: 5.5rem;
          font-size: 1em;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .value1 {
          width: 7rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p {
          border-bottom: 1px solid;
          font-size: 0.8em;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>