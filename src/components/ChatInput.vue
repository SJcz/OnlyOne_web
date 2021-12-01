<template>
    <div class='footer'>
        <el-row>
  
        </el-row>

        <el-input v-model="textarea" :autosize="{ minRows: 4, maxRows: 10 }" type="textarea" placeholder="Please input" @keydown.enter="keyDown"/>
    </div>
</template>

<script>

import biaoqing_icon from '@/assets/biaoqing_icon.png'
export default {
  name: 'ChatInput',
  data () {
    return {
      roomName: '',
      textarea: '',
      biaoqing_icon: biaoqing_icon
    }
  },
  methods: {
    sendMessage() {
      console.log(this.textarea)
      if (!this.textarea || !this.textarea.trim()) return;
      this.$emit('send', {
        type: 'text',
        content: this.textarea
      });
    },
    keyDown(e) {
      if (e.ctrlKey) {
        this.textarea += '\n';
      } else {
        e.preventDefault();
        this.sendMessage();
      }
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: thistle;
}
</style>
