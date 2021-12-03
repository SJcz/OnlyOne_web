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
  height: 100%;
  color: #000;
  font-size: larger;
}

.header span {
  display: block;
  position: relative;
  top: 20px;
}
</style>
