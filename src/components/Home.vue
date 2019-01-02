<template>
  <el-container>
    <el-header>搜索栏</el-header>
    <el-main>
      <el-container>
        <el-header>导航栏</el-header>
        <el-main>主体</el-main>
      </el-container>
    </el-main>
    <el-footer>页脚</el-footer>
  </el-container>
</template>

<script>
  import {bus} from "../bus.js";
  export default {
    name: "home",
    created() {
      console.log(1111)
    },
    data() {
      return {
      };
    },
    methods: {
    },
    mounted() {
    }
  };
</script>
<style>
</style>
