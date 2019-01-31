<template>
  <el-container class="page_main">
    <el-header height="90">
      <nav-bar></nav-bar>
    </el-header>
    <el-main>
      <div class="details-main"></div>
    </el-main>
    <el-footer>
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>

<script>
  import MyFooter from "../element/MyFooter";
  import NavBar from "../element/NavBar";
    export default {
      name: "details",
      components: {MyFooter,NavBar},

    }
</script>

<style scoped>
  li{
    list-style: none;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  div{
    -moz-box-sizing: border-box; /*Firefox3.5+*/
    -webkit-box-sizing: border-box; /*Safari3.2+*/
    -o-box-sizing: border-box; /*Opera9.6*/
    -ms-box-sizing: border-box; /*IE8*/
    box-sizing: border-box; /*W3C标准*/
  }
  .el-footer{
    padding: 0;
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding: 0;
  }
  .page_main{
    width: 1024px;
    margin: 0 auto;
  }
  .details-main{
    height: 864px;
    background-color: red;
  }
</style>
