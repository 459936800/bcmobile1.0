<template>
	<div class="My">
		<div class="topInfo"></div>
		<div class="topCard">
			<div @click="toPersonalInfo" class="cardTop">
				<a style="width: 5em">
					<van-image
						v-if="user.avatar"
						round
						width="4rem"
						height="4rem"
						:src="require('../assets/image/' + user.avatar)"
					/>
					<van-image v-else round width="4rem" height="4rem" :src="require('../assets/image/u2.jpeg')" />
				</a>
				<div class="useInof">
					<div>{{ user.nickName }}</div>
					<div>余额：{{ user.amount }}</div>
				</div>
				<van-icon name="arrow" />
			</div>
		</div>
		<div class="cardBottom">
			<div>
				<router-link :to="{ name: '充值中心' }">
					<div class="defFont m0">
						<van-icon name="bill" size="1.5rem" />
					</div>
					<div style="width: 3rem">充值</div>
				</router-link>
			</div>
			<div>
				<router-link :to="{ name: '提现中心' }">
					<div class="defFont m1">
						<van-icon name="gold-coin" size="1.5rem" />
					</div>
					<div style="width: 3rem">提现</div>
				</router-link>
			</div>
			<div>
				<router-link :to="{ name: '客服中心' }">
					<div class="defFont m2">
						<van-icon name="service" size="1.5rem" />
					</div>
					<div style="width: 3rem">客服</div>
				</router-link>
			</div>
			<router-link :to="{ name: '消息中心' }">
				<div>
					<div class="defFont m3">
						<van-icon name="volume" size="1.5rem" />
					</div>
					<div style="width: 3rem">通知</div>
				</div>
			</router-link>
		</div>
		<van-divider />
		<div class="options">
			<router-link :to="{ name: '投注记录' }">
				<van-cell is-link>
					<div class="defFont_userCenter m0">
						<van-icon name="balance-list" size="1rem" />
					</div>
					<span>投注记录</span>
				</van-cell>
			</router-link>
			<!-- <router-link :to="{name:'银行卡绑定'}">
        <van-cell is-link>
          <div class="defFont_userCenter m4">
            <van-icon name="credit-pay" size="1rem" />
          </div>
          <span>银行卡绑定</span>
        </van-cell>
			</router-link>-->
			<router-link :to="{ name: '今日盈亏' }">
				<van-cell is-link>
					<div class="defFont_userCenter m4">
						<van-icon name="eye" size="1rem" />
					</div>
					<span>今日盈亏</span>
				</van-cell>
			</router-link>
			<router-link :to="{ name: '提现记录' }">
				<van-cell is-link>
					<div class="defFont_userCenter m1">
						<van-icon name="balance-list" size="1rem" />
					</div>
					<span>提现记录</span>
				</van-cell>
			</router-link>
			<router-link :to="{ name: '登录' }">
				<van-cell is-link>
					<div class="defFont_userCenter m2">
						<van-icon name="user-o" size="1rem" />
					</div>
					<span>重新登录</span>
				</van-cell>
			</router-link>
			<van-cell @click="logout" is-link>
				<div class="defFont_userCenter m1">
					<van-icon name="share" size="1rem" />
				</div>
				<span>退出登录</span>
			</van-cell>
		</div>
	</div>
</template>
<script>
	// @ is an alias to /src
	import { mapActions, mapGetters, mapMutations } from "vuex";
	export default {
		name: "My",
		components: {},
		computed: {
			...mapGetters({ user: "getUser" })
		},
		data() {
			return {
				activeName: "彩票",
				pics: ["u1.png", "u2.jpeg"],
				avatar: "u1.png"
			};
		},
		// beforeCreate() {},
		// created() {},
		mounted() {
			this.init();
		},
		methods: {
			...mapMutations(["setToken", "setUser"]),
			...mapActions(["getInfo", "refreshUserInfo"]),
			init() {
				this.refreshUserInfo().then(res => {
					if (res.code != "200") return;
					const user = res.data;
					this.$comFun.cookie.setCookie("user", user);
					this.setUser(res.data);
				});
			},
			toPersonalInfo() {
				// this.$router.push({
				//   path: "PersonalInfo",
				// });
				this.$router.push({
					path: "Login"
				});
			},
			logout() {
				this.$comFun.cookie.clearCookie("Admin-Tokens");
				this.$comFun.cookie.clearCookie("user");
				this.setToken(null);
				this.setUser(null);
				window.location.href = "http://" + window.location.host + "/";
				// location.reload();
				// this.$router.push({
				//   path: "index"
				// });
			}
		}
	};
</script>
<style lang="less">
	.My {
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
			a {
				color: #000;
			}
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