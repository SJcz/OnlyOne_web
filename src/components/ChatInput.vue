<template>
  <div class="footer">
    <div></div>

    <textarea
      v-model="textarea"
      rows="5"
      placeholder=""
      @keydown.enter="keyDown"
    />
  </div>
</template>

<script >
import biaoqing_icon from "@/assets/biaoqing_icon.png";
export default {
  name: "ChatInput",
  data() {
    return {
      roomName: "",
      textarea: "",
      biaoqing_icon: biaoqing_icon,
    };
  },
  methods: {
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
</style>
