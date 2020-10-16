<template>
	<div class="BettingRecord">
		<van-tabs sticky v-model="activeName" @click="onRefresh">
			<van-tab v-for="tab of tabsList" :key="tab.id" :title="tab.title" :name="tab.name">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
         <table-components
         :tableHeader="table1.tableHeader"
         :tableBody="table1.tableBody"
         >
         </table-components>
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
  import tableComponents from "components/table-components" ;
	
  export default {
		name: "BettingRecord",
		components: {
      tableComponents
    },
		computed: {
			getStatus() {
				switch (this.activeName) {
					// 全部则status不传，已中奖status：WIN，
					// 未中奖：UNWIN，等待开奖：CALING
					case "全部":
						return null;
						break;
					case "等待开奖":
						return "PROCESS";
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
			}
		},
		data() {
			return {
				tabsList: [
					{ id: 0, title: "全部", name: "全部" },
					{ id: 1, title: "等待开奖", name: "等待开奖" },
					{ id: 2, title: "已中奖", name: "已中奖" },
					{ id: 3, title: "未中奖", name: "未中奖" }
				],
				page: 1,
				isloading: true,
				refreshing: false,
				loading: false,
				finished: false,
        table1:{
          tableHeader:[
            {name:'中奖状态',key:'status'},
            {name:'期号',key:'awardNumber'},
            {name:'彩票号码',key:'lotteryCodeName'},
            {name:'玩法',key:'playTypeName'},
            {name:'投注',key:'lotteryWayName'},
            {name:'注数',key:'bettingNumber'},
            {name:'每注金额',key:'bettingPrice'},
            {name:'投注时间',key:'bettingTime'},
          ],
          tableBody:[]
        },
				activeName: "全部",
				userName: ""
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
			}
		},
		methods: {
			...mapActions(["getBettingRecord", "getBettingRecordList"]),
			init() {
				this.page = 1;
				this.table1.tableBody = [];
				// this.onLoad();
			},
			_getStatus(name) {
				switch (name) {
					// 全部则status不传，已中奖status：WIN，
					// 未中奖：UNWIN，等待开奖：CALING
					case "":
						return "空";
						break;
					case "PROCESS":
						return "等待开奖";
						break;
					case "WIN":
						return "已中奖";
						break;
					case "UNWIN":
						return "未中奖";
						break;
					default:
						return name;
						break;
				}
			},
			onLoad() {
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				console.log("onload");
				if (this.refreshing) {
					this.table1.tableBody = [];
					this.refreshing = false;
				}
				this.loading = true;

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
				if (!this.loading) this.onLoad();
			},
			_getBettingRecord() {
				// {"current":1,"size":30,"data":{"status":"UNWIN"}}
				// 全部则status不传，已中奖status：WIN，
				// 未中奖：UNWIN，等待开奖：CALING
				this.isloading = true;
				let params = {
					current: this.page,
					size: 100,
					data: {
						status: this.getStatus
					}
				};
				console.log(params);
				this.getBettingRecord(params).then(res => {
					// console.log(res);
					// Toast(res.msg);
					if (res.data && res.data.length > 0) {
            this.table1.tableBody=this.table1.tableBody.concat(res.data)
            this.table1.tableBody.map(item => {
							if (item.status == "WIN") {
								item.bgcolor = "red";
							} else if(item.status == "UNWIN") {
								item.bgcolor = "grey";
							}
              item.status = this._getStatus(item.status)
						});
						this.page++;
					} else {
						this.finished = true;
						this.isloading = false;
					}
					this.loading = false;
				});
			}
		}
	};
</script>
<style lang="less">
	.BettingRecord {
		.van-list {
			overflow-x: scroll;
			margin: 1em;
			.van-row {
				display: flex;
				padding-right: 1em;
				.van-col {
					width: 100vh;
					border: 1px solid;
					.bg-red {
						background-color: red;
					}
					.bg-grey {
						background-color: grey;
					}
					.van-cell {
						min-width: 5.5rem;
						font-size: 1em;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.value1 {
						min-width: 7rem;
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