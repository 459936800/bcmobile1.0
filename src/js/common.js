let cookie = {
	/**
 * @author xxxx
 * @description 保存cookie
 * @param {String} name 需要存储cookie的key
 * @param {String} value 需要存储cookie的value
 * @param {Number} timer 默认存储多少天
 */
	setCookie(name, value, timer = 1) {
		var Days = timer; //默认将被保存 1 天
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
	},

	/**
 * @author xxxx
 * @description 获取cookie
 * @param {String} name 需要获取cookie的key
 */
	getCookie(name) {
		var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
		if (arr != null) {
			return unescape(arr[2]);
		} else {
			return null;
		}
	},

	/**
 * @author xxxx
 * @description 删除cookie
 * @param {String} name 需要删除cookie的key
 */

	clearCookie(name) {
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
		if (cval != null) document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
	}
};

let methods = {
	back(router) {
		router.go(-1);
	},
	getTimer(Time, sysTime = Time) {
		let timer = 0;
		let today = new Date(sysTime);
		let day = new Date(Time);
		let mss = day - today;
		function addZero(num) {
			if (num < 10 && num > 0) {
				return '0' + num;
			} else if (num > -9 && num < 0) {
				return '-0' + Math.abs(num);
			}
			return num;
		}
		var days = parseInt(mss / (1000 * 60 * 60 * 24));
		var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = parseInt((mss % (1000 * 60)) / 1000);
		// if (hours == 0 && minutes == 0 && seconds < 11) {
		// 	this.showNum = true;
		// } else {
		// 	this.showNum = false;
		// }
		timer = addZero(hours) + ':' + addZero(minutes) + ':' + addZero(seconds);
		let data = {
			today: today,
			day: day,
			timer: timer,
			mss: mss,
			hours: hours,
			minutes: minutes,
			seconds: seconds
		};
		return data;
	},
	stringToDate(str) {
		var tempStrs = str.split(' ');
		var dateStrs = tempStrs[0].split('-');
		var year = parseInt(dateStrs[0], 10);
		var month = parseInt(dateStrs[1], 10) - 1;
		var day = parseInt(dateStrs[2], 10);
		var timeStrs = tempStrs[1].split(':');
		var hour = parseInt(timeStrs[0], 10);
		var minute = parseInt(timeStrs[1], 10);
		var second = parseInt(timeStrs[2], 10);
		var date = new Date(year, month, day, hour, minute, second);

		return date;
	}
};

export default {
	cookie,
	methods
};
