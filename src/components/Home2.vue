<template>
  <el-row>
    <!--头部-->
    <el-col :span=24 class="topbar-wrap">
      <div class="topbar-title">
      </div>
      <div class="topbar-menu">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          active-text-color="#e76b53">
          <el-menu-item index="1" @click="jumpTo('/index')">首页</el-menu-item>
          <el-menu-item index="2" @click="jumpTo('/tddmap')">资产地图</el-menu-item>
          <el-menu-item index="3" @click="jumpTo('/statistic')">统计分析</el-menu-item>
        </el-menu>
      </div>
      <div class="topbar-account topbar-btn">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner"><i class="iconfont icon-user"></i> {{nickname}}  <i
            class="iconfont icon-down"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span>个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span>修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>

    <el-col :span=24 class="main">
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span=24 class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
  import {bus} from "../bus.js";
  import API from "../api/api_user";

  export default {
    name: "home",
    created() {
      bus.$on("setNickName", text => {
        this.nickname = text;
      });

      bus.$on("goto", url => {
        if (url === "/login") {
          localStorage.removeItem("access-user");
        }
        this.$router.push(url);
      });
    },
    data() {
      return {
        defaultActiveIndex: "0",
        nickname: "",
        collapsed: false,
        activeArea: '1',
        activeIndex: '1',
        activeIndex2: '2',
        activeIndex3: '3',
        menus: [],
        data: [],
        areaLabel:{id:-1,text:'无'},
        defaultProps: {
          children: 'children',
          label: 'text'
        }
      };
    },
    methods: {
      handleNodeClick(data) {
        this.areaLabel.id = data.object.code;
        this.areaLabel.text = data.text;
        // this.areaLabel.id = 3;
        // this.areaLabel.text = "海南省";
        bus.$emit("transmitArea", {areaCode: data.object.code,areaName:data.text});
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },


      //折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed;
      },
      jumpTo(url) {
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
    },
    mounted() {
      this.menus = JSON.parse(window.localStorage.getItem('menus'));
      // if (user) {
      //   user = JSON.parse(user);
      //   this.nickname = user.nickname || '';
      // }
      let that = this;
      API.tokenUser().then(function (result) {
        that.nickname = result.username
      }).catch(
        () => {
          localStorage.removeItem("access-token");
          that.$router.go("/login"); //用go刷新
        }
      );
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
