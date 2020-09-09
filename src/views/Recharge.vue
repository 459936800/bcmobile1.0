<template>
	<div class="Recharge">
		<van-field
			v-model="username"
			name="用户名"
			label="用户名"
			placeholder="用户名"
			:rules="[{ required: true, message: '请填写用户名' }]"
		/>
		<van-field
			v-model="amount"
			name="充值金额"
			label="充值金额"
			placeholder="充值金额"
			:rules="[{ required: true, message: '请填写充值金额' }]"
		/>
		<van-button @click="RechargeAmount" type="danger" round block>确认充值</van-button>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapActions, mapGetters, mapMutations } from "vuex";

	export default {
		name: "Recharge",
		components: {},
		computed: {},
		data() {
			return {
				username: "",
				amount: 0
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(["invest"]),
			init() {},
			RechargeAmount() {
				let params = {
					bankAccount: this.username,
					amount: this.amount
				};
				this.invest(params).then(res => {
					console.log(res);
				});
			}
		}
	};
</script>
<style lang="less">
	.Recharge {
		.topInfo {
			background: linear-gradient(#e53333, #ec5639);
			border-bottom-left-radius: 0.8em;
			border-bottom-right-radius: 0.8em;
			height: 3.75em;
			position: absolute;
			width: 100%;
		}
		.topCard {
			margin: auto;
			background: #fff;
			height: 6.5em;
			border-radius: 0.8em;
			position: relative;
			width: 90%;
		}
		.cardTop {
			width: 80%;
			height: 50%;
			border-radius: 0.8em;
			padding: 1.5em 2em;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #fff;
			position: relative;
		}
		.useInof {
			width: 100%;
			padding-top: 0.4em;
			padding-left: 0.9em;
			text-align: left;
		}
		.cardBottom {
			width: 80%;
			margin: auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.options {
			width: 80%;
			margin: auto;
			.defFont_userCenter {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-right: 0.5em;
				color: #fff;
				height: 1.5rem;
				width: 1.5rem;
				border-radius: 0.5rem;
				line-height: 1.65em;
				text-align: center;
				font-size: 0.65em;
			}
		}

		.van-cell,
		.van-cell__value {
			display: flex;
			align-items: center;
			span {
				margin-left: 1em;
			}
		}
	}
</style>