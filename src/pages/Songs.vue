<template>
  <base-card>
    <template v-slot:filters>
      <filters @filters-changed="setFilters"></filters>
    </template>
    <template v-slot:select_box>
      <sort-by-optimized
        @changeSort="sortSongs"
        :options="sortOptions"
      ></sort-by-optimized>
    </template>
    <!-- saong list -->
    <div class="song-cards">
      <!-- <template v-if="isLoaded"> -->
      <p v-if="!AllSongs.length">Currently no songs.</p>
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
      ></song-card>
      <!-- </template> -->
      <!-- <skeleton-song-card
        v-for="skeleton in 2"
        :key="skeleton"
        v-else
      ></skeleton-song-card> -->
    </div>
    <!-- loader -->
    <div class="box" v-if="!isLoaded">
      <div class="loader-02"></div>
    </div>
  </base-card>
</template>

<script>
import Filters from "../components/ui/Filters.vue";
import SongCard from "./../components/song/SongCard.vue";
// import SkeletonSongCard from "./../components/song/SkeletonSongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import SortByOptimized from "../components/ui/SortByOptimized.vue";
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
    // SkeletonSongCard,
    SortByOptimized,
  },
  data() {
    return {
      isLoaded: true,
      filters: [],
      // itemsAreLoading: false,
      el: null,
      observer: null,
    };
  },
  computed: {
    AllSongs() {
      return this.filterSongs();
    },
    sortOptions() {
      return [
        "Last viewed",
        "Oldest",
        "A-Z",
        "Z-A",
        "Best learned",
        "Least learned",
      ];
    },
  },
  methods: {
    filterSongs() {
      if (this.$route.query.artist) {
        return this.$store.getters.filterSongs(
          this.filters,
          null,
          this.$route.query.artist
        );
      }

      return this.$store.getters.filterSongs(
        this.filters,
        this.$route.query.isMySong
      );
    },
    setFilters(filters) {
      this.filters = filters;
    },
    sortSongs(option) {
      this.$store.commit("sortSongs", option);
    },
    handleIntersect(entries) {
      if (entries[0].isIntersecting) {
        // this.itemsAreLoading = true;
        // this.$store.dispatch("loadMoreSongs").then(()=>{
        //   this.itemsAreLoading = false;
        // this.isLoaded = true;
        // });
        // this.$store.getters.lazyLoadSongs("songs")

        this.filterSongs();
        if (this.$route.params.name) {
          this.$store.state.mySongsLoaded += 2;
        } else {
          this.$store.state.songsLoaded += 2;
        }
        this.isLoaded = true;
      }
    },
  },
  mounted() {
    let options = {
      root: null,
      rootMargin: " 0px",
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.el = document.querySelector(".footer");
    this.observer.observe(this.el);

    // this.$store.dispatch("loadMoreSongs").then(() => {

    //   this.isLoaded = true;
    // });
  },
  beforeUnmount() {
    this.observer.unobserve(this.el);
  },
  created() {
    //this.$store.dispatch("loadAllSongs");
  },
};
</script>

<style scoped>
.box {
  display: inline-block;
  width: 100%;
  height: 100px;
  text-align: center;
  font-size: 30px;
  padding: 1em;
  position: relative;
  transition: 0.3s color, 0.3s border, 0.3s transform, 0.3s opacity;
}
[class*="loader-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}

.loader-02 {
  border: 0.2em solid transparent;
  border-left-color: currentcolor;
  border-right-color: currentcolor;
  border-radius: 50%;
  -webkit-animation: 1s loader-02 linear infinite;
  animation: 1s loader-02 linear infinite;
}

@-webkit-keyframes loader-02 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-02 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*  */
.song-cards {
 
  padding-top: 10px;
  max-width: 1700px;
  margin: auto;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
}

</style>