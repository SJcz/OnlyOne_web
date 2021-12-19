<template>
  <div class="aside">
    <div class="user-info">
      <div class="media-left">
        <a href="#">
          <img class="media-object" :src="curUser.avatar" />
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{ curUser.username }}</h4>
        <span>注册时间: {{ registerTime }}</span>
      </div>
    </div>
    <div class="user-num-info">
      <p>每 10s 刷新一次在线人数</p>
      <span>当前在线人数: {{ userCount }}</span>
    </div>
    <div class="setting-info">
      <ul class="list-group">
        <!-- <li class="list-group-item"><img :src="github_img" alt="" /></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import github_img from "@/assets/github.svg";
export default {
  props: {
    userCount: Number,
    userList: Array,
  },
  name: "RoomAside",
  data() {
    return {
      github_img,
    };
  },
  methods() {
    return {};
  },
  computed: {
    curUser() {
      return this.$store.state.user;
    },
    registerTime() {
      console.log(this.$store.state.user);
      const date = new Date(this.$store.state.user.register_time);
      return (
        date.toLocaleDateString() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes()
      );
    },
  },
};
</script>


<style scoped>
.aside {
}

.user-info {
  /* border-bottom: 1px solid #ddd; */
  padding: 10px;
}

.media-object {
  width: 35px;
  height: 35px;
  border-radius: 3px;
}

.media-heading {
  font-size: small;
  color: #222;
  margin-bottom: 5px;
}

.media-body span {
  font-size: xx-small;
  color: #aaa;
}

.user-num-info {
  margin-top: 20px;
  font-size: small;
  color: #222;
  /* border-bottom: 1px solid #ddd; */
  padding: 10px;
}
</style>
