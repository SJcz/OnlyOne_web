<template>
  <router-view></router-view>
</template>

<script>
// import Chat from './components/Chat.vue'
// import Wellcome from './pages/Wellcome.vue'

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>

#app {
  width: 100%;
  height: 100%;
}

body {
  box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%);
  text-shadow: 0 0.05rem 0.1rem rgb(0 0 0 / 50%);
  display: flex;
  color: #fff;
  background-color: #333;
  height: auto;
  min-height: 100%;
}
</style>
