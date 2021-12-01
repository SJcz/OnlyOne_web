<template>
	<el-container>
		<el-container>
			<el-header><room-header></room-header></el-header>
			<el-main class="el-main"><scroll-view :chat-list="chatList"></scroll-view></el-main>
			<el-footer><chat-input @send="sendChat"></chat-input></el-footer>
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
      chatList: [],
      roomName: 'onlyOne',
		};
	},
	methods: {
		initWebsocket() {
			const wsuri = "ws://127.0.0.1:9090";
			this.websocket = new WebSocket(wsuri);
			this.websocket.onmessage = this.websocket_onMessage;
			this.websocket.onopen = this.websocket_onOpen;
			this.websocket.onerror = this.websocket_onError;
			this.websocket.onclose = this.websocket_onClose;
		},

    websocket_onMessage(msg) {
      const message = JSON.parse(msg.data);
      console.log(message);
			if (message.type === 'push') {
        switch(message.route) {
          case 'room.join':
            this.messageHandler_joinRoom(message.data);
            break;
          case 'room.chat':
            this.messageHandler_roomChat(message.data)
        } 
      }
    },
    websocket_onOpen() {
      //连接建立之后执行send方法发送数据
			this.websocket.send(
				JSON.stringify({
					route: "roomHandler.joinRoom",
					data: {
						roomName: this.roomName,
					},
				})
			);
    },
    websocket_onClose(e) {
      console.log("断开连接", e);
    },
    websocket_onError(err) {
      console.log(err);
    },

    messageHandler_joinRoom() {

    },

    messageHandler_roomChat(data) {
      this.chatList.push(data.chat);
    },

    sendChat(chat) {
      this.websocket.send(JSON.stringify({
        route: 'chatHandler.chat',
        data: {
          roomName: this.roomName,
          chat
        }
      }))
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
.el-main {
  padding: 0 20px;
}
</style>
