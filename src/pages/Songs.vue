<template>
  <base-card>
    <filters></filters>
    <template v-slot:song_cards>
      <song-card></song-card>
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
  },
};
</script>

<style scoped>
</style>