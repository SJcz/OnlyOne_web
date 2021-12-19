<template>
  <div class="header">
    <span>{{ roomId }}</span>
  </div>
</template>

<script >
export default {
  props: {
    roomId: String,
  },
  name: "RoomHeader",
  data() {
    return {};
  },
  methods() {
    return {};
  },
};
</script>


<style scoped>
.header {
  color: white;
  font-size: larger;
  background-color: #333;
}

.header span {
  display: block;
  margin: 10px 0 0 20px;
}
</style>
