<template style="width: 100%;height: 100%;">
  <div class="login_div">
    <el-form ref="AccountFrom" :model="account" :rules="rules" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
      <h3 class="title">农村集体产权制度改革统计分析系统</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="account.username" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="pwd">
        <el-input type="password" v-model="account.pwd" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="loading">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import API from "../api/api_user";

export default {
  data() {
    return {
      loading: false,
      account: {
        username: "admin",
        pwd: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" }
          //{ validator: validaePass }
        ],
        pwd: [
          { required: true, message: "请输入密码", trigger: "blur" }
          //{ validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleLogin() {
      let that = this;
      /*console.log(1111111)
      this.$router.push({ path: "/home" });
      console.log(22222)*/
      that.$router.push({name: "home"});
      /*this.$refs.AccountFrom.validate(valid => {
        if (valid) {
          this.loading = true;
          let loginParams = {
            username: this.account.username,
            pwd: this.account.pwd
          };
          that.$router.push({name: "/"});
          /!*API.login(loginParams)
            .then(
              function(result) {
                console.log(result)
                that.loading = false;
                if (result && result.code === 0) {
                  // localStorage.setItem(
                  //   "access-user",
                  //   JSON.stringify(result.user)
                  // );
                  localStorage.setItem("access-token", result.token);

                  localStorage.setItem("menus", JSON.stringify(result.router));
                  localStorage.setItem("perms",JSON.stringify(result.perms));
                  localStorage.setItem("area",JSON.stringify(result.areaTree));
                  // that.$store.commit("SET_ROUTERS", result.router);
                  // that.$router.addRoutes(that.$store.getters.addRouters);
                  //that.$router.addRoutes(result.router)
                  // that.$router.options.routes = that.$store.getters.routers;
                  that.$router.push({ path: "/" });
                } else {
                  that.$message.error({
                    showClose: true,
                    message: result.msg || "登录失败",
                    duration: 2000
                  });
                }
              },
              function(err) {
                that.loading = false;
                that.$message.error({
                  showClose: true,
                  message: err.toString(),
                  duration: 2000
                });
              }
            )
            .catch(function(error) {
              that.loading = false;
              console.log(error);
              that.$message.error({
                showClose: true,
                message: "请求出现异常",
                duration: 2000
              });
            });*!/
        }
      });*/
    }
  }
};
</script>
<style>

</style>
<style lang="scss" scoped>
  .login_div {
    width: 100%;
    height: 100%;
    background: #2d3c56;
    -moz-box-sizing: border-box;  /*Firefox3.5+*/-webkit-box-sizing: border-box; /*Safari3.2+*/-o-box-sizing: border-box; /*Opera9.6*/-ms-box-sizing: border-box; /*IE8*/box-sizing: border-box; /*W3C标准(IE9+，Safari5.1+,Chrome10.0+,Opera10.6+都符合box-sizing的w3c标准语法)*/
    padding-top: 10%;
  }
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0 auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  background: -ms-linear-gradient(top, #ace, #00c1de); /* IE 10 */
  background: -moz-linear-gradient(top, #ace, #00c1de); /*火狐*/
  background: -webkit-gradient(
    linear,
    0% 0%,
    0% 100%,
    from(#ace),
    to(#00c1de)
  ); /*谷歌*/
  background: -webkit-linear-gradient(
    top,
    #ace,
    #00c1de
  ); /*Safari5.1 Chrome 10+*/
  background: -o-linear-gradient(top, #ace, #00c1de); /*Opera 11.10+*/

  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
</style>
