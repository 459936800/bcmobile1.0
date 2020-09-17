import ajax from '../ajax.js';
import api from './api.js';
const actions = {
	addInviteCode({}, param, option) {
		return ajax.$post(api.addInviteCode, param, option);
	},
	getBettingByNextLevel({}, param, option) {
		return ajax.$post(api.getBettingByNextLevel, param, option);
	},
	getBettingRecord({}, param, option) {
		return ajax.$post(api.getBettingRecord, param, option);
	},
	getBettingRecordList({}, param) {
		return ajax.$get(api.getBettingRecordList, {
			params: param
		});
	},
	getFundRecordByNextLevel({}, param, option) {
		return ajax.$post(api.getFundRecordByNextLevel, param, option);
	},
	getFundRecordList({}, param) {
		return ajax.$get(api.getFundRecordList, {
			params: param
		});
	},
	getInviteCode({}, param, option) {
		return ajax.$post(api.getInviteCode, param, option);
	},
	getMyInvite({}, param, option) {
		return ajax.$post(api.getMyInvite, param, option);
	},
	getNextLevelAgent({}, param, option) {
		return ajax.$post(api.getNextLevelAgent, param, option);
	},
	getNotice({}, param, option) {
		return ajax.$post(api.getNotice, param, option);
	},
	invest({}, param, option) {
		return ajax.$post(api.invest, param, option);
	},
	// 	// PUT
	// resetFundPassword: '/userCenter/resetFundPassword',
	// // 设置资金密码/变更资金密码

	// // PUT
	// resetPhone: '/userCenter/resetPhone',
	// // 绑定手机号码/变更绑定手机

	// // PUT
	// resetPwd: '/userCenter/resetPwd',
	// // 修改密码
	updateInviteCode({}, param, option) {
		return ajax.$post(api.updateInviteCode, param, option);
	},
	withdraw({}, param, option) {
		return ajax.$post(api.withdraw, param, option);
	}
};

export default actions;
