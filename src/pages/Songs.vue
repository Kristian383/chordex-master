<template>
  <base-card>
    <template #filters>
      <songs-filters @filters-changed="setFilters" />
    </template>
    <template #sort_select_box>
      <sort-by :options="sortOptions" @changeSort="sortSongs" />
    </template>
    <div class="song-cards">
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
        :container-el="getContainer"
        @open-playlist-modal="openPlaylistModal"
      />
    </div>
    <the-loader v-if="songsLoading" />
    <add-to-playlist-modal
      v-if="openModal"
      :playlists="getPlaylists"
      :song-id="songId"
      @close-modal="closePlaylistModal"
    />
  </base-card>
</template>

<script setup>
import SongsFilters from "../components/ui/SongsFilters.vue";
import SongCard from "./../components/song/SongCard.vue";
import SortBy from "../components/ui/SortBy.vue";
import { ref, watch, computed, defineAsyncComponent } from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const AddToPlaylistModal = defineAsyncComponent(() => import('../components/playlist/AddToPlaylistModal.vue'));


const store = useStore();
const route = useRoute();

const filters = ref([]);
const songId = ref(null);
const filteredSongs = ref([]);
const openModal = ref(false);

watch(filters, () => {
  filteredSongs.value = store.getters.filterSongs(filters.value, route.query);
}, { immediate: true });

function setFilters(updatedFilters) {
  filters.value = updatedFilters;
}

function sortSongs(option) {
  store.commit("sortSongs", option);
}

function openPlaylistModal(id) {
  songId.value = id;
  openModal.value = true;
}

function closePlaylistModal() {
  openModal.value = false;
}
    
const getContainer = computed(() => document.getElementById('app'));
const getPlaylists = computed(() => store.getters.getPlaylists);

const songsLoading = computed(() => {
  return store.getters.songsLoading;
});

const AllSongs = computed(() => {
  return store.getters.filterSongs(filters.value, route.query);
});

const sortOptions = computed(() => {
  return ["Last added", "Oldest", "Best learned", "Least learned", "A-Z", "Z-A"];
});
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
}
</style>