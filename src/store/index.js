import Vue from 'vue';
import Vuex from 'vuex';
import ajax from './ajax.js';
import api from './api.js';
import Caigou from './Caigou';
import userCenter from './userCenter';

Vue.use(Vuex);

const state = {
	token: '',
	user: {
		userName: '',
		phonenumber: '',
		email: '',
		nickName: '',
		remark: '',
		sex: '',
		amount: 0
	},
	filter: {
		date: '',
		ou: [],
		region: [],
		area: [],
		bdCode: ''
	}
};
const getters = {
	getFilter: (state) => {
		return state.filter;
	},
	getToken: (state) => {
		return state.token;
	},
	getUser: (state) => {
		return state.user;
	}
};
const mutations = {
	setbdCode: (state, res) => {
		state.filter.bdCode = res;
	},
	setToken: (state, res) => {
		state.token = res;
	},
	setUser: (state, res) => {
		state.user = res;
	}
};
const actions = {
	captchaImage({ }, param) {
		return ajax.$get(api.captchaImage);
	},
	getInfo({ }, param) {
		return ajax.$get(api.getInfo, {
			params: param
		});
	},
	login({ }, param, option) {
		return ajax.$post(api.login, param, option);
	},

	addBetting({ }, param, option) {
		return ajax.$post(api.addBetting, param, option);
	},
	addUser({ }, param, option) {
		return ajax.$post(api.addUser, param, option);
	},
	addUser1({ }, param, option) {
		return ajax.$post(api.addUser1, param, option);
	},
	getActivityList({ }, param) {
		return ajax.$get(api.getActivityList, {
			params: param
		});
	},
	getActivityDetail({ }, param) {
		return ajax.$get(api.getActivityList + '/' + param.id);
	},
	getAdvert({ }, param) {
		return ajax.$get(api.getAdvert, {
			params: param
		});
	},
	getBanner({ }, param) {
		return ajax.$get(api.getBanner, {
			params: param
		});
	},
	getHotLottery({ }, param) {
		return ajax.$get(api.getHotLottery, {
			params: param
		});
	},
	getInformation({ }, param) {
		return ajax.$get(api.getInformation, {
			params: param
		});
	},
	getNewWinner({ }, param) {
		return ajax.$get(api.getNewWinner, {
			params: param
		});
	},
	getYesterdayWinner({ }, param) {
		return ajax.$get(api.getYesterdayWinner, {
			params: param
		});
	},
	getBankCardList({ }, param) {
		return ajax.$get(api.getBankCardList, {
			params: param
		});
	},
	getContactList({ }, param) {
		return ajax.$get(api.getContactList, {
			params: param
		});
	}
};

const modules = { Caigou, userCenter };
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
	modules
});
