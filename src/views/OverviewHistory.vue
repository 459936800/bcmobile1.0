<template>
  <div class="OverviewHistory">
    <!-- 彩票历史投注概览 -->
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
            <van-row v-for="(item, i) in RecordsList" :key="item.id">
              <van-cell is-link @click="toDetail(item)">
                <van-col :span="4">
                  <van-image
                    round
                    width="2.5rem"
                    height="2.5rem"
                    :src="require('../assets/image/k3.png')"
                  />
                  <span>{{ item.name }}</span>
                </van-col>
                <van-col :span="20">
                  <div>
                    <div>期号：{{ AwardList[i].lotteryNumber }}</div>
                    <!-- <div>{{ AwardList[i].lotteryTime }}</div> -->
                    <div>号码：{{ AwardList[i].lotteryValue }}</div>
                  </div>
                </van-col>
              </van-cell>
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
  name: "OverviewHistory",
  components: {},
  computed: {
    getLotteryCode() {
      switch (this.activeName) {
        // 全部则status不传，已中奖status：WIN，
        // 未中奖：UNWIN，等待开奖：CALING
        case "快三":
          return "ks";
          break;
        case "时时彩":
          return "ssc";
          break;
        case "PK10":
          return "pk10";
        default:
          return "ks";
          break;
      }
    },
  },
  data() {
    return {
      tabsList: [
        { id: 0, title: "快三", name: "快三" },
        { id: 1, title: "时时彩", name: "时时彩" },
        { id: 2, title: "PK10", name: "PK10" },
      ],
      page: 1,
      index: 0,
      isloading: true,
      refreshing: false,
      loading: false,
      finished: false,
      RecordsList: [],
      AwardList: [],
      activeName: "快三",
      userName: "",
    };
  },
  created() {
    this.onLoad();
  },
  mounted() {
    // this.init();
  },
  watch: {
    activeName(n, o) {
      this.init();
    },
    RecordsList(n, o) {
      this._getAwardsHistory();
    },
  },
  methods: {
    ...mapActions(["getLotterys", "getAwardsHistory"]),
    init() {
      this.page = 1;
      this.RecordsList = [];
      // this.onLoad();
    },
    toDetail(item) {
      this.$router.push({
        path: "AwardsHistory",
        query: { code: item.code },
      });
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
        this._getOverviewHistory();
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
    _getOverviewHistory() {
      this.isloading = true;
      let params = {
        type: this.getLotteryCode,
      };
      this.getLotterys(params).then((res) => {
        // console.log(res);
        // Toast(res.msg);
        if (res.rows && res.rows.length > 0) {
          this.RecordsList = this.RecordsList.concat(res.rows);
          this.RecordsList.map((item) => {
            item.lotteryNumber = "";
            item.lotteryTime = "";
            item.lotteryValue = "";
          });
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
    _getAwardsHistory() {
      let params = {
        code: this.RecordsList[this.index].code,
        num: 2,
      };
      this.getAwardsHistory(params).then((res) => {
        if (res.data.records.length <= 0) return;
        this.AwardList.push(res.data.records[1]);
        if (this.RecordsList.length - 1 > this.index) {
          this.index++;
          this._getAwardsHistory();
        }
      });
    },
  },
};
</script>
<style lang="less">
.OverviewHistory {
  .van-cell,
  .van-cell__value {
    display: flex;
    align-items: center;
    span {
      margin-left: 1em;
    }
  }
  .van-list {
    overflow-x: scroll;
    margin: 1em;
    .van-row {
      display: flex;
      padding-right: 1em;
      .van-col {
        width: 100vh;
        display: flex;
        align-items: center;
        .van-cell {
          width: 5rem;
          font-size: 0.5em;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .value1 {
          width: 7rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>