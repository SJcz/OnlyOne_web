<template>
  <el-container>
      <el-container>
        <el-header><room-header></room-header></el-header>
        <el-main><scroll-view></scroll-view></el-main>
        <el-footer><chat-input></chat-input></el-footer>
      </el-container>
      <el-aside width="200px">Aside</el-aside>
    </el-container>
</template>

<script>
import ChatInput from '../components/ChatInput.vue'
import RoomHeader from '../components/RoomHeader.vue'
import ScrollView from '../components/ScrollView.vue'
export default {
  components: {
    'room-header': RoomHeader,
    'chat-input': ChatInput,
    'scroll-view': ScrollView
  },
  name: 'Chat',
  data () {
    return {
      msg: ''
    }
  },
  methods () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
