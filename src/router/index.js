import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Logon from '../views/Logon.vue';
import Caigou from '../views/Caigou.vue';
import Lottery from '../views/Lottery.vue';
import My from '../views/My.vue';
import PersonalInfo from '../views/PersonalInfo.vue';
import Recharge from '../views/Recharge.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: '首页',
		component: Home
	},
	{
		path: '/Home',
		name: '首页',
		component: Home
	},
	{
		path: '/Login',
		name: '登录',
		component: Login
	},
	{
		path: '/Logon',
		name: '注册',
		component: Logon
	},
	{
		path: '/Caigou',
		name: '彩购',
		component: Caigou
	},
	{
		path: '/Lottery',
		name: 'Lottery',
		component: Lottery
	},
	{
		path: '/My',
		name: '我的',
		component: My
	},
	{
		path: '/PersonalInfo',
		name: '个人资料',
		component: PersonalInfo
	},
	{
		path: '/Recharge',
		name: '充值中心',
		component: Recharge
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
