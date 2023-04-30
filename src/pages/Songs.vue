<template>
  <base-card>
    <template #filters>
      <songs-filters />
    </template>
    <template v-if="playlistQueryName" #playlist_name_edit>
      <div v-if="!playlistNameEdit" class="playlist-name-container">
        <VDropdown
          :distance="8"
          :dispose-timeout="1000"
          :container="getContainer"
        >
          <span
            tabindex="0"
            class="edit-icon"
            @click.stop
            @keydown.enter.stop
          >
            <font-awesome-icon icon="cog" />
          </span>
          <template #popper>
            <ul class="dropdown-popup">
              <li
                class="dropdown-popup-item"
                tabindex="0"
                @keydown.enter="openPlaylistEdit"
                @click="openPlaylistEdit"
              >
                <font-awesome-icon class="popup-item-icon" icon="pen" />
                <span>Edit title</span>
              </li>
              <li class="dropdown-popup-item delete" @click="deletePlaylist">
                <font-awesome-icon class="popup-item-icon" icon="trash-alt" />
                <span>Delete</span>
              </li>
            </ul>
          </template>
        </VDropdown>
        <h2 :title="playlistQueryName" class="playlist-title">{{ playlistQueryName }}</h2>
        <span class="playlist-song-number-chip">Songs: {{ activePlaylistSongsLength }}</span>
      </div>
      <add-playlist-input
        v-else 
        :playlist="playlistQueryName" 
        :playlists="getPlaylists" 
        @cancel-edit="closePlaylistEdit"
      />
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
      Playlist <b>{{ playlistQueryName }}</b> is empty.
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
import { ref, computed, defineAsyncComponent, watch, onBeforeUnmount } from "vue";
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const AddToPlaylistModal = defineAsyncComponent(() => import('../components/playlist/AddToPlaylistModal.vue'));
const AddPlaylistInput = defineAsyncComponent(() => import('../components/playlist/AddPlaylistInput.vue'));

const store = useStore();
const route = useRoute();
const router = useRouter();

const filters = computed(() => store.getters.getActiveFilters);
const playlistQueryName = computed(() => route.query?.playlist);
const activePlaylistSongsLength = computed(() => store.getters.getActivePlaylistSongsLength);
const songId = ref(null);
const openModal = ref(false);
const playlistNameEdit = ref(false);

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

function closePlaylistEdit() {
  playlistNameEdit.value = false;
}
function openPlaylistEdit() {
  playlistNameEdit.value = true;
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

const unwatch = watch(() => route.query?.playlist, async (newVal) => {
  if (newVal) {
    closePlaylistEdit();
    await store.dispatch("fetchSongsForPlaylist", route.query?.playlist);
    if (!getPlaylists.value.includes(route.query?.playlist)) router.push("/songs");
  } 
}, {immediate: true});
onBeforeUnmount(unwatch);

async function deletePlaylist() {
  if (!playlistQueryName.value) return;
  if(window.confirm(`Are you sure you want to DELETE the playlist "${playlistQueryName.value}"?\n\nSongs from playlist will NOT be removed from your account.`)) {
    store.commit("setLoader");
    const response = await store.dispatch("deletePlaylist", playlistQueryName.value);
    store.commit("removeLoader");
    if(!response) window.alert("Something went wrong upon deleteing a playlist. Please refresh.");
    else router.push("/songs");
  }
}

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

.playlist-name-container {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 100%;
  flex-wrap: wrap;
  .playlist-title {
    max-width: 12.5rem;
    display: inline-block;
    @include ellipsis-text;

    @media (min-width: 77rem) {
      max-width: 35rem;
    }

    @media (min-width: 87rem) {
      max-width: 45rem;
    }
  }

  .playlist-song-number-chip {
    white-space: nowrap;
    margin: auto;
    border: 2px solid #ccc;
    border-radius: 1.25rem;
    padding: 0.3125rem 0.625rem;
    font-size: 0.875rem;
    color: var(--mid_gray);
    @media (min-width: 56.26rem) {
      margin: 0 0 0 auto;
    }
  }

  .edit-icon {
    cursor: pointer;
    padding: 0.5rem;
    background-color: var(--f1_gray);
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: var(--chips_gray);
    }
  }
}
</style>