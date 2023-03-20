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
        :container-el="getContainer"
      />
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
    
const getContainer = computed(() => document.getElementById('app'));

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

<style lang="scss" scoped>
.song-cards {
  padding-top: 0.625rem;
  max-width: 106.25rem;
  margin: auto;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, 11.25rem);
  justify-content: center;

  // song card dropdown
  // ::v-deep .v-popper__popper {
  //   z-index: 37;
    
  //   .v-popper__inner {
  //     border: none;
  //     box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  //   }

  //   .dropdown-popup-item {
  //       padding: 0.625rem;
  //       cursor: pointer;
  //       color: var(--font_black);
  //       font-size: 0.875rem;
  //       display: flex;
  //       align-items: center;
  //       gap: 1rem;

  //       &:hover {
  //         background-color: var(--f1_gray);
  //       }
  //   }
  //   .dropdown-popup-item.delete {
  //     background-color: #fbe9e9;
  //     color: var(--burgundy);
  //     color: rgb(224, 68, 68);
  //     border-top: 2px solid #fecaca;
      
  //     &:hover {
  //       background-color: #fecaca;
  //     } 
  //   }
  // }
}
</style>