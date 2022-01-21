<template>
  <div class="chat-item">
    <div class="media" v-if="item.sender.userId !== curUser.userId">
      <div class="media-left">
        <a href="#">
          <img class="media-object" :src="item.sender.avatar" />
        </a>
      </div>
      <div class="media-body media-body-left">
        <h4 class="media-heading">
          {{ item.sender.username }}
          <span>{{ messageTime }} </span>
        </h4>
        <div
          v-if="item.chat_message.type == 'text'"
          class="text-div other-text-div"
          v-html="item.chat_message.content.replace(/\n/g, '<br>')"
        ></div>
        <div
          v-else-if="item.chat_message.type == 'picture'"
          class="picture-div other-picture-div"
        >
          <img
            :src="item.chat_message.path"
            class="img-thumbnail"
            @click="reviewImage"
          />
        </div>
      </div>
    </div>

    <div class="media" v-else>
      <div class="media-body media-body-right">
        <h4 class="media-heading">
          <span>{{ messageTime }} </span>{{ item.sender.username }}
        </h4>
        <div
          v-if="item.chat_message.type == 'text'"
          class="text-div self-text-div"
          v-html="item.chat_message.content.replace(/\n/g, '<br>')"
        ></div>
        <div
          v-else-if="item.chat_message.type == 'picture'"
          class="picture-div self-picture-div"
        >
          <img
            :src="item.chat_message.path"
            class="img-thumbnail"
            @click="reviewImage"
          />
        </div>
      </div>
      <div class="media-right">
        <a href="#">
          <img class="media-object" :src="item.sender.avatar" />
        </a>
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
  methods: {
    // 点击预览图片
    reviewImage: function (e) {
      console.log(e.target.src);
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
  },
  computed: {
    curUser() {
      return this.$store.state.user;
    },
    messageTime() {
      const date = new Date(this.item.send_time);
      return (
        date.getMonth() +
        1 +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
      );
    },
  },
};
</script>

<style scoped>
.chat-item {
  margin: 30px 0px;
}

.media-object {
  width: 35px;
  height: 35px;
  border-radius: 3px;
}

.media-left .media-object {
  margin: 0 0 0 15px;
}

.media-right .media-object {
  margin: 0 15px 0 0;
}

.media-heading {
  font-size: small;
  color: #444;
  margin-bottom: 5px;
}

.media-body-left .media-heading {
  text-align: left;
}

.media-body-right .media-heading {
  text-align: right;
}

.media-heading span {
  margin-left: 10px;
  margin-right: 10px;
  font-size: x-small;
}

.text-div {
  color: #333;
  padding: 8px;
  border-radius: 5px;
  max-width: 40%;
  word-wrap: break-word; /*因为数字和字母不会自动换行，导致内容溢出*/
}

.picture-div {
  position: relative;
  border-radius: 5px;
  width: 300px;
  text-align: center;
  cursor: pointer;
}

.other-text-div,
.other-picture-div {
  background-color: #fff;
  float: left;
}

.self-text-div,
.self-picture-div {
  background-color: #52b061;
  float: right;
}
</style>
