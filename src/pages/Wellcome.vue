<template>
  <div class="wellcome" >
    <el-row>
    <el-col :span="8" :offset="8">
      <el-container>
      <el-header></el-header>
      <el-main class="main"> 
        <h1 class="cover-heading">Cover your page.</h1>
        <p>Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
        <p class="lead">
          <button><router-link to="/chat">进入OnlyOne</router-link></button>
        </p>
      </el-main>
      <el-footer></el-footer>
    </el-container>
      
    </el-col>
  </el-row>
    
  </div>
</template>

<script>
export default {
  name: 'Wellcome',
  data () {
    return {
      background_image: require('@/assets/index-background.jpg'),
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wellcome {
    width: 100%;
    text-align: center;
    background-color: #333;
    height: 100%;
    background-image: url('../assets/index-background.jpg');
  }

  .main {
    margin-top: 50%;;
  }

  .cover-heading {
    font-size: 2.5rem;
    font-weight: 500;
    line-height: 1.2;
  }

  p {
    font-size: 1.25rem;
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
    text-decoration:none ; 
    color: #333;
}
.router-link-active {
    text-decoraction: none ;
    color: #333;
}
</style>
