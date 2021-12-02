<template>
  <div class="chat-item">
    <div
      v-if="item.sender.userId !== curUser.userId"
      class="left-chat-content-div"
    >
      <el-image class="user-avatar" :src="item.sender.avatar"></el-image>
      <div class="user-name-and-content-div">
        <div class="user-name">{{ item.sender.username }}</div>
        <div
          v-if="item.chat_message.type == 'text'"
          class="text-div other-text-div"
        >
          {{ item.chat_message.content }}
        </div>
        <div
          v-else-if="item.chat_message.type == 'picture'"
          class="picture-div"
        >
          <el-image :src="item.chat_message.path"></el-image>
        </div>
        <div
          v-else-if="item.chat_message.type == 'voice'"
          class="voice-div other-voice-div"
        >
          <el-image :src="item.chat_message.path" :click="playVoice"></el-image>
        </div>
      </div>
    </div>
    <div v-else class="right-chat-content-div">
      <div
        v-if="item.chat_message.type == 'text'"
        class="text-div self-text-div"
      >
        {{ item.chat_message.content }}
      </div>
      <div v-else-if="item.chat_message.type == 'picture'" class="picture-div">
        <el-image :src="item.chat_message.path"></el-image>
      </div>
      <div
        v-else-if="item.chat_message.type == 'voice'"
        class="voice-div self-voice-div"
      >
        <el-image :src="item.chat_message.path" :click="playVoice"></el-image>
      </div>
      <el-image class="user-avatar" :src="item.sender.avatar"></el-image>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },

  name: "ScrollViewItem",
  methods() {
    return {
      // 点击预览图片
      divFullPicture: function () {
        // var path = e.currentTarget.dataset.path
        // wx.predivImage({
        //   current: path,
        //   urls: [path]
        // })
      },
      // 点击播放语音
      playVoice: function () {
        // var path = e.currentTarget.dataset.path
        // wx.playVoice({
        //   filePath: path
        // })
      },
    };
  },
  computed: {
    curUser() {
      return this.$store.state.user;
    },
  },
};
</script>

<style scoped>
.chat-item {
  margin: 30px 0px;
}

.left-chat-content-div {
  display: flex;
  justify-content: flex-start;
}

.right-chat-content-div {
  display: flex;
  justify-content: flex-end;
}

.user-avatar {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin: 0 15px;
}

.user-name {
  font-size: small;
  color: #aaa;
  margin-top: -10px;
  margin-bottom: 5px;
}

.text-div {
  position: relative;
  color: #000;
  padding: 8px;
  border-radius: 5px;
  max-width: 70%;
  word-wrap: break-word; /*因为数字和字母不会自动换行，导致内容溢出*/
}

.voice-div {
  position: relative;
  border-radius: 5px;
  width: 50px;
  text-align: center;
}

.other-text-div,
.other-voice-div {
  background-color: #fff;
}

.other-text-div::before,
.other-voice-div::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 8px;
  left: -14px;
  border: solid 7px;
  border-color: #eee #fff #eee #eee;
}

.self-text-div,
.self-voice-div {
  background-color: #52b061;
}

.self-text-div::before,
.self-voice-div::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 8px;
  right: -14px;
  border: solid 7px;
  border-color: #eee #eee #eee #52b061;
}

.picture-div image {
  border-radius: 5px;
  background-color: #fff;
  width: 200px;
}

.other-voice-div image {
  width: 25px;
  height: 25px;
  margin-top: 5px;
}

.self-voice-div image {
  width: 25px;
  height: 25px;
  margin-top: 5px;
}
</style>
