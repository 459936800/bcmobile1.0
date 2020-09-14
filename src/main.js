import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vant from 'vant';
import comFun from './js/common';
import websocket from './js/websocket';
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
	const str = '我的，Lottery';
	console.log(to);
	if (str.indexOf(to.name) != -1 && !store.state.token) next({ name: '登录' });
	else next();
});

//引入共用方法
Vue.prototype.$comFun = comFun;
Vue.prototype.$websocket = websocket;
new Vue({
	router,
	store,
	data: {
		Bus: new Vue()
	},
	render: function(h) {
		return h(App);
	}
}).$mount('#app');
