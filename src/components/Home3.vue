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
        <el-header height="90px" class="home_nav">
          <div class="home_nav_sign home_nav_left">logo</div>
          <div class="home_nav_right">
            <ul>
              <li><button>首页</button></li>
              <li>
                <el-dropdown style="width: 100%">
                  <span class="el-dropdown-link" style="width: 100%">
                    <button>列表</button>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>列表1</el-dropdown-item>
                    <el-dropdown-item>列表2</el-dropdown-item>
                    <el-dropdown-item>列表3</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </li>
              <li><button>论坛</button></li>
              <li><button>关于我们</button></li>
            </ul>
          </div>
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
    <!--<el-footer class="home_footer" height="76px">页脚</el-footer>-->
    <MyFooter></MyFooter>
  </el-container>
</template>

<script>
  import {bus} from "../bus.js";
  import MyFooter from "./element/MyFooter";
  export default {
    name: "home",
    components: {MyFooter},
    created() {
    },
    data() {
      return {
        search:''
      };
    },
    methods: {
    },
    mounted() {
    }
  };
</script>
<style scoped>
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
  .home_main{
    margin: 0 62px;
  }
  .home_nav{
    border: 1px solid #2c3e50;
    padding: 0 62px;
  }
  .home_slide{
    background-color: #5b5c5e;
    -moz-box-sizing: border-box;  /*Firefox3.5+*/-webkit-box-sizing: border-box; /*Safari3.2+*/-o-box-sizing: border-box; /*Opera9.6*/-ms-box-sizing: border-box; /*IE8*/box-sizing: border-box; /*W3C标准(IE9+，Safari5.1+,Chrome10.0+,Opera10.6+都符合box-sizing的w3c标准语法)*/
    width: 100%;
    padding: 20px;
  }
  .home_nav_sign{

  }
  .home_nav_left{
    display: inline-block;
    width: 260px;
    height: 100%;
    background-color: #ffde5d;
  }
  .home_nav_right{
    float: right;
    display: inline-block;
    height: 100%;
  }
  .home_nav_right ul{
    float: right;
    display: inline-block;
    list-style:none;
    margin:0px;
    height: 100%;
  }
  .home_nav_right ul li{
    display: inline-block;
    margin: 0 auto;
    width: 90px;
    height: 100%;
    padding-right: 35px;
  }
  .home_nav_right ul li button{
    display: inline-block;
    width: 100%;
    height: 40px;
    margin-top: 24px;
    color: #409eff;
    background: #ecf5ff;
    border-color: #b3d8ff;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    border-radius: 6px;
    cursor: pointer;
  }
  .home_nav_right ul li:first-child button{
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
  }
  .home_nav_right ul li:first-child button:hover{
    color: #fff;
    background-color: #0f7aff;
    border-color: #1385ff;
  }
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
