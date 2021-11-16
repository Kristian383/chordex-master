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
  created() {
    this.$store.dispatch("tryLogin");
    this.$store.dispatch("loadMusicKeys")
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/home");
      }
    },
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

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
html {
  scroll-behavior: smooth;
}

:root {
  /* --dark_blue: #11101d; */
  --dark_blue_sidebar: #0d1117;
  --teals: #11101d;
  --f1_gray: #f1f1f1;
  --dark_gray_chips: #242424;
  --font_black: #101114;
  --mid_gray: #888888;
  --dark_gray_font: #424242;
  --form_gray: #eaebea;
  --white: #fff;
  --burgundy: #c22a2a;
  --orange: #ff4500;
  --green: #69b34c;
  --save_button_green: #6fc982;
  --chips_gray: #e7e7e7;

  --levi_blue: #1b233a;
  --levi_red: #b0253c;
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
