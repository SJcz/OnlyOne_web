<template>
  <div class="wellcome">
    <el-row>
      <el-col :span="8" :offset="8">
        <el-container style="height: 100%">
          <el-header></el-header>
          <el-main class="main">
            <h1 class="cover-heading">Only One</h1>
            <p>只有一个房间的聊天室</p>
            <p>每次进入赋予一个全新的身份</p>
            <p>进来就是开始, 离开就是结束...</p>
            <p class="lead">
              <button><router-link to="/chat">进入OnlyOne</router-link></button>
            </p>
          </el-main>
          <el-footer class="el-footer"></el-footer>
        </el-container>
      </el-col>
    </el-row>
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
  background-color: #333;
  height: 100%;
}

.main {
  margin-top: 25%;
}

.cover-heading {
  font-size: 2.5rem;
  font-weight: 500;
  line-height: 1.2;
}

p {
  font-size: 1.2rem;
  font-weight: 300;
}

button {
  color: #333;
  text-shadow: none;
  background-color: #fff;
  border: 0.05rem solid #fff;
  padding: 0.75rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

a {
  text-decoration: none;
  color: #333;
}
.router-link-active {
  color: #333;
}
</style>
