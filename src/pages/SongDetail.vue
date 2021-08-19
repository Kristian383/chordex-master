<template>
  <base-card>
    hi
  </base-card>
  <!-- <div class="add_song">
    <div class="top_icons">
      Hi
    </div>
  </div> -->

</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  name: "SongDetail",
  components:{
    BaseCard
  },
  data() {
    return {
      id: null,
    };
  },
  mounted() {
    this.id = this.$route.params.songId;

    const songData = this.$store.getters.getAllSongs.find(
      (song) => song.id == this.id
    );
    if (songData) {
      this.songData = songData;
    }
  },
};
</script>

<style scoped>
</style>