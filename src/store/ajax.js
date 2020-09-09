import axios from 'axios';
import Vue from 'vue';
import store from './index.js';
import comFun from '../js/common';

var instance = axios.create({
	baseURL: $conf.baseUrl,
	// withCredentials: true, // 允许携带cookie
	timeout: 150000 // 请求的超时时间
});
// 请求拦截器
instance.interceptors.request.use(
	function(config) {
		console.log('api:' + config.url);
		const str = '/login,/captchaImage';
		if (str.indexOf(config.url) == -1) {
			const token = 'Bearer ' + comFun.cookie.getCookie('Admin-Token');
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
		if (res.data.code != 200) {
			// MessageBox.alert(res.data.msg, '温馨提示').then(() => {
			// 	// comFun.cookie.clearCookie('Admin-Token');
			// 	// window.location.href = 'http://' + window.location.host + '/login';
			// });
		}
		return res.data;
	},
	function(error) {
		if (error.response) {
			// 请求已发送，服务器回复状态码在2xx之外
			console.error(error.response);
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
