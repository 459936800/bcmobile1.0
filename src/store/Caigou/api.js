const api = {
	getHistory: 'system/history/list',
	//	POST
	buyLottery: 'lottery/buyLottery',
	////批量投注（包含投注内容以|隔开，注数，单注金额，单位，金额，期数，彩种，玩法）

	//GET
	getAwardsHistory: '/lottery/getAwardsHistory',
	//获取近30次、50次、100次彩票开奖结果获取/获取彩票开奖记录

	//GET
	getLast5Awards: '/lottery/getLast5Awards',
	//获取近5期开奖结果

	//GET
	getLastAwards: '/lottery/getLastAwards',
	//获取最新一期待开奖结果

	//GET
	getLastAwardsLottery: '/lottery/getLastAwardsLottery',
	//获取最新一期待开奖信息

	//GET
	getLotterys: '/lottery/getLotterys',
	//彩票明细查询/彩票列表获取

	//GET
	getLotteryType: '/lottery/getLotteryType',
	//彩票种类查询/彩票分类获取

	//GET
	getPlayTypeByCode: '/lottery/getPlayTypeByCode',
	//获取玩法

	//GET
	getPlayTypeDetailByCode: '/lottery/getPlayTypeDetailByCode'
	// 获取玩法头行结构数据
};
export default api;
