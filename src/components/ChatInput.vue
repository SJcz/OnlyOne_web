<template>
  <div class="footer">
    <img
      :src="biaoqing_icon"
      class="img-rounded img-icon"
      @click="changeEmojiPickerVisible"
    />
    <div class="vuw-emoji-picker-container" v-show="!emojiPickerHide">
      <VuemojiPicker @emojiClick="handleEmojiClick" />
    </div>
    <img :src="picture_icon" class="img-rounded img-icon" />
    <textarea
      v-model="textarea"
      rows="5"
      placeholder=""
      @keydown.enter="keyDown"
    />
  </div>
</template>

<script >
import biaoqing_icon from "@/assets/biaoqing_icon.svg";
import picture_icon from "@/assets/picture_icon.svg";
import { VuemojiPicker } from "vuemoji-picker";
export default {
  name: "ChatInput",
  components: {
    VuemojiPicker,
  },
  data() {
    return {
      roomName: "",
      textarea: "",
      emojiPickerHide: true,
      biaoqing_icon: biaoqing_icon,
      picture_icon: picture_icon,
    };
  },
  methods: {
    changeEmojiPickerVisible() {
      this.emojiPickerHide = !this.emojiPickerHide;
    },
    handleEmojiClick(detail) {
      this.emojiPickerHide = true;
      this.textarea += detail.unicode;
    },
    sendMessage() {
      if (!this.textarea || !this.textarea.trim()) return;
      this.$emit("send", {
        type: "text",
        content: this.textarea,
      });
      this.textarea = "";
    },
    keyDown(e) {
      if (e.ctrlKey) {
        this.textarea += "\n";
      } else {
        e.preventDefault();
        this.sendMessage();
      }
    },
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  padding: 10px;
}

.footer > textarea {
  color: #333;
  resize: none;
  background-color: #eee;
  outline: #eee;
  border: 0px solid;
  width: 100%;
  height: 100%;
}

.vuw-emoji-picker-container {
  position: absolute;
  bottom: 150px;
}

.footer .img-icon {
  width: 30px;
  padding: 5px;
  cursor: pointer;
}
.footer .img-icon:hover {
  background-color: #ccc;
}
</style>
