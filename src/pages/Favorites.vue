<template>
  <base-card>
    <template v-slot:select_box>
      <sort-by @change-sort="sortSongs"></sort-by>
    </template>
    <div class="song-cards">
      <song-card
        v-for="song in FavoriteSongs"
        :key="song.id"
        :song="song"
      ></song-card>
    </div>
  </base-card>
</template>

<script>
// import SongCard from "./../components/song/SongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import SortBy from "../components/ui/SortBy.vue";
import SongCard from "./../components/song/SongCard.vue";
export default {
  components: {
    // SongCard,
    BaseCard,
    SortBy,
    SongCard,
  },
  computed: {
    FavoriteSongs() {
      // console.log("allsongs",this.$store.getters.getAllSongs);
      return this.$store.getters.getFavoriteSongs;
    },
  },
  methods: {
    sortSongs(option) {
      this.$store.commit("sortSongs", option);
    },
  },
};
</script>

<style scoped>
.song-cards {
  padding-top: 10px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
}
</style>