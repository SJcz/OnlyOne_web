<template>
  <div class="wellcome">
    <div class="row main-div">
      <div class="col-md-offset-3 col-md-6">
        <h1>Only One</h1>
        <h5>只有一个房间的聊天室</h5>
        <h5>每次进入赋予一个全新的身份</h5>
        <h5>进来就是开始, 离开就是结束...</h5>
        <button><router-link to="/chat">进入OnlyOne</router-link></button>
      </div>
    </div>
  </div>
</template>

<script >
export default {
  name: "Wellcome",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wellcome {
  width: 100%;
  text-align: center;
  background-image: linear-gradient(
    to top,
    #fcc5e4 0%,
    #fda34b 15%,
    #ff7882 35%,
    #c8699e 52%,
    #7046aa 71%,
    #0c1db8 87%,
    #020f75 100%
  );
  height: 100%;
  color: white;
}

.main-div {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
  color: #1c1e21;
}
.router-link-active {
  color: #1c1e21;
}
</style>