<template>
<!-- beta banner -->
<the-beta-banner v-if="!isLogged"></the-beta-banner>
<!--  -->
  <the-header></the-header>
  <the-sidebar></the-sidebar>
  <router-view :key="$route.path" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <the-footer></the-footer>
</template>

<script>
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheBetaBanner from "./components/layout/TheBetaBanner.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,TheBetaBanner
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isLogged(){
      return this.$store.getters.token;

    }
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
  --chips_gray: #e7e7e7;
  --light_gray: #F5F5F5;
  --mid_gray: #888888;
  --dark_gray_font: #424242;
  --form_gray: #eaebea;
  --white: #fff;
  --burgundy: #c22a2a;
  --orange: #ff4500;
  --green: #69b34c;
  --save_button_green: #6fc982;

  --levi_blue: #1b233a;
  --levi_red: #b0253c;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.error-msg {
  border: var(--burgundy) solid 2px !important;
  -webkit-animation: shake 0.2s ease-in-out 0s 2;
  animation: shake 0.2s ease-in-out 0s 2;
}

@-webkit-keyframes shake {
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
}

@keyframes shake {
  0% {
    margin-left: 0rem;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0rem;
  }
}
</style>
