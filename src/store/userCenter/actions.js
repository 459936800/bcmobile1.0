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
	getBettingRecordList({}, param, option) {
		return ajax.$post(api.getBettingRecordList, param, option);
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
	},
	getLiRun({}, param, option) {
		return ajax.$post(api.getLiRun, param, option);
	},
	upload({}, param, option) {
		let config = {
			headers: {
				'content-type': 'multipart/form-data'
			},
			onUploadProgress: function(e) {
				// console.log(e);
				//属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
				//如果lengthComputable为false，就获取不到e.total和e.loaded
				if (e.lengthComputable) {
					// var rate = (_this.uploadRate = e.loaded / e.total); //已上传的比例
					// console.log('进度：' + (rate * 100).toFixed(0) + '%');
					console.log(e.loaded / e.total);
					// console.log(e);
					// if (rate < 100) {
					//   //这里的进度只能表明文件已经上传到后台，但是后台有没有处理完还不知道
					//   //因此不能直接显示为100%，不然用户会误以为已经上传完毕，关掉浏览器的话就可能导致上传失败
					//   //等响应回来时，再将进度设为100%
					//   _this.uploadRate = rate * 100;
					//   _this.uploadStyle.width = (rate * 100).toFixed(0) + "%";
					// }
				}
			}
		};
		return ajax.$post(api.upload, param, config);
	},
	refreshUserInfo({}, param, option) {
		return ajax.$post(api.refreshUserInfo, param, option);
	},
	myWithdraw({}, param, option) {
		return ajax.$post(api.myWithdraw, param, option);
	}
};

export default actions;
