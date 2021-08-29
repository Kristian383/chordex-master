<template>
  <base-card>
    <song-cardv-for v-for="song in allMySongs"
        :key="song.songId"
        :song="song"></song-cardv-for>
  </base-card>
</template>

<script>
import BaseCard from "./../components/ui/BaseCard.vue";
import SongCard from "./../components/song/SongCard.vue";
export default {
  components: {
    BaseCard,
    SongCard,
  },
  computed: {
      allMySongs() {
          return this.$store.getters.getAllMySongs; 
      }
  },
};
</script>

<style>
</style>