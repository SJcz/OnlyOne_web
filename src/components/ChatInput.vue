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
    <img :src="picture_icon" class="img-rounded img-icon" @click="selectFile" />
    <!-- 给这个input 设置样式隐藏，切忌不可用display控制隐藏,可能不能跨浏览器 -->
    <input
      type="file"
      ref="fileInput"
      @change="getFilePath"
      style="filter: alpha(opacity=0); opacity: 0; width: 0; height: 0"
    />
    <textarea
      ref="textarea"
      v-model="textareaText"
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
      textareaText: "",
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
      this.textareaText += detail.unicode;
      this.$refs.textarea.focus();
    },
    sendMessage() {
      if (!this.textareaText || !this.textareaText.trim()) return;
      this.$emit("send", {
        type: "text",
        content: this.textareaText,
      });
      this.textareaText = "";
    },
    keyDown(e) {
      if (e.ctrlKey) {
        this.textarea += "\n";
      } else {
        e.preventDefault();
        this.sendMessage();
      }
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    getFilePath(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.$store.state.cosHelper.uploadFile(file, (url) => {
        this.$emit("send", {
          type: "picture",
          path: url,
        });
      });
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
