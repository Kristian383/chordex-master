<template>
  <sidebar></sidebar>

  <!-- <router-view></router-view> -->

  <router-view :key="$route.path" v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"  />
  </keep-alive>
</router-view>
</template>

<script>
import Sidebar from "./components/layout/Sidebar.vue";
export default {
  name: "App",
  components: {
    Sidebar,
  },
  
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  /* font-family: "Arimo", sans-serif; */
  font-family: Arial, sans-serif ;
}

/* route tranisition */

/* 
.route-enter-from{
  opacity: 0;
}
.route-enter-active{
  transition: opacity 0.3s ease-out;
}

.route-leave-to{
  opacity: 0;
}
.route-leave-active{
  transition: opacity .3s ease-in;
}
.route-enter-to,
.route-leave-from{
  opacity: 1;
} */

</style>
