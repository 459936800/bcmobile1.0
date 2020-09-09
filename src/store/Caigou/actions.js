import ajax from '../ajax.js';
import api from './api.js';
const actions = {
	getHistory({}, param) {
		return ajax.$get(api.getHistory, {
			params: param
		});
	},
	buyLottery({}, param, option) {
		return ajax.$post(api.buyLottery, param, option);
	},
	getAwardsHistory({}, param) {
		return ajax.$get(api.getAwardsHistory, {
			params: param
		});
	},
	getLast5Awards({}, param) {
		return ajax.$get(api.getLast5Awards, {
			params: param
		});
	},
	getLastAwards({}, param) {
		return ajax.$get(api.getLastAwards, {
			params: param
		});
	},
	getLastAwardsLottery({}, param) {
		return ajax.$get(api.getLastAwardsLottery, {
			params: param
		});
	},
	getLotterys({}, param, option) {
		return ajax.$post(api.getLotterys, param, option);
	},
	getLotteryType({}, param) {
		return ajax.$get(api.getLotteryType, {
			params: param
		});
	},
	getPlayTypeByCode({}, param) {
		return ajax.$get(api.getPlayTypeByCode, {
			params: param
		});
	},
	getPlayTypeDetailByCode({}, param) {
		return ajax.$get(api.getPlayTypeDetailByCode, {
			params: param
		});
	}
};

export default actions;
