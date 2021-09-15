<template>
  <section
    class="home-section"
    :class="{ expand_home_section: !sidebarIsActive }"
  >
    <nav>
      <div class="filter_categories">
        <slot name="filters"></slot>
      </div>
      <the-search></the-search>
    </nav>
    <div class="home-content">
      <div class="sort-section-title">
        <h2 class="title">{{ Title }}</h2>
        <slot name="select_box"></slot>
      </div>
      <slot></slot>
      <div class="scroll-top" aria-hidden="true" @click="scrollUp" :class="{show:showBackToTop}">
        <div class="arrow">
          <font-awesome-icon icon="arrow-up"></font-awesome-icon>
        </div>
        <!-- <div class="text">Back to top</div> -->
      </div>
    </div>
  </section>
</template>

<script>
// import { onClickOutside } from "@vueuse/core";
import TheSearch from "./../ui/TheSearch.vue";

export default {
  components: {
    TheSearch,
  },
  data() {
    return {
      title: "",
      showBackToTop:false
    };
  },
  computed: {
    sidebarIsActive() {
      return this.$store.getters.sidebarIsActive;
    },
    Title() {
      const route = this.$route.name;
      // console.log(this.$route);
      if (route == "SongDetail") {
        return this.$store.getters.getSongDetailTitle;
      } else if (route == "Artists Songs") {
        return "Songs by: " + this.$route.params.name;
      }
      return route;
    },
  },
  methods: {
    scrollUp() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    showButtonUp() {
      if (window.scrollY > 800) {
        this.showBackToTop = true;
      } else if (window.scrollY < 800) {
        this.showBackToTop = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.showButtonUp);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.resizeHandler);
  },
};
</script>

<style scoped>
.home-section {
  position: relative;
  /* background: #eaebea; */
  background: var(--white);

  /* background: #161B22; */

  min-height: 100vh;
  transition: all 0.5s ease;
  width: calc(100% - 240px);
  left: 240px;
}

.expand_home_section {
  /* width: calc(100% - 80px);
  left: 80px; */
  width: 100%;
  left: 0;
}

.home-section nav {
  display: flex;
  justify-content: space-between;
  /* height: 100px; */
  flex-direction: column;

  gap: 16px;

  background: var(--white);
  /* background: #161B22; */
  align-items: center;
  position: fixed;
  width: calc(100% - 240px);
  left: 240px;
  z-index: 37;
  padding: 10px 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}
.expand_home_section nav {
  /* width: calc(100% - 80px);
  left: 80px; */
  width: 100%;
  left: 0;
}

@media (min-width: 1400px) {
  .home-section nav {
    /* padding-left: 80px; */
    flex-direction: row;
    height: 80px;
  }
}

.filter_categories {
  min-width: 250px;
  max-width: 800px;
  display: flex;
  width: 100%;
  order: 2;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 20px;
  gap: 4px;
}
@media (min-width: 1400px) {
  .filter_categories {
    /* padding-left: 80px; */
    order: 0;
  }
}
.filter_categories::-webkit-scrollbar {
  display: none;
}

/* Content under header */
.home-section .home-content {
  position: relative;
  /* padding-top: 124px; */
  padding: 140px 15px 15px 15px;
  /* max-width: 1400px; */
  margin: 0 auto;
  background-color: var(--white);
  height: 100%;
  max-width: 1700px;
}
@media (min-width: 1400px) {
  .home-section .home-content {
    padding: 110px 15px 15px 15px;
  }
}

/*  */
.sort-section-title {
  /* position: absolute;
  top: 104px;
  transform: translateX(-50%);

  left: 50%; */
  display: flex;
  justify-content: space-around;
  gap: 14px;
  /* align-items: center; */
  margin-bottom: 8px;
  
  color: var(--font_black);
}
.sort-section-title h2 {
  padding-top: 8px;
}
/* list of all songs - song-cards  */
.home-section .song-cards {
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px; */
  padding-top: 20px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
}

/* scroll to top */
.scroll-top {
  display: inline-block;
  background: #222;
  /* width: 50px;
  height: 50px; */
  height: 0px;
  width: 0px;
  position: fixed;

  bottom: 30px;
  right: 30px;
  text-align: center;
  border-radius: 50px;
  -webkit-border-radius: 50px;
  -moz-border-radius: 50px;
  opacity: 0;
  visibility: hidden;
  position: fixed;
  cursor: pointer;
  color: var(--white);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  right: 50px;
  bottom: 75px;
  z-index: 1000;
  transition: all 0.3s ease-in-out;
}
.scroll-top:hover {
  transform: scale(1.1);
}
.scroll-top > div.arrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  opacity: 1;
  font-size: 24px;
}
.scroll-top.show {
  opacity: 1;
  visibility: visible;
  width: 50px;
  height: 50px;
}
</style>