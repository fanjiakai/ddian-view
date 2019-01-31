<template>
  <el-container>
    <el-header height="90">
      <nav-bar></nav-bar>
    </el-header>
    <el-main>
      <div class="list-main">
        <div class="list-main-left">
          <ul>
            <li>
              <el-col >
                <el-card shadow="hover">
                  <div class="my-card">
                    <div style="overflow: hidden">
                      <div class="my-card-img">
                        <img src="../../../static/images/Hydrangeas.jpg" alt="">
                      </div>
                      <div class="my-card-title">
                        <h3>标题展示</h3>
                        <div>作者及时间</div>
                      </div>
                    </div>
                    <p class="my-card-synopsis">内容简介内容简介内容简介内容简介内容简介内容简介内容简介内内容简介内容简介内容简介内容简介内容简介内容简介内容内容简介内容简介内容简介内容简介内容简介</p>
                  </div>
                </el-card>
              </el-col>
            </li>
            <li>
              <el-col >
                <el-card shadow="hover">
                  <div class="my-card">
                    <div style="overflow: hidden">
                      <div class="my-card-img">
                        <img src="../../../static/images/Hydrangeas.jpg" alt="">
                      </div>
                      <div class="my-card-title">
                        <h3>标题展示</h3>
                        <div>作者及时间</div>
                      </div>
                    </div>
                    <p class="my-card-synopsis">内容简介内容简介内容简介内容简介内容简介内容简介内容简介内内容简介内容简介内容简介内容简介内容简介内容简介内容内容简介内容简介内容简介内容简介内容简介</p>
                  </div>
                </el-card>
              </el-col>
            </li>
            <li>
              <el-col >
                <el-card shadow="hover">
                  <div class="my-card">
                    <div style="overflow: hidden">
                      <div class="my-card-img">
                        <img src="../../../static/images/Hydrangeas.jpg" alt="">
                      </div>
                      <div class="my-card-title">
                        <h3>标题展示</h3>
                        <div>作者及时间</div>
                      </div>
                    </div>
                    <p class="my-card-synopsis">内容简介内容简介内容简介内容简介内容简介内容简介内容简介内内容简介内容简介内容简介内容简介内容简介内容简介内容内容简介内容简介内容简介内容简介内容简介</p>
                  </div>
                </el-card>
              </el-col>
            </li>
            <li>
              <el-col >
                <el-card shadow="hover">
                  <div class="my-card">
                    <div style="overflow: hidden">
                      <div class="my-card-img">
                        <img src="../../../static/images/Hydrangeas.jpg" alt="">
                      </div>
                      <div class="my-card-title">
                        <h3>标题展示</h3>
                        <div>作者及时间</div>
                      </div>
                    </div>
                    <p class="my-card-synopsis">内容简介内容简介内容简介内容简介内容简介内容简介内容简介内内容简介内容简介内容简介内容简介内容简介内容简介内容内容简介内容简介内容简介内容简介内容简介</p>
                  </div>
                </el-card>
              </el-col>
            </li>
          </ul>
        </div>
        <div class="list-main-right">
          <div class="list-main-right-top">

          </div>
          <div class="list-main-right-bottom">

          </div>
        </div>
      </div>
    </el-main>
    <my-footer></my-footer>
  </el-container>
</template>

<script>
  import MyFooter from "../element/MyFooter";
  import NavBar from "../element/NavBar";
    export default {
      name: "list",
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
  .el-container{
     width: 1024px;
     margin: 0 auto;
   }
  .list-main{
    width: 90%;
    margin: 0 auto;
    overflow: hidden;
  }
  .list-main .list-main-left{
    float: left;
    width: 70%;
  }
  .list-main .list-main-left ul{
    margin: 45px auto;
  }
  .list-main .list-main-left ul li{
    width: 80%;
    overflow: hidden;
    transition: 0.6s;
    margin: 0 auto;
    margin-bottom: 35px;
  }
  .list-main .list-main-left ul li:hover{
    box-shadow: 2px 2px 12px 0 rgba(0,0,0,.4);
  }
  .list-main-left .my-card{
  }
  .list-main-left .my-card .my-card-img{
    width: 38%;
    height: 106px;
    float: left;
  }
  .list-main-left .my-card .my-card-img img{
    width: 100%;
    height: 100%;
  }
  .list-main-left .my-card .my-card-title{
    float: left;
    width: 62%;
  }
  .list-main-left .my-card .my-card-title h3{
    text-align: center;
  }
  .list-main-left .my-card .my-card-synopsis{
  }
  .list-main .list-main-right{
    width: 30%;
    float: right;
    padding: 20px;
  }
  .list-main .list-main-right .list-main-right-top{
    height: 280px;
    margin-bottom: 20px;
    border: 1px solid #000000;
  }
  .list-main .list-main-right .list-main-right-bottom{
    height: 500px;
    border: 1px solid #000000;
  }
</style>
