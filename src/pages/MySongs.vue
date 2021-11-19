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
    <!-- song list -->
    <div class="song-cards">
      <template v-if="isLoaded">
        <song-card
          v-for="song in allMySongs"
          :key="song.songId"
          :song="song"
        ></song-card>
      </template>
      <skeleton-song-card
        v-for="skeleton in 6"
        :key="skeleton"
        v-else
      ></skeleton-song-card>
      <!-- staviti for  skeleton in count  -->
    </div>
  </base-card>
</template>

<script>
import BaseCard from "./../components/ui/BaseCard.vue";
import SongCard from "./../components/song/SongCard.vue";
import SkeletonSongCard from "./../components/song/SkeletonSongCard.vue";
import SortByOptimized from "../components/ui/SortByOptimized.vue";
import Filters from "../components/ui/Filters.vue";
export default {
  components: {
    BaseCard,
    SongCard,
    SkeletonSongCard,
    SortByOptimized,
    Filters,
  },
  data() {
    return {
      isLoaded: true,
      filters: [],
    };
  },
  computed: {
    allMySongs() {
      //   console.log(this.$store.getters.getAllMySongs);
      // return this.$store.getters.getAllMySongs;
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
      return this.$store.getters.filterSongs(this.filters);
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
.song-cards {
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px; */
  padding-top: 10px;
  max-width: 1700px;
  margin: auto;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
}
</style>