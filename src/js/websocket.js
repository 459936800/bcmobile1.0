let methods = {
	/**
 * @author xxxx
 * @description websocket
 */

	initWebSocket(userId = 0) {
		//初始化weosocket
		let websock;
		console.log('初始化weosocket');
		const wsuri = 'ws://10.8.1.100:8088/ws/lottery/ahks/' + userId;
		websock = new WebSocket(wsuri);
		websock.onmessage = this.websocketonmessage;
		websock.onopen = this.websocketonopen;
		websock.onerror = this.websocketonerror;
		websock.onclose = this.websocketclose;
		return websock;
	},
	websocketonopen() {
		//连接建立之后执行send方法发送数据
		console.log('onOpen');
		// let actions = { test: '12345' };
		// this.websocketsend(JSON.stringify(actions));
	},
	websocketonerror() {
		console.log('onError');
		//连接建立失败重连
		this.initWebSocket();
	},
	websocketonmessage(e) {
		//数据接收
		// console.log('websocket:Data');
		// console.log(e);
		// const redata = JSON.parse(e.data);
		return e;
	},
	websocketsend(Data) {
		//数据发送
		this.websock.send(Data);
	},
	websocketclose(e) {
		//关闭
		console.log('断开连接', e);
	}
};

export default { methods };
