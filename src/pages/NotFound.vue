<template>
  <h2>Not found</h2>
</template>

<script>
export default {
  mounted(){
    this.$store.commit("removeSidebar")
  }
};
</script>

<style
scoped>
h2{
  text-align: center;
  margin-top: 50px;
}
</style>