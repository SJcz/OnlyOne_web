<template>
  <el-container class="outer-container">
    <el-header><room-header :room-id="roomId"></room-header></el-header>
      <el-container>
        <el-container>
          <el-main class="el-main"
          ><scroll-view :chat-list="chatList"></scroll-view
          ></el-main>
          <el-footer><chat-input @send="sendChat"></chat-input></el-footer>
        </el-container>
      <el-aside width="200px"
      ><room-aside :user-count="userCount"></room-aside
    ></el-aside>
    </el-container>
  </el-container>
</template>

<script >
import ChatInput from "../components/ChatInput.vue";
import RoomAside from "../components/RoomAside.vue";
import RoomHeader from "../components/RoomHeader.vue";
import ScrollView from "../components/ScrollView.vue";
import WebsocketSession from "../utils/websocketSession";
import config from "../config/config"

export default {
  components: {
    "room-header": RoomHeader,
    "chat-input": ChatInput,
    "scroll-view": ScrollView,
    "room-aside": RoomAside,
  },
  name: "Chat",
  data() {
    return {
      msg: "",
      websocketSession: null,
      chatList: [],
      roomId: "onlyOne",
      userCount: 0,
    };
  },
  computed: {
    curUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    uuid() {
      let s = [];
      let hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[8] = s[13] = s[18] = s[23] = "-";
      return s.join("");
    },
    initWebsocket() {
      const wsuri = `ws://${config.ws_server_host}:${config.ws_server_port}`;
      const websocket = new WebSocket(wsuri);
      this.websocketSession = new WebsocketSession(websocket);
      this.websocketSession.on("open", this.websocket_onOpen.bind(this));
      this.websocketSession.on("error", this.websocket_onError.bind(this));
      this.websocketSession.on("close", this.websocket_onClose.bind(this));
      this.websocketSession.on("push", this.websocket_onPush.bind(this));
    },

    websocket_onPush(message) {
      console.log(message)
      switch (message.route) {
        case "room.join":
          this.messageHandler_joinRoom(message.data);
          break;
        case "room.chat":
          this.messageHandler_roomChat(message.data);
          break;
      }
    },
    websocket_onOpen() {
      this.websocketSession
        .request({
          route: "roomHandler.joinRoom",
          data: {
            room_id: this.roomId,
          },
        })
        .then((result) => {
          this.$store.commit("update", result.user);
           this.websocketSession
              .request({
                route: "roomHandler.getRoomAllUserNum",
                data: {
                  room_id: this.roomId,
                },
              })
              .then((num) => {
                this.userCount = num + 1;
              });
          setInterval(() => {
            this.websocketSession
              .request({
                route: "roomHandler.getRoomAllUserNum",
                data: {
                  room_id: this.roomId,
                },
              })
              .then((num) => {
                this.userCount = num;
              });
          }, 10000);
        })
        .catch(console.log);
    },
    websocket_onClose(e) {
      console.log("断开连接", e);
    },
    websocket_onError(err) {
      console.log(err);
    },

    messageHandler_joinRoom() {},

    messageHandler_roomChat(data) {
      data.scrollId = "chat-" + this.uuid();
      this.chatList.push(data);
    },

    sendChat(chat_message) {
      if (!this.curUser) return;
      this.websocketSession.send({
        route: "chatHandler.chat",
        data: {
          room_id: this.roomId,
          chat_message,
        },
      });
    },
  },
  unmounted() {
    this.websocketSession.close();
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
  background-color: #eee;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
}
.el-footer {
  background-color: #eee;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-bottom-left-radius: 5px;
  padding: 10px;
  height: 100px;
}
.el-header {
  background-color: #eee;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.el-aside {
  background-color: #eee;
  border: 1px solid #ddd;
  border-bottom-right-radius: 5px;
}

.outer-container {
  width: 70%;
  margin: auto;
  margin-top: 50px;
}
</style>
