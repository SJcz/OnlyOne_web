<template>
<div class="chat-item">
  <div class="media" v-if="item.sender.userId !== curUser.userId">
    <div class="media-left" >
      <a href="#">
        <img class="media-object" :src="item.sender.avatar" >
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">{{item.sender.username}}</h4>
      <div
          v-if="item.chat_message.type == 'text'"
          class="text-div other-text-div">
          {{ item.chat_message.content }}
        </div>
        <div
          v-else-if="item.chat_message.type == 'picture'"
          class="picture-div">
          <image :src="item.chat_message.path"></image>
        </div>
    </div>
  </div>

  <div class="media" v-else>
    <div class="media-right" >
      <a href="#">
        <img class="media-object" alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">Media heading</h4>
      <div
          v-if="item.chat_message.type == 'text'"
          class="text-div other-text-div">
          {{ item.chat_message.content }}
        </div>
        <div
          v-else-if="item.chat_message.type == 'picture'"
          class="picture-div">
          <image :src="item.chat_message.path"></image>
        </div>
    </div>
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

.media-object {
  width: 30px;
  height: 30px;
  border-radius: 3px;
  margin: 0 15px;
}

.media-heading {
  font-size: small;
  color: #aaa;
  margin-bottom: 5px;
}

.text-div {
  color: #333;
  padding: 8px;
  border-radius: 5px;
  max-width: 50%;
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
