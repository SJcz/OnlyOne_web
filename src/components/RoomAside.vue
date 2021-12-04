<template>
  <div class="aside">
    {{ userCount }}
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
  height: 100%;
}
</style>
