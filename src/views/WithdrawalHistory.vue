<template>
	<div class="WithdrawalHistory">
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
		name: "WithdrawalHistory",
		components: {
      tableComponents
    },
		computed: {
			getStatus() {
        let now = new Date();
        let lastday= new Date(now.getTime()-24*60*60*1000*1)
        let last7day= new Date(now.getTime()-24*60*60*1000*7)
				switch (this.activeName) {
					case "当日":
						return now.toJSON().split('T')[0]+" 00:00:00";
						break;
					case "昨天":
						return lastday.toJSON().split('T')[0]+" 00:00:00";
						break;
					case "近7日":
						return last7day.toJSON().split('T')[0]+" 00:00:00";
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
					{ id: 0, title: "当日", name: "当日" },
					{ id: 1, title: "昨天", name: "昨天" },
					{ id: 2, title: "近7日", name: "近7日" },
				],
				page: 1,
				isloading: true,
				refreshing: false,
				loading: false,
				finished: false,
        table1:{
          tableHeader:[
            {name:'金额',key:'amount'},
            {name:'真实姓名',key:'approveName'},
            {name:'号码',key:'bankAccount'},
            {name:'银行名称',key:'bankName'},
            {name:'支行地址',key:'bankAddress'},
            {name:'状态',key:'statusName'},
            {name:'支付类型',key:'type'},
            {name:'创建时间',key:'time'},
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
			...mapActions(["myWithdraw"]),
			init() {
				this.page = 1;
				this.table1.tableBody = [];
				// this.onLoad();
			},
      getType(name){
          switch (name) {
            case "":
              return "空";
              break;
            case "BANK":
              return "银行卡";
              break;
            case "WECHAT":
              return "微信";
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
					this._getWithdrawalHistory();
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
			_getWithdrawalHistory() {
				// {"current":1,"size":30,"data":{"status":"UNWIN"}}
				// 全部则status不传，已中奖status：WIN，
				// 未中奖：UNWIN，等待开奖：CALING
        let now = new Date().toJSON().split('T')[0];
				this.isloading = true;
				let params = {
					current: this.page,
					size: 100,
          beingTime: this.getStatus,
				};
				this.myWithdraw(params).then(res => {
					// console.log(res);
					// Toast(res.msg);
					if (res.data && res.data.records.length > 0) {
            this.table1.tableBody=this.table1.tableBody.concat(res.data.records)
            this.table1.tableBody.map(item => {
                item.type = this.getType(item.type)
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
	.WithdrawalHistory {
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