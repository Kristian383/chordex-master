<template>
  <header :class="{ 'scrolled-nav': scrolledNav }">
    <nav class="container">
      <span class="logo" v-if="!mobileNav">
        <router-link to="/home"
          ><img src="@/assets/guitar.svg" alt="Quote Logo"
        /></router-link>
      </span>
      <div class="title"><h2>Chordex</h2></div>
      <ul class="navigation">
        <li>
          <router-link class="link" active-class="active" to="/home"
            >Home</router-link
          >
        </li>

        <li>
          <router-link class="link" active-class="active" to="/songs"
            >App</router-link
          >
            <!-- ovdje ga preumsjerit na auth ako nije logged -->
        </li>
        <li>
          <router-link class="link" active-class="active" to="/about"
            >About</router-link
          >
        </li>
      </ul>

      <!-- :class="{active:isActive}"
:class="{active:isActive}"
:class="{active:isActive}" -->
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      mobile: null,
      scrolledNav: null,
      mobileNav: null,
      windowWidth: null,
    };
  },
  methods: {
    switchMobNav() {
      this.mobileNav = !this.mobileNav;
    },
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        this.mobileNav = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        this.scrolledNav = true;
        return;
      }
      this.scrolledNav = false;
    },
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  computed: {
    isActive() {
      // if(this.$route.path=="/home"){
      //   console.log("udje");
      //   return true
      // }
      // console.log(this.$route);
      return false;
    },
  },
};
</script>

<style scoped>
/* header nav {
  width: 100%;
  position: sticky;
  height: 80px;
  background-color: #f1f1f1;
} */

header {
  background-color: #f1f1f1;
  z-index: 45;
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
  color: #000;
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
  color: #d8323c;
}
header nav .link.active {
  border-color: #d8323c;
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
  background-color: rgb(218, 218, 218);
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
</style>