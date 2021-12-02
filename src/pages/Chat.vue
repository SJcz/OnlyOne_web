<template>
  <el-container>
    <el-container>
      <el-header><room-header></room-header></el-header>
      <el-main class="el-main"
        ><scroll-view :chat-list="chatList"></scroll-view
      ></el-main>
      <el-footer><chat-input @send="sendChat"></chat-input></el-footer>
    </el-container>
    <el-aside width="200px">Aside</el-aside>
  </el-container>
</template>

<script>
import ChatInput from "../components/ChatInput.vue";
import RoomHeader from "../components/RoomHeader.vue";
import ScrollView from "../components/ScrollView.vue";
import WebsocketSession from "../utils/websocketSession";

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
      roomId: "onlyOne",
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
      const wsuri = "ws://127.0.0.1:9090";
      const websocket = new WebSocket(wsuri);
      this.websocketSession = new WebsocketSession(websocket);
      this.websocketSession.on("open", this.websocket_onOpen.bind(this));
      this.websocketSession.on("error", this.websocket_onError.bind(this));
      this.websocketSession.on("close", this.websocket_onClose.bind(this));
      this.websocketSession.on("push", this.websocket_onPush.bind(this));
    },

    websocket_onPush(message) {
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
  padding: 0 20px;
}
</style>
