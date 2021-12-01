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
import WebsocketSession from '../utils/websocketSession';

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
			websocketSession: null,
      chatList: [],
      roomName: 'onlyOne',
      curUser: null
		};
	},
	methods: {
		initWebsocket() {
			const wsuri = "ws://127.0.0.1:9090";
			const websocket = new WebSocket(wsuri);
      this.websocketSession = new WebsocketSession(websocket);
			this.websocketSession.on('open', this.websocket_onOpen.bind(this));
      this.websocketSession.on('error', this.websocket_onError.bind(this));
      this.websocketSession.on('close', this.websocket_onClose.bind(this));
      this.websocketSession.on('push', this.websocket_onPush.bind(this));
		},

    websocket_onPush(message) {
			switch(message.route) {
          case 'room.join':
            this.messageHandler_joinRoom(message.data);
            break;
          case 'room.chat':
            this.messageHandler_roomChat(message.data);
            break;
        } 
    },
    websocket_onOpen() {
      // 连接建立之后执行send方法发送数据
      this.websocketSession.request({
				route: "roomHandler.joinRoom",
				data: {
					roomName: this.roomName,
				},
			}).then(result => {
        console.log(result);
        this.curUser = result.user;
      }).catch(console.log)
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
      if (!this.curUser) return;
      this.websocketSession.send({
        route: 'chatHandler.chat',
        data: {
          roomName: this.roomName,
          chat
        }
      })
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
