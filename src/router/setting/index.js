import RetrievePassword from '../../views/setting/RetrievePassword.vue';
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
		component: RetrievePassword
	}
];
export default route;
