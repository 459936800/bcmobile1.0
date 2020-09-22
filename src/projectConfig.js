'use strict';
const cubeModule = require('../CubeModule');
var exportsFun = {
	// base url
	get baseUrl() {
		// var test = 'http://wycc168.com/prod-api/',
		// 	prod = 'http://wycc168.com/prod-api/';
		var test = 'http://10.8.1.100:83/prod-api/',
			prod = 'http://wycc168.com/prod-api/';
		return this.isTest ? test : prod;
	},
	// 添加接口发布版本信息
	get proVersion() {
		var test = '20200922';
		var prod = '20200922';
		return this.isTest ? test : prod;
	},
	get appVersion() {
		var test = cubeModule.testVersion;
		var prod = cubeModule.version;
		return this.isTest ? test : prod;
	},
	// 是否是测试环境
	get isTest() {
		console.log('环境');
		console.log(process.env.NODE_ENV);
		console.log(process.env.VUE_APP_NODE_TYPE);
		return process.env.VUE_APP_NODE_TYPE === '0';
	},

	// 用于pc环境调试的用户数据
	get fakeUser() {
		return {
			uid: 'ex', //
			Token: ''
		};
	}
};

// export default exportsFun;
module.exports = exportsFun;
