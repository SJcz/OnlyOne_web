<template>
  <div class="chat container">
    <div class="row room-main">
      <div
        class="
          col-lg-2 col-lg-offset-2
          padding-0
          col-md-2 col-md-offset-2 col-sm-2 col-xs-2
        "
      >
        <div class="room-aside">
          <room-aside
            :user-count="userCount"
            :system-info="systemInfo"
            :connect-info="connectInfo"
          ></room-aside>
        </div>
      </div>
      <div class="col-lg-6 col-md-8 col-sm-10 col-xs-10 padding-0">
        <div class="room-header">
          <room-header :room-id="roomId"></room-header>
        </div>
        <div class="room-scroller">
          <scroll-view :chat-list="chatList"></scroll-view>
        </div>
        <div class="room-footer">
          <chat-input @send="sendChat"></chat-input>
        </div>
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
import config from "../config/config";
import { encrptToken, uuid } from "../utils/utils";
import COSHelper from "../utils/cos.helper";
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
      systemInfo: {
        process: {},
        memory: {},
        cpu_usage: {},
      },
      connectInfo: [],
    };
  },
  computed: {
    curUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    fromatDate(date) {
      return (
        date.getMonth() +
        1 +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":" +
        (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds())
      );
    },
    initWebsocket() {
      const token = encrptToken();
      const wsuri = `ws://${config.ws_server_host}:${config.ws_server_port}/websocket?token=${token}`;
      const websocket = new WebSocket(wsuri);
      this.websocketSession = new WebsocketSession(websocket);
      this.connectInfo.push({
        type: "normal",
        date: this.fromatDate(new Date()),
        info: "正在连接服务器...",
      });
      this.websocketSession.on("open", this.websocket_onOpen.bind(this));
      this.websocketSession.on("error", this.websocket_onError.bind(this));
      this.websocketSession.on("close", this.websocket_onClose.bind(this));
      this.websocketSession.on("push", this.websocket_onPush.bind(this));
    },
    initCosHelper() {
      const token = encrptToken();
      const cosHelper = new COSHelper();
      cosHelper.initCos(token);
      this.$store.commit("updateCosHelper", cosHelper);
    },
    websocket_onPush(message) {
      // console.log(message);
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
      this.connectInfo.push({
        type: "success",
        date: this.fromatDate(new Date()),
        info: "成功连接上服务器",
      });
      this.websocketSession
        .request({
          route: "roomHandler.joinRoom",
          data: {
            room_id: this.roomId,
          },
        })
        .then((result) => {
          this.$store.commit("updateUser", result.user);
          this.websocketSession
            .request({
              route: "roomHandler.getRoomInfo",
              data: {
                room_id: this.roomId,
              },
            })
            .then((result) => {
              this.userCount = result.room_user_count + 1;
              this.systemInfo = result.system_info;
            });
          setInterval(() => {
            this.websocketSession
              .request({
                route: "roomHandler.getRoomInfo",
                data: {
                  room_id: this.roomId,
                },
              })
              .then((result) => {
                this.userCount = result.room_user_count;
                this.systemInfo = result.system_info;
              });
          }, 5000);
        })
        .catch(console.log);
    },
    websocket_onClose(e) {
      console.log("断开连接", e);
      this.connectInfo.push({
        type: "error",
        date: this.fromatDate(new Date()),
        info: "跟服务器断开连接",
      });
    },
    websocket_onError(err) {
      console.log(err);
      this.connectInfo.push({
        type: "error",
        date: this.fromatDate(new Date()),
        info: "连接错误",
      });
    },
    messageHandler_joinRoom() {},
    messageHandler_roomChat(data) {
      data.scrollId = "chat-" + uuid();
      if (this.chatList.length >= 500) {
        this.chatList = this.chatList.slice(-500);
      }
      console.log(data);
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
    this.initCosHelper();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.chat {
  width: 100%;
  height: 100%;
  font-family: "Libre Franklin", sans-serif;
}

.chat::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(
    to top,
    #fcc5e4 0%,
    #fda34b 15%,
    #ff7882 35%,
    #c8699e 52%,
    #7046aa 71%,
    #0c1db8 87%,
    #020f75 100%
  );
  /* background-image: url('../assets/bk.jpg'); */
  z-index: -1;
  background-size: cover;
}

.room-main {
  padding-top: 5%;
  display: flex;
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
  border-top-right-radius: 5px;
}

.room-scroller {
  height: 500px;
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid #aaa;
  border-left: 1px solid #aaa;
}

.room-footer {
  background-color: #eee;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-bottom-right-radius: 5px;
}

.room-aside {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.successAlert.show {
  position: absolute;
  top: 10px;
  left: 50%;
}

.successAlert.hide {
  position: absolute;
  top: 0px;
  left: 50%;
}
</style>