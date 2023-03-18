<template>
  <base-card>
    <template #filters>
      <songs-filters @filters-changed="setFilters" />
    </template>
    <template #select_box>
      <sort-by :options="sortOptions" @changeSort="sortSongs" />
    </template>
    <div class="song-cards">
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
      ></song-card>
    </div>
    <the-loader v-if="songsLoading" />
  </base-card>
</template>

<script setup>
import SongsFilters from "../components/ui/SongsFilters.vue";
import SongCard from "./../components/song/SongCard.vue";
import SortBy from "../components/ui/SortBy.vue";
import TheLoader from "../components/ui/TheLoader.vue";
import { ref, watch, computed } from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const store = useStore();
const route = useRoute();

const filters = ref([]);
const filteredSongs = ref([]);

function filterSongs() {
  return store.getters.filterSongs(filters.value, route.query);
}

watch(filters, () => {
  filteredSongs.value = store.getters.filterSongs(filters.value, route.query);
}, { immediate: true });

function setFilters(updatedFilters) {
  filters.value = updatedFilters;
}

function sortSongs(option) {
  store.commit("sortSongs", option);
}
    
const songsLoading = computed(() => {
  return store.getters.songsLoading;
})

const AllSongs = computed(() => {
  return filterSongs();
})

const sortOptions = computed(() => {
  return ["Last added", "Oldest", "Best learned", "Least learned", "A-Z", "Z-A"];
})
</script>

<style scoped>
.song-cards {
  padding-top: 0.625rem;
  max-width: 106.25rem;
  margin: auto;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, 11.25rem);
  justify-content: center;
}
</style>