<template>
  <!--<el-header height="90px" class="home_nav">-->
  <div class="home_nav ">
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
  </div>
  <!--</el-header>-->
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
  /*导航栏*/
  li{
    list-style: none;
  }
  ul{
    padding: 0;
    margin: 0;
  }
  .home_nav{
    /*height: 90px;*/
    border: 1px solid #2c3e50;
    padding: 0 62px;
    overflow:hidden
  }
  .home_nav_sign{
    height: 90px;
    width: 260px;
    display: inline-block;
    background-color: #ffde5d;
  }
  .home_nav_left{
    float: left;
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
</style>
