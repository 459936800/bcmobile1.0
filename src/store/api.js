const api = {
	// 基础数据接口
	captchaImage: '/captchaImage',
	//登录
	login: '/login',
	//用户信息
	getInfo: '/getInfo',

	//POST
	addBetting: '/home/addBetting',
	// 热门开奖速投注

	// POST
	addUser: '/home/addUser',
	// 用户注册

	// POST
	addUser1: '/system/user',
	// 用户注册

	// GET
	getActivityList: '/home/getActivityList',
	// 获取优惠活动列表

	// GET
	getAdvert: '/home/getAdvert',
	// 获取广告弹窗

	// GET
	getBanner: '/home/getBanner',
	// 获取Banner

	// GET
	getHotLottery: '/home/getHotLottery',
	// 获取热门彩种

	// GET
	getInformation: '/home/getInformation',
	// 获取最新资讯

	// GET
	getNewWinner: '/home/getNewWinner',
	// 获取最新中奖榜单

	// GET
	getYesterdayWinner: '/home/getYesterdayWinner',
	// 获取昨日高手榜

	// GET
	getBankCardList: '/home/getBankCardList',
	// 获取商家银行卡

	// GET
	getContactList: '/home/getContactList',
	//获取客服列表

	// POST
	remember: '/home/remember',
	//根据用户账号/手机号/邮箱号获取安全问题

	// POST
	resetPassword: '/home/resetPassword'
	//回答安全问题
};
export default api;
