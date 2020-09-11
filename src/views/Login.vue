<template>
	<div class="Login">
		<van-form @submit="onSubmit">
			<van-field
				v-model="username"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="密码"
				label="密码"
				placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]"
			/>
			<!-- <van-image width="100" height="100" lazy-load :src="img" /> -->
			<img @click="getCaptchaImage" :src="img" />
			<van-field
				v-model="code"
				name="验证码"
				label="验证码"
				placeholder="验证码"
				:rules="[{ required: true, message: '请填写验证码' }]"
			/>
			<div style="margin: 16px;">
				<van-button type="danger" round block native-type="submit">立即登录</van-button>
			</div>
		</van-form>
		<div style="margin: 16px;">
			<van-button @click="toLogon" type="default" round block>免费注册</van-button>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapActions, mapGetters, mapMutations } from "vuex";

	export default {
		name: "Login",
		components: {},
		data() {
			return {
				username: "",
				password: "",
				code: "",
				img: "",
				uuid: ""
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(["captchaImage", "login", "getInfo"]),
			...mapMutations(["setToken", "setUser"]),
			init() {
				this.getCaptchaImage();
			},
			toLogon() {
				this.$router.push({
					path: "Logon"
				});
			},
			getCaptchaImage() {
				this.captchaImage().then(res => {
					this.img = "data:image/gif;base64," + res.img;
					this.uuid = res.uuid;
				});
			},
			onSubmit() {
				let params = {
					username: this.username,
					password: this.password,
					code: this.code,
					uuid: this.uuid
				};
				this.login(params).then(res => {
					if (res.token) {
						this.$comFun.cookie.setCookie("Admin-Token", res.token);
						this.setToken("Bearer " + res.token);
						this.getInfo().then(res => {
							if (res.code != "200") return;
							const user = JSON.stringify(res.user);
							this.$comFun.cookie.setCookie("user", user);
							this.setUser(res.user);
							this.$router.push({
								path: "Home"
							});
						});
					}
				});
			}
		}
	};
</script>
<style lang="less">
	.Login {
		.my-swipe .van-swipe-item {
			color: #fff;
			font-size: 20px;
			line-height: 150px;
			text-align: center;
			background-color: #39a9ed;
		}
		.scrollStyle {
			overflow-y: hidden;
			overflow-x: scroll;
			display: flex;
			-ms-flex-pack: start;
			justify-content: flex-start;
			-ms-flex-align: center;
			align-items: center;
			// img {
			//   width: 10rem !important;
			// }
		}
		.scrollStyle::-webkit-scrollbar {
			display: none;
		}
		// .van-nav-bar {
		//   background-color: #fff !important;
		// }
		.van-icon,
		.van-nav-bar__text,
		.van-nav-bar__title {
			color: #000 !important;
		}
	}
</style>