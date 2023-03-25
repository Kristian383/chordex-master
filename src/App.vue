<template>
  <!-- <the-beta-banner v-if="" /> -->
  <the-header></the-header>
  <the-sidebar></the-sidebar>

  <router-view v-slot="{ Component }">
    <keep-alive :max="3" include="Song Keys">
      <component :is="Component" :key="$route.fullPath" />
    </keep-alive>
  </router-view>

  <the-footer></the-footer>
</template>

<script>
// import TheBetaBanner from "./components/layout/TheBetaBanner.vue";
import TheSidebar from "./components/layout/TheSidebar.vue";
import TheHeader from "./components/layout/TheHeader.vue";
import TheFooter from "./components/layout/TheFooter.vue";
export default {
  name: "App",
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    // TheBetaBanner,
  },
  computed: {
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
    isLogged() {
      return this.$store.getters.token;
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.replace("/home");
      }
    },
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
};
</script>

<style lang="scss">
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
  --chips_gray_hover: #e4e4e7;
  --light_gray: #f5f5f5;
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
  --light_blue: #1f75fe;
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
    margin-left: 0;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0;
  }
}

@keyframes shake {
  0% {
    margin-left: 0;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0;
  }
}

/* chips */
.form-input-chk-field,
.form-input-radio-field {
  display: none;
}

.form-input-chk-field + label,
.form-input-radio-field + label {
  transition: all 500ms ease;
  cursor: pointer;
  border-radius: 50px;
  background-color: #fff;
  padding: 10px 16px;
  margin-right: 7px;
  border: none;
  display: inline-block;
  user-select: none;
  text-transform: capitalize;
  word-wrap: none;
  white-space: nowrap;
  margin-top: 18px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.form-input-chk-field:checked + label,
.form-input-radio-field:checked + label {
  transition: all 500ms ease;
  background-color: var(--dark_gray_font);
  color: #fff;
}

/* song card popup dropdown */
.v-popper__popper.v-popper--theme-dropdown {
    z-index: 37;
    
    .v-popper__inner {
      border: none;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }

    .dropdown-popup-item {
        padding: 0.625rem;
        cursor: pointer;
        color: var(--font_black);
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.875rem;

        &:hover {
          background-color: var(--f1_gray);
        }

        .popup-item-icon {
          width: 1rem;
        }
    }
    .dropdown-popup-item.delete {
      background-color: #fbe9e9;
      color: var(--burgundy);
      color: rgb(224, 68, 68);
      border-top: 2px solid #fecaca;
      
      &:hover {
        background-color: #fecaca;
      } 
    }
  }
</style>
