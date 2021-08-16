<template>
  <base-card>
    <filters></filters>
    <template v-slot:song_cards>
      <song-card v-for="song in AllSongs" :key="song.id" :song="song"></song-card>
    </template>
  </base-card>
</template>

<script>
import Filters from "../components/ui/Filters.vue"
import SongCard from "./../components/song/SongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
  },
  computed: {
   
    AllSongs(){ //get favorite songs
      // console.log("allsongs",this.$store.getters.getAllSongs);
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