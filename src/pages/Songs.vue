<template>
  <base-card>
    <template v-slot:filters>
      <filters @filters-changed="setFilters"></filters>
    </template>
    <template v-slot:select_box>
      <sort-by @changeSort="sortSongs" :options="sortOptions"></sort-by>
    </template>
    <!-- songg list -->
    <div class="song-cards">
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
      ></song-card>
    </div>
    <!-- loader -->
    <the-loader v-if="songsLoading"></the-loader>
  </base-card>
</template>

<script>
import Filters from "../components/ui/Filters.vue";
import SongCard from "./../components/song/SongCard.vue";
// import BaseCard from "../components/ui/BaseCard.vue";
import SortBy from "../components/ui/SortBy.vue";
import TheLoader from "../components/ui/TheLoader.vue";
export default {
  components: {
    Filters,
    SongCard,
    // BaseCard,
    SortBy,
    TheLoader,
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
        "Best learned",
        "Least learned",
        // "Keys",
        "A-Z",
        "Z-A",
      ];
    },
  },
  methods: {
    setLoader() {
      this.loading = false;
    },
    filterSongs() {
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