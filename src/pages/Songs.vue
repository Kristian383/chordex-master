<template>
  <base-card>
    <template #filters>
      <songs-filters />
    </template>
    <template #sort_select_box>
      <sort-by :options="sortOptions" @changeSort="sortSongs" />
    </template>
    <div v-if="AllSongs.length" class="song-cards">
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
        :container-el="getContainer"
        @open-playlist-modal="openPlaylistModal"
      />
    </div>
    <the-loader v-if="songsAreLoading" />
    <div 
      v-else-if="showEmptySongsMessage" 
      class="empty-songs"
    >
      Playlist <b>{{ $route.query?.playlist }}</b> is empty.
    </div>
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
import { ref, computed, defineAsyncComponent, watch } from "vue";
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

const AddToPlaylistModal = defineAsyncComponent(() => import('../components/playlist/AddToPlaylistModal.vue'));

const store = useStore();
const route = useRoute();

const filters = computed(() => store.getters.getActiveFilters);
const songId = ref(null);
const openModal = ref(false);

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

const sortOptions = computed(() => ["Last added", "Oldest", "Best learned", "Least learned", "A-Z", "Z-A"]);
const getContainer = computed(() => document.getElementById('app'));
const getPlaylists = computed(() => store.getters.getPlaylists);
const songsAreLoading = computed(() => store.getters.songsLoading);
const showEmptySongsMessage = computed(() => !songsAreLoading.value && AllSongs.value.length === 0);

const AllSongs = computed(() => {
  const queryName = route.query;
  if(queryName?.playlist) {
    return store.getters.getSongsFromPlaylist(filters.value);
  }
  return store.getters.filterSongs(filters.value, queryName);
});

watch(() => route.query.playlist, async (newVal) => {
  if (newVal) {
    await store.dispatch("fetchSongsForPlaylist", route.query.playlist);
  } 
}, {immediate: true});

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

.empty-songs {
  text-align: center;
  margin-top: 5rem;
}
</style>