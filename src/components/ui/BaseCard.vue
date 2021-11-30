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
        <h2 class="title">
          <span
            class="arrow-left"
            @click="goToSong('prev')"
            v-if="showArrows == 'both' || showArrows == 'prev'"
            ><font-awesome-icon icon="angle-left"></font-awesome-icon
          ></span>
          <span>{{ Title }}</span>
          <span
            class="arrow-right"
            @click="goToSong('next')"
            v-if="showArrows == 'both' || showArrows == 'next'"
            ><font-awesome-icon icon="angle-right"></font-awesome-icon
          ></span>
        </h2>
        <slot name="select_box"></slot>
      </div>
      <slot></slot>
      <div
        class="scroll-top"
        aria-hidden="true"
        @click="scrollUp"
        :class="{ show: showBackToTop }"
      >
        <div class="arrow">
          <font-awesome-icon icon="arrow-up"></font-awesome-icon>
        </div>
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
      showBackToTop: false,
      showLeft: false,
      showRight: false,
    };
  },
  computed: {
    sidebarIsActive() {
      return this.$store.getters.sidebarIsActive;
    },
    Title() {
      const route = this.$route.name;
      let artist = this.$route.query.artist;
      if (route == "SongDetail") {
        return this.$store.getters.getSongDetailTitle;
      } else if (artist) {
        return "Songs by: " + artist;
      } else if (route == "Songs") {
        return "All Songs";
      } else if (route == "Artists") {
        return "All Artists";
      }
      return route;
    },
    showArrows() {
      if (this.$route.name == "SongDetail") {
        let index = this.$store.getters.indexOfCurrentSong(
          this.$route.params.songId
        );
        if (index == 0) {
          return "next";
        }
        if (index == this.$store.getters.getAllSongsLen - 1) {
          return "prev";
        } else {
          return "both";
        }
      }
      return false;
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
    goToSong(direction) {
      let currentSongIndex = this.$store.getters.indexOfCurrentSong(
        this.$route.params.songId
      );
      let index;
      if (direction == "next") {
        index = currentSongIndex + 1;
      } else {
        index = currentSongIndex - 1;
      }
      let songId = this.$store.getters.getAllSongs[index].songId;
      this.$router.push({ path: `/songs/${songId}` });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.showButtonUp);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.showButtonUp);
  },
};
</script>

<style scoped>
.home-section {
  position: relative;
  background: var(--white);
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
  flex-direction: column;

  gap: 16px;

  background: var(--white);
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
    order: 0;
  }
}
.filter_categories::-webkit-scrollbar {
  display: none;
}

/* Content under header */
.home-section .home-content {
  position: relative;
  padding: 140px 15px 15px 15px;
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
  display: flex;
  justify-content: space-around;
  gap: 14px;
  margin-bottom: 8px;
  color: var(--font_black);
}
.sort-section-title h2 {
  flex-shrink: 0; /*  this doesnt remove arrows down */
  padding-top: 8px;
}

/* arrows for song */
.arrow-right,
.arrow-left {
  display: inline-block;
  width: 50px;
  text-align: center;
  color: var(--burgundy);
  transition: all ease-in 0.3s;
}
.arrow-right:hover,
.arrow-left:hover {
  cursor: pointer;
  color: #222;
}

/* list of all songs - song-cards  */
.home-section .song-cards {
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