<template>
  <base-card>
    <filters></filters>
    <template v-slot:song_cards>
      <song-card v-for="song in AllSongs" :key="song.id" :song="song"></song-card>
    </template>
  </base-card>
</template>

<script>
import SongCard from "./../components/song/SongCard.vue";
import Filters from "../components/ui/Filters.vue"
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    SongCard,
    Filters,
    BaseCard,
  },
  computed: {
    sidebarIsActive() {
      // console.log("otvoreno", this.$store.getters.sidebarIsActive);
      return this.$store.getters.sidebarIsActive;
    },
    AllSongs(){
      console.log("allsongs",this.$store.getters.getAllSongs);
      return this.$store.getters.getAllSongs;
    }
  },
  data(){
    return{

    }
  }
};
</script>

<style scoped>
</style>