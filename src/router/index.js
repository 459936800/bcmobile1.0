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
import Withdrawal from '../views/Withdrawal.vue';
import Notice from '../views/Notice.vue';
import CustomerService from '../views/CustomerService.vue';
import BettingRecord from '../views/BettingRecord.vue';
import AwardsHistory from '../views/AwardsHistory.vue';
import OverviewHistory from '../views/OverviewHistory.vue';
import Profit from '../views/Profit.vue';

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
	},
	{
		path: '/Withdrawal',
		name: '提现中心',
		component: Withdrawal
	},
	{
		path: '/Notice',
		name: '消息中心',
		component: Notice
	},
	{
		path: '/CustomerService',
		name: '客服中心',
		component: CustomerService
	},
	{
		path: '/BettingRecord',
		name: '投注记录',
		component: BettingRecord
	},
	{
		path: '/AwardsHistory',
		name: '历史记录',
		component: AwardsHistory
	},
	{
		path: '/OverviewHistory',
		name: '历史概览',
		component: OverviewHistory
	},

	{
		path: '/Profit',
		name: '今日盈亏',
		component: Profit
	}
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router;
