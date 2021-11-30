<template>
    <div class='main'>
<el-scrollbar>
    <div v-for="item in chatList" :key="item" class="chat-item">
        <div class="time-tip-div"></div>
        <div wx:if="{{item.role == 'other'}}" class="left-chat-content-div">
      <el-image src="{{item.avatar}}" class="user-avatar"></el-image>
      <div wx:if="{{item.type == 'text'}}" class="other-text-div">{{item.content}}</div>
      <div wx:elif="{{item.type == 'picture'}}" class="picture-div">
        <el-image src="{{item.path}}" bindtap="divFullPicture" mode="aspectFit" data-path="{{item.path}}"></el-image>
      </div>
      <div wx:elif="{{item.type == 'voice'}}" class="other-voice-div">
        <el-image src="{{voiceIcon}}" bindtap="playVoice" data-path="{{item.path}}" ></el-image>
      </div>
    </div>
    <div wx:else class="right-chat-content-div">
      <div wx:if="{{item.type == 'text'}}" class="self-text-div">{{item.content}}</div>
      <div wx:elif="{{item.type == 'picture'}}" class="picture-div">
        <el-image src="{{item.path}}" bindtap="divFullPicture" mode="aspectFit" data-path="{{item.path}}"></el-image>
      </div>
      <div wx:elif="{{item.type == 'voice'}}" class="self-voice-div">
        <el-image src="{{voiceIcon}}" bindtap="playVoice" data-path="{{item.path}}"></el-image>
      </div>
      <el-image src="{{item.avatar}}" class="user-avatar"></el-image>
    </div>
    </div>

</el-scrollbar>
    </div>
</template>

<script>
export default {
  props: {
    chatList: Array,
    swiperHeight: Number
  },

  name: 'ScrollView',
  data () {
    return {
      messageList: []
    }
  },
  methods () {
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
      }
    }
  }
}
</script>

<style scoped>
.chat-item {
  margin: 30rpx 10rpx;
}


.left-chat-content-div {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.right-chat-content-div{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.user-avatar {
  width: 70rpx;
  height: 70rpx;
  border-radius: 5rpx;
  margin: 0 30rpx;
}

.other-text-div {
  position: relative;
  background-color: #fff;
  color: #000;
  padding: 10rpx;
  border-radius: 10rpx;
  max-width: 70%;
  word-wrap:break-word; /*因为数字和字母不会自动换行，导致内容溢出*/
}

.other-text-div::before, .other-voice-div::before{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: 16rpx;
  left: -28rpx;
  border: solid 14rpx;
  border-color: #eee #fff #eee #eee;
}

.self-text-div {
  position: relative;
  background-color: #52b061;
  color: #fff;
  padding: 10rpx;
  border-radius: 10rpx;
  max-width: 70%;
  word-wrap:break-word;
}

.self-text-div::before, .self-voice-div::before{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  top: 16rpx;
  right: -28rpx;
  border: solid 14rpx;
  border-color: #eee #eee #eee #52b061;
}

.picture-div image{
  border-radius: 10rpx;
  background-color: #fff;
  width: 200px;
}

.other-voice-div {
  position: relative;
  background-color: #fff;
  border-radius: 10rpx;
  width: 100rpx;
  text-align: center;
}

.other-voice-div image{
  width: 50rpx;
  height: 50rpx;
  margin-top: 10rpx;
}

.self-voice-div {
  position: relative;
  background-color: #52b061;
  border-radius: 10rpx;
  width: 100rpx;
  text-align: center;
}

.self-voice-div image{
  width: 50rpx;
  height: 50rpx;
  margin-top: 10rpx;
}
</style>
