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
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
      ></song-card>
    </div>
    <!-- loader -->
    <div class="box" v-if="songsLoading">
      <div class="loader-02"></div>
    </div>
  </base-card>
</template>

<script>
import Filters from "../components/ui/Filters.vue";
import SongCard from "./../components/song/SongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import SortByOptimized from "../components/ui/SortByOptimized.vue";
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
    SortByOptimized,
  },
  data() {
    return {
      loading: true,
      filters: [],
    };
  },
  computed: {
    songsLoading() {
      return this.$store.getters.songsLoading;
    },
    AllSongs() {
      return this.filterSongs();
    },
    sortOptions() {
      return [
        "Last added",
        "Oldest",
        "A-Z",
        "Z-A",
        "Best learned",
        "Least learned",
      ];
    },
  },
  methods: {
    setLoader() {
      this.loading = false;
    },
    filterSongs() {
      // console.log("prije ulaza",this.$route.query);
      // if (this.$route.query.artist) {
      //   return this.$store.getters.filterSongs(
      //     this.filters,
      //     null,
      //     this.$route.query.artist
      //   );
      // }

      return this.$store.getters.filterSongs(this.filters, this.$route.query);
    },
    setFilters(filters) {
      this.filters = filters;
    },
    sortSongs(option) {
      this.$store.commit("sortSongs", option);
    },
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