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
        <span>注册: {{ registerTime }}</span>
      </div>
    </div>
    <div class="system-info">
      <label>每 5s 刷新一次下列信息:</label>
      <div>
        <p>当前在线人数: {{ userCount }}</p>
      </div>
      <div>
        <p>服务器进程信息:</p>
        <span>连接进程数量: {{ systemInfo.process.worker_num }}</span>
        <span>当前连接进程ID: {{ systemInfo.process.process_id }}</span>
        <span
          >当前连接进程用户数量:
          {{ systemInfo.process.process_session_num }}</span
        >
      </div>
      <div>
        <p>进程内存信息:</p>
        <span>heapTotal: {{ systemInfo.memory.heapTotal }} M</span>
        <span>heapUsed: {{ systemInfo.memory.heapUsed }} M</span>
        <span>rss: {{ systemInfo.memory.rss }} M</span>
      </div>
      <div>
        <p>进程 CPU 使用信息:</p>
        <span>user: {{ systemInfo.cpu_usage.user }} ms</span>
        <span>system: {{ systemInfo.cpu_usage.system }} ms</span>
      </div>
    </div>
    <div class="connect-info">
      <span
        v-for="item in connectInfo"
        :key="item"
        :class="item.type"
        :item="item"
        >{{ item.date }} {{ item.info }}</span
      >
    </div>
  </div>
</template>

<script>
import github_img from "@/assets/github.svg";
export default {
  props: {
    userCount: Number,
    systemInfo: Object,
    connectInfo: Array,
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
      const date = new Date(this.$store.state.user.register_time);
      return (
        date.toLocaleDateString() +
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
.user-info {
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
  padding: 10px;
}

.setting-info {
  margin-top: 20px;
  font-size: small;
  color: #222;
  padding: 10px;
}

label {
  font-size: xx-small;
  color: #d3706e;
  margin: 10px;
}

.system-info div {
  padding: 10px 10px;
}

.connect-info {
  padding: 10px 10px;
}

span {
  font-size: x-small;
  color: #333;
  display: block;
  margin: 10px 0;
}

span.error {
  color: rgb(153, 37, 37);
}
span.success {
  color: rgb(64, 122, 41);
}

p {
  margin: 0;
}
</style>
