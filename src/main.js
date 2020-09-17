import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import comFun from './js/common';
import websocket from './js/websocket';
import clipboard from 'clipboard';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false;
try {
	store.commit('setToken', comFun.cookie.getCookie('Admin-Token') || null);
	store.commit('setUser', JSON.parse(comFun.cookie.getCookie('user')) || store.state.user);
} catch (error) {
	store.commit('setUser', null);
}

router.beforeEach((to, from, next) => {
	const str = '我的，Lottery，个人资料，充值中心，提现中心，消息中心，投注记录';
	console.log(to);
	if (str.indexOf(to.name) != -1 && !store.state.token) next({ name: '登录' });
	else next()
	// next();
});

//引入共用方法
Vue.prototype.$comFun = comFun;
Vue.prototype.$websocket = websocket;
Vue.prototype.clipboard = clipboard;
new Vue({
	router,
	store,
	data: {
		Bus: new Vue()
	},
	render: function (h) {
		return h(App);
	}
}).$mount('#app');
