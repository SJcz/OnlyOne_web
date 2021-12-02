<template>
  <el-scrollbar class="scrollbar" max-height="400px" ref="scrollbar">
    <div ref="inner" id="inner">
      <scroll-view-item
        v-for="item in chatList"
        :key="item"
        :item="item"
        :id="item.scrollId"
      >
      </scroll-view-item>
    </div>
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
  watch: {
    chatList: {
      handler() {
        this.$nextTick(() => {
          document
            .getElementById(this.chatList[this.chatList.length - 1].scrollId)
            .scrollIntoView();
        });
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
