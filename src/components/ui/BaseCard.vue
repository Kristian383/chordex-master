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
  data() {
    return {
      title: "",
    };
  },
};
</script>

<style scoped>
.home-section {
  position: relative;
  /* background: #eaebea; */
  background: #fff;

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
  flex-direction:column ;

  gap: 16px;

  background: #fff;
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
  background-color: #fff;
  height: 100%;
  max-width: 1700px;
}
@media (min-width:1400px) {
  
  .home-section .home-content{
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
  color: RGB(16, 17, 20);
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
</style>