<template>
	<el-container>
		<el-container>
			<el-header><room-header></room-header></el-header>
			<el-main><scroll-view></scroll-view></el-main>
			<el-footer><chat-input></chat-input></el-footer>
		</el-container>
		<el-aside width="200px">Aside</el-aside>
	</el-container>
</template>

<script>
import ChatInput from "../components/ChatInput.vue";
import RoomHeader from "../components/RoomHeader.vue";
import ScrollView from "../components/ScrollView.vue";
export default {
	components: {
		"room-header": RoomHeader,
		"chat-input": ChatInput,
		"scroll-view": ScrollView,
	},
	name: "Chat",
	data() {
		return {
			msg: "",
			websocket: null,
		};
	},
	methods: {
		initWebsocket() {
			const wsuri = "ws://127.0.0.1:9090";
			this.websocket = new WebSocket(wsuri);
			this.websocket.onmessage = this.websocketonmessage;
			this.websocket.onopen = this.websocketonopen;
			this.websocket.onerror = this.websocketonerror;
			this.websocket.onclose = this.websocketclose;
		},
		websocketonopen() {
			//连接建立之后执行send方法发送数据
			this.websocket.send(
				JSON.stringify({
					route: "roomHandler.joinRoom",
					params: {
						roomName: "onlyOne",
					},
				})
			);
		},
		websocketonerror(err) {
			console.log(err);
			this.initWebsocket();
		},
		websocketonmessage(message) {
      const data = JSON.parse(message.data);
			if (data.type === 'push') {
        switch(data.route) {
          case 'joinRoom':
            this.messageHandler_joinRoom(data.params)
        } 
      }
		},
		websocketclose(e) {
			//关闭
			console.log("断开连接", e);
		},
    messageHandler_joinRoom() {

    }
	},
	unmounted() {
		this.websocket.close(); //离开路由之后断开websocket连接
	},
	created() {
		if (!window.WebSocket) {
			return alert(`当前浏览器不支持 websocket, 请更换浏览器`);
		}
		this.initWebsocket();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
