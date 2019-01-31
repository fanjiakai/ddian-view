<template>
  <el-container class="page_main">
    <el-header class="home_search" height="90px">
      <div style="margin-top: 40px;width: 400px;float: right">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select" size="small">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </el-header>
    <el-main>
      <el-container>
        <el-header height="90px">
          <nav-bar></nav-bar>
        </el-header>
        <el-main class="home_main">
          <el-container>
            <el-aside width="570px">
              <div class="home_slide">
                <img src="../../static/images/Koala.jpg" alt="" width="100%" height="350px">
              </div>
            </el-aside>
            <el-main class="home_main_right">
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark recomList_top">上</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark recomList_bottom">下</div></el-col>
              </el-row>
            </el-main>
          </el-container>
          <div class="boundary_line"></div>
          <el-footer class="home_footer_model" style="height: 100%">
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple home_footer_models">
                <router-link :to="{name: 'model',params: {model: '1'}}">模块1</router-link>
              </div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light home_footer_models">模块2</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple home_footer_models">模块3</div></el-col>
            </el-row>
            <el-row>
              <el-col :span="8"><div class="grid-content bg-purple home_footer_models">模块1</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple-light home_footer_models">模块2</div></el-col>
              <el-col :span="8"><div class="grid-content bg-purple home_footer_models">模块3</div></el-col>
            </el-row>
          </el-footer>
        </el-main>
      </el-container>
    </el-main>
    <el-footer>
      <my-footer></my-footer>
    </el-footer>
  </el-container>
</template>
<script>
  import MyFooter from "./element/MyFooter";
  import NavBar from "./element/NavBar";
  export default {
        name: "Home",
      components: {MyFooter,NavBar},
    }
</script>

<style scoped>
  .page_main{
    width: 1024px;
    margin: 0 auto;
  }
  .home_main_right{
    padding-left: 30px;
    margin-top: 70px;
  }
  .home_search{
    background-image: url("../../static/images/Chrysanthemum.jpg");
  }

  /*主体*/
  .home_main_right{
    padding-left: 30px;
    margin-top: 70px;
  }
  .home_search{
    background-image: url("../../static/images/Chrysanthemum.jpg");
  }
  .home_footer{
    background-color: #989090;
  }
  .recomList_top{
    height: 111px;
    border: 1px solid #2C2C2C;
  }
  .recomList_bottom{
    margin-top: 30px;
    height: 111px;
    border: 1px solid #2C2C2C;
  }
  .boundary_line{
    border: 1px solid #000000;
    margin: 15px 40px;
  }
  .home_footer_model{
    border: 1px solid #2C2C2C;
  }
  .home_footer_models{
    border: 1px solid #1E9FFF;
    margin: 12px auto;
    /*padding: 12px;*/
    width: 250px;
    height: 175px;
  }

</style>
