<template>
	<div class="BettingRecord">
		<van-tabs sticky v-model="activeName" @click="onRefresh">
			<van-tab v-for="tab of tabsList" :key="tab.id" :title="tab.title" :name="tab.name">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<van-row v-for="item in RecordsList" :key="item.id">
							<van-col>
								<div>
									<p>中奖状态</p>
									<van-cell :style="{'background-color':item.bgcolor}" :title="_getStatus(item.status)" />
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
									<van-cell :title="item.lotteryCodeName" />
								</div>
							</van-col>
							<van-col>
								<div>
									<p>玩法</p>
									<van-cell :title="item.playTypeName" />
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
							<van-col>
								<div>
									<p>投注时间</p>
									<van-cell style="width: 100%" :title="item.bettingTime" />
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
		name: "BettingRecord",
		components: {},
		computed: {
			getStatus() {
				switch (this.activeName) {
					// 全部则status不传，已中奖status：WIN，
					// 未中奖：UNWIN，等待开奖：CALING
					case "全部":
						return null;
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
				RecordsList: [],
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
				this.RecordsList = [];
				// this.onLoad();
			},
			_getStatus(name) {
				switch (name) {
					// 全部则status不传，已中奖status：WIN，
					// 未中奖：UNWIN，等待开奖：CALING
					case "":
						return "未中奖";
						break;
					case "CALING":
						return "等待开奖";
						break;
					case "WIN":
						return "已中奖";
						break;
					case "UNWIN":
						return "未中奖";
						break;
					default:
						return "未中奖";
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
						this.RecordsList = this.RecordsList.concat(res.data);
						this.RecordsList.map(item => {
							if (item.status == "WIN") {
								item.bgcolor = "red";
							} else {
								item.bgcolor = "grey";
							}
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