<template>
  <base-card>
    <template v-slot:song_cards>
      <song-card
        v-for="song in AllSongs"
        :key="song.id"
        :song="song"
      ></song-card>
    </template>
  </base-card>
</template>

<script>
import SongCard from "./../components/song/SongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    SongCard,
    BaseCard,
  },
  computed: {
    
    AllSongs() {
      // console.log("allsongs",this.$store.getters.getAllSongs);
      return this.$store.getters.getAllSongs;
    },
  },
};
</script>

<style scoped>
</style>