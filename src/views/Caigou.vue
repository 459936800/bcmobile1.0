<template>
  <div class="Caigou">
    <van-tabs sticky v-model="activeName">
      <van-tab title="彩票" name="彩票">
        <div
          v-for="Lotterys of AllLotterys"
          :key="Lotterys.id"
          :index="Lotterys.id"
        >
          <div class="title">
            <van-icon name="fire-o" />
            <span>{{ Lotterys.title }}</span>
          </div>
          <van-grid :column-num="3">
            <van-col
              v-for="item of Lotterys.list"
              :key="item.id"
              :index="item.id"
              span="8"
              @click="toLottery(item)"
            >
              <van-image
                round
                width="2.5rem"
                height="2.5rem"
                :src="require('../assets/image/k3.png')"
              />
              <p>{{ item.name }}</p>
              <p>{{ item.tip }}</p>
            </van-col>
          </van-grid>
        </div>
      </van-tab>
      <van-tab title="体育" name="体育">
        <van-empty description="尚未开放敬请期待！" />
      </van-tab>
      <van-tab title="游戏" name="游戏">
        <van-empty description="尚未开放敬请期待！" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "Caigou",
  components: {},
  data() {
    return {
      activeName: "彩票",
      AllLotterys: [
        {
          id: 0,
          title: "幸运快三",
          list: [
            {
              id: 0,
              type: "ks",
              code: "xyks",
              name: "幸运快3",
              pic: 0,
              tip: "15分钟1期",
            },
            {
              id: 1,
              type: "ks",
              code: "gdks",
              name: "广东快3",
              pic: 0,
              tip: "15分钟1期",
            },
            {
              id: 2,
              type: "ks",
              code: "njks",
              name: "南京快3",
              pic: 0,
              tip: "15分钟1期",
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["getLotterys"]),
    init() {
      this.AllLotterys = [];
      this._getLotterys();
    },
    toLottery(item) {
      this.$router.push({
        path: "Lottery",
        query: { type: item.type, code: item.code, name: item.name },
      });
    },
    _getLotterys() {
      let typeArr = [
        { tltle: "快三", type: "ks" },
        { tltle: "时时彩", type: "ssc" },
        { tltle: "pk10", type: "pks" },
        { tltle: "11选5", type: "syxw" },
      ];
      let i = this.AllLotterys.length;
      if (i != typeArr.length) {
        let params = {
          type: typeArr[i].type,
        };
        this.getLotterys(params).then((res) => {
          // console.log(res.rows);
          let obj = {};
          obj.id = i;
          obj.title = typeArr[i].tltle;
          obj.list = res.rows;
          this.AllLotterys.push(obj);
          this._getLotterys();
        });
      }
    },
  },
};
</script>
<style lang="less">
.Caigou {
  .title {
    padding: 1em 1.5em 1em 1.5em;
    text-align: left;
    span {
      margin: 0.5em 0.5em 0.5em 0.5em;
    }
  }
  .van-sticky--fixed {
    top: 2.7em;
  }
}
</style>