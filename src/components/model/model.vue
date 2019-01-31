<template>
  <el-container class="page_main">
    <!--<el-header height="90px" class="home_nav">
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
    </el-header>-->
    <el-header height="90">
      <nav-bar></nav-bar>
    </el-header>
    <el-main class="home_main">
      <!--搜索框-->
      <div class="search">
        <!--logo-->
        <div class="logo-image">
          <img src="../../../static/images/Tulips.jpg" alt="">
        </div>
        <div>
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-select v-model="select" slot="prepend" placeholder="请选择">
              <el-option label="餐厅名" value="1"></el-option>
              <el-option label="订单号" value="2"></el-option>
              <el-option label="用户电话" value="3"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <!--模块推荐-->
      <div class="main-recommend">
        <div class="main-recommend-img">
          <img src="../../../static/images/Desert.jpg" alt="">
        </div>
        <!--分类-->
        <div class="recommend-classify">
        <el-tabs type="border-card" tab-position="left">
          <el-tab-pane label="用户管理">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
        </div>
       <!-- <div class="recommend-classify">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
        &lt;!&ndash;分类-列表&ndash;&gt;
        <div class="recommend-list">
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>-->
      </div>
    </el-main>
    <MyFooter></MyFooter>
  </el-container>
</template>

<script>
    import MyFooter from "../element/MyFooter";
    import NavBar from "../element/NavBar";
    export default {
      name: "model",
      components: {MyFooter,NavBar},
      created() {
        this.model = this.$route.params.model;
        console.log(this.model);
      },
      data() {
        return {
          model:''
        };
      },
      methods: {

      },
    }
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
  li{
    list-style: none;
  }
  .page_main{
    width: 1024px;
    margin: 0 auto;
  }
  /*导航栏样式*/
  .home_nav{
    border: 1px solid #2c3e50;
    padding: 0 62px;
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
  .logo-image{
    padding: 0 auto;
    text-align: center;
  }
  .logo-image img{
    width: 444px;
    height: 60px;
    border: 0;
    vertical-align: bottom;
  }
  .search{
    margin-top: 40px;
  }
  .home_main{
    margin: 0 62px;
  }
  .main-recommend{
    margin-top: 60px;
    height: 430px;
    background-color: red;
    margin-bottom: 200px;
  }
  .main-recommend-img{
    float: left;
    margin-top: 20px;
    margin-left: 25px;
  }
  .main-recommend-img img{
    width: 70px;
    height: 358px;
  }

  .recommend-classify{
    float: left;
    margin-left: 50px;
    margin-top: 35px;
  }
  /*.recommend-classify ul li{
    margin-bottom: 20px;
    height: 54px;
    width: 54px;
    background-color: blueviolet;
    border-radius: 50px;
    text-align: center;
    line-height: 54px;
  }
  .recommend-list{
    float: left;
    margin-left: 50px;
    margin-top: 35px;
    border: 1px solid #000000;
    width: 530px;
    height: 372px;
  }
  .recommend-list ul li{
    width: 380px;
    height: 50px;
    margin-bottom: 20px;
  }
  .recommend-list ul li:first-child{
    margin-top: 27px;
  }
*/

</style>
