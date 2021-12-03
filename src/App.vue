<template>
  <router-view></router-view>
</template>

<script >
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class App extends Vue {}
</script>

<style>
#app {
  width: 100%;
}
html {
  height: 100%;
}
body {
  box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%);
  display: flex;
  color: #fff;
  background-color: #333;
  height: auto;
  min-height: 100%;
  padding: 0;
  margin: 0;
}
</style>
