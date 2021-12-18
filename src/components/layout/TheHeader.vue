<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav class="container">
      <span class="logo" v-if="!hideLogo">
        <router-link to="/home"
          ><img src="@/assets/guitar.svg" alt="Quote Logo"
        /></router-link>
      </span>
      <div class="title"><h2>ChordEx</h2> </div>
      <ul class="navigation">
        <li>
          <router-link class="link" active-class="active" to="/home"
            >Home</router-link
          >
        </li>

        <li>
          <router-link
            class="link"
            :class="{ not_logged: isLogged }"
            active-class="active"
            to="/songs"
            >App</router-link
          >
        </li>
        <li>
          <router-link class="link" active-class="active" to="/about"
            >About</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      //  mobile: null,
      scrolledNav: null,
      hideLogo: null,
      windowWidth: null,
    };
  },
  computed: {
    isLogged() {
      return !this.$store.getters.token;
    },
  },
  methods: {
    // switchMobNav() {
    //   this.hideLogo = !this.hideLogo;
    // },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 950) {
        //  this.mobile = true;
        this.$store.commit("setMobile",true)
        this.hideLogo = true;
        return;
      }
      //  this.mobile = false;
      this.$store.commit("setMobile",false)
      this.hideLogo = false;
      return;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= 50) {
        this.scrolledNav = true;
        return;
      }
      this.scrolledNav = false;
    },
  },
  created() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.checkScreen);
      this.checkScreen();
    });
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("scroll", this.updateScroll);
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreen);
  },
};
</script>

<style scoped>

/*  */
header {
  /* background-color: var(--f1_gray); */
  background-color: var(--burgundy);
  z-index: 70;
  width: 100%;
  transition: 0.5s ease all;
  position: sticky;
  top: 0;
  /* padding: 0 1rem; */
}
header nav {
  display: flex;
  /* flex-direction: row; */
  flex-direction: column;
  padding: 12px 0;
  transition: 0.5s ease all;
  margin: 0 auto;
  /* width: 90%; */
  width: 100%;
  position: relative;
}

header .navigation {
  display: flex;
  align-items: center;
  flex: 1;
  /* justify-content: flex-end; */
  justify-content: center;
}
@media (min-width: 1140px) {
  header nav {
    max-width: 1140px;
  }
}

@media (min-width: 640px) {
  header nav {
    flex-direction: row;
    width: 90%;
  }

  .title {
    padding-left: 25px;
  }
  header .navigation {
    justify-content: flex-end;
  }
}

.title {
  align-self: center;
}

header nav ul,
header nav .link {
  color: #fff;
  font-weight: 600;
  list-style: none;
  text-decoration: none;
}
header nav li {
  text-transform: uppercase;
  padding: 16px;
  margin-left: 16px;
  user-select: none;
}
header nav .link {
  font-size: 16px;
  transition: 0.5s ease all;
  padding-bottom: 4px;
  border-bottom: 4px solid transparent;
}
header nav .link:hover {
  color: var(--teals);
}
header nav .link.not_logged {
  color: var(--mid_gray);
  pointer-events: none;
}
header nav .link.active {
  border-color: #fff;
}
header nav .logo {
  display: flex;
  align-items: center;
}
header nav .logo img {
  width: 50px;
  transition: 0.5s ease all;
}

.scrolled-nav {
  background-color: var(--levi_red);
  background-color: #af2121;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.scrolled-nav nav {
  padding: 8px 0;
}
.scrolled-nav nav .logo img {
  width: 40px;
}
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: 1s ease all;
}
.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: translateX(-250px);
}
.mobile-nav-enter-to {
  transform: translateX(0);
}
/*  */

</style>