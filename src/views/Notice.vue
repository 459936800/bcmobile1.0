<template>
	<div class="Notice">
		<van-row v-for="(item,index)  of NoticeList" :key="index" :index="index">
			<div>
				<a class="active">
					<div @click="showDialog(item)">
						<p>{{item.noticeTitle}}</p>
						<span>{{item.createTime}}</span>
					</div>
					<!-- <van-icon name="delete" size="1.5em" class="fr" /> -->
				</a>
			</div>
		</van-row>
		<van-dialog v-model="show" title="消息详情" show-cancel-button>
			<van-row class="title">{{Dialog.noticeTitle}}</van-row>
			<van-row class="content">{{Dialog.noticeContent}}</van-row>
		</van-dialog>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapActions, mapGetters, mapMutations } from "vuex";
	import { Toast } from "vant";

	export default {
		name: "Notice",
		components: {},
		computed: {},
		data() {
			return {
				show: false,
				Dialog: { title: "", content: "", time: "" },
				NoticeList: [
					{
						noticeId: 2,
						noticeTitle: "维护通知：2018-07-01 若依系统凌晨维护",
						noticeType: "1",
						noticeContent: "维护内容",
						status: "0",
						createBy: "admin",
						createTime: "2018-03-16T11:33:00.000+0800",
						updateBy: "ry",
						updateTime: "2018-03-16T11:33:00.000+0800",
						remark: "管理员"
					}
				]
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(["getNotice"]),
			init() {
				this._getNotice();
			},
			showDialog(item) {
				this.Dialog = item;
				this.show = true;
			},
			_getNotice() {
				let params = {};
				this.getNotice(params).then(res => {
					// console.log(res);
					// Toast(res.msg);
					this.NoticeList = res.data.records;
				});
			}
		}
	};
</script>
<style lang="less">
	.Notice {
		text-align: left;
		.active {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10px 5%;
			span {
				font-size: 0.62em;
				clear: both;
				color: #989898;
			}
			a div {
				width: 12em;
				line-height: 1.25em;
				display: inline-block;
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