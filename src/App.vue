<template>
  <!-- <parallax></parallax> -->
  <sidebar></sidebar>
  <router-view></router-view>
</template>

<script>
import Sidebar from "./components/layout/Sidebar.vue";
// import TheHeader from "./components/layout/TheHeader.vue";
// import Parallax from "./components/ui/Parallax.vue";
// import Filters from "./components/ui/Filters.vue";
export default {
  name: "App",
  components: {
    Sidebar,
    // TheHeader,
    // Filters,
    // Parallax
  },
  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Arimo", sans-serif;
}

</style>
