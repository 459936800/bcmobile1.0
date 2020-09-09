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
	getYesterdayWinner: '/home/getYesterdayWinner'
	// 获取昨日高手榜
};
export default api;
