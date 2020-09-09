const api = {
	// POST
	addInviteCode: '/userCenter/addInviteCode',
	// 对六种彩票类型设置返点并且声称邀请码

	// POST userId
	getBettingByNextLevel: '/userCenter/getBettingByNextLevel',
	// 按条件查看自己及下级所有用户投注明细

	// POST
	getBettingRecord: '/userCenter/getBettingRecord',
	// 获取用户投注记录

	// GET
	getBettingRecordList: '/userCenter/getBettingRecordList',
	// 获取当前登录用户投注记录

	// POST userId
	getFundRecordByNextLevel: '/userCenter/getFundRecordByNextLevel',
	// 按条件查询当前代理及所有下级充值及提现记录

	// GET
	getFundRecordList: '/userCenter/getFundRecordList',
	// 获取当前登录用户资金记录

	// POST
	getInviteCode: '/userCenter/getInviteCode',
	// 获取当前代理邀请码

	// POST userId
	getMyInvite: '/userCenter/getMyInvite',
	// 查看该用户使用的返点设置

	// POST
	getNextLevelAgent: '/userCenter/getNextLevelAgent',
	// 获取当前代理下所有代理及用户

	// POST
	getNotice: '/userCenter/getNotice',
	// 消息公告查询

	// POST
	invest: '/userCenter/invest',
	// 用户充值

	// PUT
	resetFundPassword: '/userCenter/resetFundPassword',
	// 设置资金密码/变更资金密码

	// PUT
	resetPhone: '/userCenter/resetPhone',
	// 绑定手机号码/变更绑定手机

	// PUT
	resetPwd: '/userCenter/resetPwd',
	// 修改密码

	// POST
	updateInviteCode: '/userCenter/updateInviteCode',
	// 修改邀请码下的返点配置

	// POST
	withdraw: '/userCenter/withdraw'
	// 用户提现
};
export default api;
