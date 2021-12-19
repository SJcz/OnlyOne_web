<template>
  <div class="aside">
    <p>每 10s 刷新一次在线人数</p>
    当前房间在线人数: {{ userCount }}
  </div>
</template>

<script>
export default {
  props: {
    userCount: Number,
  },
  name: "RoomAside",
  data() {
    return {};
  },
  methods() {
    return {};
  },
};
</script>


<style scoped>
.aside {
  color: #333;
  padding: 10px;
}

p {
  font-size: small;
  color: #777;
}
</style>
