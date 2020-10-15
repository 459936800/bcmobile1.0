<template>
	<div class="CustomerService">
		<!-- <van-empty description="该功能尚未开通" /> -->
		<van-row>
			<van-cell>客服二维码</van-cell>
		</van-row>
		<van-row>
			<van-cell>
				<img :src="apiurl + url" alt="客服二维码" />
			</van-cell>
		</van-row>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapActions, mapGetters, mapMutations } from "vuex";
	import { Toast } from "vant";

	export default {
		name: "CustomerService",
		components: {},
		computed: {},
		data() {
			return {
				apiurl: process.env.VUE_APP_BASE_API,
				url: "",
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(["getContactList"]),
			init() {
				this._getContactList();
			},
			_getContactList() {
				this.getContactList().then((res) => {
					this.url = res.data[0].qrcode;
				});
			},
		},
	};
</script>
<style lang="less">
	.CustomerService {
		.van-cell__value {
			text-align: center;
		}
	}
</style>