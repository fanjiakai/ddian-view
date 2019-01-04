<template>
<div>1111</div>
</template>

<script>
    export default {
      name: "model",
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

</style>
