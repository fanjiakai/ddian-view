<template>
  <el-container class="page_main">
    <el-header>导航栏</el-header>
    <el-main>
      <el-container>
        <el-header>搜索</el-header>
        <el-main>搜索结果/推荐</el-main>
      </el-container>
    </el-main>
    <MyFooter></MyFooter>
  </el-container>
</template>

<script>
    import MyFooter from "../element/MyFooter";
    export default {
      name: "model",
      components: {MyFooter},
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
</style>
