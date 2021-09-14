<template>
  <the-header></the-header>
  <!-- <section v-if="!isLogged"></section> -->

  <!-- <section v-else> -->
  <the-sidebar></the-sidebar>
  <router-view :key="$route.path" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <!-- </section> -->
  <!-- staviti footer v if not app? -->
  <the-footer></the-footer>
</template>

<script>
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
  },
  data() {
    return {
      isLogged: false,
    };
  },
};
</script>

<style>
/* @import url("https://fonts.googleapis.com/css2?family=Arimo&display=swap"); */
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  margin: 0;
  padding: 0;

  box-sizing: border-box;
  /* font-family: "Arimo", sans-serif; */
  font-family: "Montserrat", Arial, sans-serif;
}

body {
  min-height: 100vh;
  /* display: flex; */
  /* flex-direction: column; */
}

* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
