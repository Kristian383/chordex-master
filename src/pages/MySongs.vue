<template>
  <base-card>
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
export default {
  components: {
    BaseCard,
    SongCard,
    SkeletonSongCard,
  },
  data() {
    return {
      isLoaded: true,
    };
  },
  computed: {
    allMySongs() {
      //   console.log(this.$store.getters.getAllMySongs);
      return this.$store.getters.getAllMySongs;
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