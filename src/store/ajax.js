import axios from 'axios';
import $router from '../router';
import Vue from 'vue';
import store from './index.js';
import comFun from '../js/common';
import { Toast } from 'vant';

var instance = axios.create({
	baseURL: $conf.baseUrl,
	// withCredentials: true, // 允许携带cookie
	timeout: 150000 // 请求的超时时间
});
// 请求拦截器
instance.interceptors.request.use(
	function(config) {
		console.log('api:' + config.url);

		// let noTokenArr = [
		// 	'/login',
		// 	'/captchaImage',
		// 	'/home/addUser',
		// 	'/home/getBanner',
		// 	'/home/getAdvert',
		// 	'/lottery/getLotterys',
		// 	'/lottery/getPlayTypeDetailByCode',
		// 	'/home/getBankCardList'
		// ];
		// const str = noTokenArr.join(',');
		// if (str.indexOf(config.url) == -1 && comFun.cookie.getCookie('Admin-Tokens')) {
		// 	console.log('settoken');
		// const token = 'Bearer ' + comFun.cookie.getCookie('Admin-Tokens');
		// 	token && (config.headers.Authorization = token);
		// }
		if (comFun.cookie.getCookie('Admin-Tokens')) {
			// console.log('settoken');
			const token = 'Bearer ' + comFun.cookie.getCookie('Admin-Tokens');
			token && (config.headers.Authorization = token);
		}
		return config;
	},
	function(error) {
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	function(res) {
		if (res.data.code != 200 && $router.app._route.name != '首页') {
			console.log(res.data.msg);
			console.log($router.app._route.name);
			if (res.data.msg.indexOf('/error') != -1 || res.data.msg.indexOf('/getInfo') != -1) {
				Toast('登录已失效请重新登录');
				comFun.cookie.clearCookie('Admin-Tokens');
				store.commit('setUser', null);
				comFun.cookie.clearCookie('user');
				store.commit('setToken', null);
				setTimeout(() => {
					window.location.href = 'http://' + window.location.host;
				}, 3000);
			} else {
				Toast(res.data.msg);
			}
			// comFun.cookie.clearCookie('Admin-Tokens');
			// setTimeout(() => {
			// 	// window.location.href = 'http://' + window.location.host + '/login';
			// }, 3000);
		} else {
			if (res.data.user) {
				const user = JSON.stringify(res.data.user);
				comFun.cookie.setCookie('user', user);
				store.commit('setUser', res.data.user);
			}
		}
		return res.data;
	},
	function(error) {
		if (error.response) {
			// 请求已发送，服务器回复状态码在2xx之外
			console.error(error.response);
			Toast('服务器出错5秒后自动刷新页面。');
			setTimeout(() => {
				location.reload();
			}, 5000);
		} else if (error.request) {
			// 请求已发送，但没有收到回应
			console.error(error.request);
		} else if (error.message === 'cancelRequest') {
		} else {
			// 请求尚未发送就失败了，可以认为是某些设置引发的问题（代码问题、跨域、断网）
			// 建议错误在这里拦截处理，中断promise
			// return new Promise(() => {})
			console.error(error);
		}
		return Promise.reject(error);
	}
);
const $get = function(obj, param) {
	// if ($conf.isPcTest) {
	return instance.get(obj, param);
	// }
};

const $post = function(obj, param, option) {
	return instance.post(obj, param, option);
};

export default { $get, $post };
