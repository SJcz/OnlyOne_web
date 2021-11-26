<template>
    <div class='footer'>
        <el-input v-model="textarea" :autosize="{ minRows: 4, maxRows: 10 }" type="textarea" placeholder="Please input" />
        <el-button type="success">Success</el-button>
    </div>
</template>

<script>
export default {
  name: 'ChatInput',
  data () {
    return {
      roomName: ''
    }
  },
  methods () {
    return {

    }
  }
}
</script>
