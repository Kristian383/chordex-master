<template>
  <section
    class="home-section"
    :class="{ expand_home_section: sidebarIsActive && isDesktop }"
  >
    <nav>
      <the-search></the-search>
      <div class="filter_categories">
        <slot name="filters"></slot>
      </div>
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
    <scroll-up  :class="{ show: showBackToTop }"></scroll-up>
    </div>
  </section>
</template>

<script>
// import { onClickOutside } from "@vueuse/core";
import TheSearch from "./../ui/TheSearch.vue";
import ScrollUp from "./ScrollUp.vue"
export default {
  components: {
    TheSearch,ScrollUp
  },
  data() {
    return {
      title: "",
      showBackToTop: false,
      showLeft: false,
      showRight: false,
      query: null,
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
        let index = this.$store.getters.indexOfCurrentSong({
          id: this.$route.params.songId,
          query: this.query,
        });

        let lenAll;
        if (this.query) {
          lenAll = this.$store.getters.getAllMySongsLen;
        } else {
          lenAll = this.$store.getters.getAllSongsLen;
        }
        if (index == 0 && lenAll == 1) {
          return false;
        } else if (index == 0) {
          return "next";
        }
        if (index == lenAll - 1) {
          return "prev";
        } else {
          return "both";
        }
      }
      return false;
    },
    isDesktop() {
      return !this.$store.getters.isMobile;
    },
  },
  methods: {
    showButtonUp() {
      if (window.scrollY > 800) {
        this.showBackToTop = true;
      } else if (window.scrollY < 800) {
        this.showBackToTop = false;
      }
    },
    goToSong(direction) {
      let currentSongIndex = this.$store.getters.indexOfCurrentSong({
        id: this.$route.params.songId,
        query: this.query,
      });
      let index;
      if (direction == "next") {
        index = currentSongIndex + 1;
      } else {
        index = currentSongIndex - 1;
      }
      let songId;
      if (this.query) {
        songId = this.$store.getters.getAllMySongs[index].songId;
      } else {
        songId = this.$store.getters.getAllSongs[index].songId;
      }

      let pushRoute = this.query
        ? `/songs/${songId}?isMySong=True`
        : `/songs/${songId}`;

      this.$router.push(pushRoute);
    },
  },

  mounted() {
    window.addEventListener("scroll", this.showButtonUp);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.showButtonUp);
  },
  beforeMount() {
    this.query = this.$route.query.isMySong;
  },
};
</script>

<style scoped>
.home-section {
  position: relative;
  background: var(--white);
  min-height: 100vh;
  transition: all 0.5s ease;
  /* width: calc(100% - 240px);
  left: 240px; */
}

.home-section nav {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: var(--white);
  align-items: center;
  position: fixed;
  /* width: calc(100% - 240px);
  left: 240px; */
  width: 100%;
  z-index: 40;
  padding: 10px 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
}
.expand_home_section {
  left: 240px;
  width: calc(100% - 240px);

  /* width: 100%;
  left: 0; */
}
.expand_home_section nav {
  left: 240px;
  width: calc(100% - 240px);

  /* width: 100%;
  left: 0; */
}

@media (min-width: 1400px) {
  .home-section nav {
    flex-direction: row;
    height: 80px;
    justify-content: center;
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
  flex-wrap: wrap;
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
</style>