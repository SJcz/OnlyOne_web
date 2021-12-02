<template>
  <el-scrollbar class="scrollbar" max-height="400px" ref="scrollbar">
    <scroll-view-item v-for="item in chatList" :key="item" :item="item">
    </scroll-view-item>
  </el-scrollbar>
</template>

<script>
import ScrollViewItem from "./ScrollViewItem.vue";
export default {
  components: {
    "scroll-view-item": ScrollViewItem,
  },
  props: {
    chatList: Array,
    swiperHeight: Number,
  },
  name: "ScrollView",
  data() {
    return {};
  },
  methods: {
    inputSlider(value) {
      console.log(value);
      console.log(this.$refs.scrollbar);
      this.$refs.scrollbar.setScrollTop(value);
    },
  },
  watch: {
    chatList: {
      handler(oldVal, newVal) {
        console.log(newVal);
        this.inputSlider(10000);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.scrollbar {
  background-color: #eee;
  height: 400px;
}
</style>
