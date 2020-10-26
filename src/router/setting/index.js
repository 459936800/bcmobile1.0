import demo from '../../views/setting/demo.vue';
import Remember from '../../views/setting/Remember.vue';

let route = [
	{
		path: '/demo',
		name: 'demo',
		component: demo
	},
	{
		path: '/Remember',
		name: '找回密码',
		component: Remember
	},
	{
		path: '/RetrievePassword',
		name: '修改密码',
		component: () => import(/* webpackChunkName: "RetrievePassword" */ '../../views/setting/Remember.vue'),
		meta: {
			// 是否显示底部
			visible: true,
			active: 0,
			// 是否一级界面
			startPage: false
			// dateType: 'M'
		}
	}
];
export default route;
