<template>
  <div class="chat container">
    <div class="row room-main">
      <div class="col-lg-6 col-lg-offset-2 padding-0">
        <div class="room-header"><room-header :room-id="roomId"></room-header></div>
        <div class="room-scroller"><scroll-view :chat-list="chatList"></scroll-view></div>
        <div class="room-footer"><chat-input @send="sendChat"></chat-input></div>
      </div>
      <div class="col-lg-2 padding-0" >
        <div class="room-aside"><room-aside :user-count="userCount"></room-aside></div>
      </div>
    </div>
  </div>
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
.chat {
  width: 100%;
  height: 100%;
  font-family: "Libre Franklin", sans-serif;
  background-image: linear-gradient(to top, #30cfd0 0%, #330867 100%);
}

.room-main {
  margin-top: 5%;
}

.padding-0 {
  padding: 0;
}

.room-header {
  min-height: 50px;
  max-height: 60px;
  background-color: #333;
  border-top: 1px solid #333;
  border-left: 1px solid #333;
  border-top-left-radius: 5px;
}

.room-scroller {
  min-height: 400px;
  max-height: 500px;
  height: 50%;
  background-color: #eee;
  border-bottom: 1px solid #aaa;
  overflow-y: auto;
}

.room-scroller::-webkit-scrollbar{

  /*滚动条整体样式*/
  width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }

  .room-scroller::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 10px;
  background-color: rgb(159, 175, 182);
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  .room-scroller::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
  background   : #ededed;
  border-radius: 10px;
  }

.room-footer {
  background-color: #eee;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-bottom-left-radius: 5px;
}

.room-aside {
  height: 100%;
  background-color: #eee;
  border: 1px solid #ddd;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
</style>
