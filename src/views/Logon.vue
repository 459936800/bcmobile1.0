<template>
	<div class="Logon">
		<van-form @submit="onSubmit">
			<van-field
				v-model="invite"
				name="邀请码"
				label="邀请码"
				placeholder="邀请码"
				:rules="[{ required: true, message: '请填写邀请码' }]"
			/>
			<van-field
				v-model="userName"
				name="用户名"
				label="用户名"
				placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]"
			/>
			<van-field
				v-model="password"
				type="password"
				name="登录密码"
				label="登录密码"
				placeholder="登录密码"
				:rules="[{ required: true, message: '请填写登录密码' }]"
			/>
			<van-field
				v-model="fundPassword"
				type="password"
				name="资金密码"
				label="资金密码"
				placeholder="资金密码"
				:rules="[{ required: true, message: '请填写资金密码' }]"
			/>
			<van-field
				v-model="nickName"
				name="昵称"
				label="昵称"
				placeholder="昵称"
				:rules="[{ required: true, message: '请填写昵称' }]"
			/>
			<van-field
				v-model="email"
				name="邮箱地址"
				label="邮箱地址"
				placeholder="邮箱地址"
				:rules="[{ required: true, message: '请填写邮箱地址' }]"
			/>
			<van-field
				v-model="phonenumber"
				name="手机号码"
				label="手机号码"
				placeholder="手机号码"
				:rules="[{ required: true, message: '请填写手机号码' }]"
			/>
			<div style="margin: 16px;">
				<van-button type="danger" round block native-type="submit">免费注册</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	// @ is an alias to /src
	import { mapActions, mapGetters, mapMutations } from "vuex";
	import { Toast } from "vant";

	export default {
		name: "Logon",
		components: {},
		data() {
			return {
				avatar: "u1.png",
				userName: "",
				password: "",
				fundPassword: "",
				invite: "",
				nickName: "",
				email: "",
				phonenumber: "",
				code: "",
				img: "0",
				uuid: "更多  "
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			...mapActions(["addUser", "addUser1"]),
			...mapMutations(["setToken", "setUser"]),
			init() {
				// this.getCaptchaImage();
			},
			onSubmit() {
				let params = {
					avatar: this.avatar,
					userName: this.userName,
					nickName: this.nickName,
					password: this.password,
					fundPassword: this.fundPassword,
					invite: this.invite,
					email: this.email,
					sex: "1",
					phonenumber: this.phonenumber
				};
				this.addUser(params).then(res => {
					if (res.code == "200") {
						Toast("注册成功");
					} else {
						Toast(res.msg);
					}
				});
			}
		}
	};
</script>
<style lang="less">
	.Logon {
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