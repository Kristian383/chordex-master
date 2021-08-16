<template>
  <base-card>
    <template v-slot:filters>
      <filters
        v-for="filter in allFilters"
        :key="filter"
        :filter="filter"
        @change-filter="setFilters"
        :activeFilters="getActiveFilters"
      ></filters>
    </template>
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
import Filters from "../components/ui/Filters.vue";
import SongCard from "./../components/song/SongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
  },
  computed: {
    AllSongs() {
      //get favorite songs
      // console.log("allsongs",this.$store.getters.getAllSongs);
      return this.$store.getters.getAllSongs;
    },
    allFilters(){
      return this.$store.getters.getAllFilters;
    },
    getActiveFilters(){
      return this.activeFilters;
    },
    
  },
  data() {
    return {
      activeFilters:{
        all:true,
        favorites:false,
        acoustic:false,
        electric:false,
        easy:false,
        medium:false,
        hard:false,
      }
    };
  },
  methods:{
    setFilters(updatedFilters){
      this.activeFilters = updatedFilters;
    }
  }
};

</script>

<style scoped>
</style>