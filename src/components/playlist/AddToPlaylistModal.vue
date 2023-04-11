<template>
  <teleport to="body">
    <div
      class="add-to-playlist-modal-wrapper"
      @click.self="$emit('closeModal')"
      @keydown.esc.capture="$emit('closeModal')"
    >
      <div class="add-to-playlist-container">
        <div class="add-to-playlist-header">
          <p>Save to:</p>
          <font-awesome-icon
            class="exit-icon"
            icon="times"
            tabindex="0"
            @keydown.enter="$emit('closeModal')"
            @click="$emit('closeModal')"
          />
        </div>
        <div class="playlist-items">
          <div v-if="!playlists.length" class="empty">No playlists.</div>
          <label
            v-for="playlist in playlistMap"
            :key="playlist[0]"
            class="playlist-item"
          >
            <input
              type="checkbox"
              class="checkbox"
              :checked="playlist[1]"
              @change="updatePlaylist(playlist[0], $event)"
            />
            {{ playlist[0] }}
          </label>
        </div>
        <div
          v-if="!inputIsOpen"
          tabindex="0" 
          class="create-new-playlist"
          @click="openCreatePlaylist"
          @keydown.enter="openCreatePlaylist"
        >
          <font-awesome-icon class="create-icon" icon="plus" />
          <span>Create a new playlist</span>
        </div>
        <div v-else class="create-new-input-container">
          <input
            v-model.trim="playlistName"
            class="create-new-input"
            type="text"
            placeholder="Enter playlist name"
            :disabled="isLoading"
            @focus="clearValidity"
            @keydown.enter="createPlaylist"
          />
          <span :class="{'invalid-input-border': !inputIsValid}" class="focus-border" />
          <span class="name-char-counter">
            {{ playlistNameChars }}/50
          </span>
          <p v-if="!inputIsValid" class="playlist-input-error">
            {{ errorMsg }}
          </p>
          <button
            class="create-btn"
            :disabled="isLoading"
            @click="createPlaylist"
            @keydown.enter="createPlaylist"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  </teleport>
  <teleport to="#app">
    <div v-if="toastsComponents.length" id="toast-container">
      <component
        :is="toast.component"
        v-for="toast in toastsComponents"
        v-bind="toast.props"
        :key="toast.id"
        @close="handleToastUpdate(toast.id)"
      />
    </div>
  </teleport>
</template>

<script setup>
import { ref, markRaw, defineProps, defineEmits, reactive, computed, onMounted, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
const TheToast = defineAsyncComponent(() => import('../ui/TheToast.vue'));

const emits = defineEmits(["closeModal"]);
const props = defineProps(["playlists", "songId"]);
const store = useStore();

const playlistMap = reactive(new Map());
const isLoading = ref(false);
const errorMsg = ref("");
// todo: raise logic to Songs.vue?
async function fetchPlaylistsOfSong() {
  const playlistsOfSong = await store.dispatch("fetchSongPlaylists", props.songId);
  props.playlists.forEach((playlist) => playlistMap.set(playlist, playlistsOfSong.includes(playlist)));
}

onMounted(fetchPlaylistsOfSong);

const inputIsOpen = ref(false);
const inputIsValid = ref(true);
const playlistName = ref("");
const toastsComponents = ref([]);

const playlistNameChars = computed(() => playlistName.value.length);

function openCreatePlaylist() {
  inputIsOpen.value = true;
}

function clearValidity() {
  inputIsValid.value = true;
}
async function updatePlaylist(name, {target: {checked}}) {
  playlistMap.set(name, checked);
  const payload = { playlist_name: name, song_id: props.songId };
  isLoading.value = true;
  const response = checked
    ? await store.dispatch('addSongToPlaylist', payload)
    : await store.dispatch('deleteSongFromPlaylist', payload);

  if (!response) {
    // revert back changes
    playlistMap.set(name, !checked);
    addToast("Error", `Can't ${checked ? 'add': 'remove'} the song${checked ? '': ' from the playlist'}. Try reloading the page.`);
    isLoading.value = false;
    return;
  }

  isLoading.value = false;
  addToast(checked ? "Add" : "Delete", `Song ${checked ? "added to" : "removed from"} '${name}'.`);
}
async function createPlaylist() {
  inputIsValid.value = true;
  if (playlistNameChars.value > 50) {
    inputIsValid.value = false;;
    errorMsg.value = "Character limit exceeded.";
    return;
  } else if (props.playlists.includes(playlistName.value)) {
    inputIsValid.value = false;
    errorMsg.value = "Playlist name already exists.";
    return;
  }  else if (playlistName.value === "") {
    inputIsValid.value = false;
    errorMsg.value = "Please enter a playlist name.";
    return;
  }

  const response = await store.dispatch("createPlaylist", playlistName.value);
  if (!response) {
    inputIsValid.value = false;
    errorMsg.value = "Playlist creation failed. Please try again.";
    return;
  }

  updatePlaylist(playlistName.value, {target: {checked: true}});
  playlistName.value = "";
}


const addToast = (status, msg) => {
  const uniqueId = Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  const toastProps = {
    message: msg,
    status: status
  };
  toastsComponents.value.push({
    id: uniqueId,
    component: markRaw(TheToast),
    props: toastProps,
  });
};

const handleToastUpdate = (id) => {
  const toastIndex = toastsComponents.value.findIndex((toast) => toast.id === id);
  if (toastIndex > -1) {
    toastsComponents.value.splice(toastIndex, 1);
  }
};
</script>

<style lang="scss" scoped>

.playlist-modal-loader {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.add-to-playlist-modal-wrapper {
  @include modal-wrapper;

  .add-to-playlist-container {
    @include center-inner-modal;
    max-width: 18rem;
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    color: var(--dark_gray_font);
    gap: 1.125rem;

    .add-to-playlist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 1.125rem;

      .exit-icon {
        width: 1.75rem;
        height: 1.75rem;
        cursor: pointer;

        &:hover {
          color: var(--dark_gray_chips);
        }
        &:active {
          outline:none;
        }
      }
    }

    .playlist-items {
      display: flex;
      flex-direction: column;
      gap: 0.625rem;
      max-height: 20rem;
      overflow-y: auto;
      .playlist-item {
        text-align: start;
        min-height: 1.375rem;
        padding-right: 0.5rem;

        @include ellipsis-text;
          .checkbox {
            margin-right: 0.875rem;
            width: 1.25rem;
            height: 1.25rem;
            vertical-align: middle;
          }

        &:hover {
          color: var(--dark_gray_chips);
          background-color: #FCFDFD;
          input {
            box-shadow: rgba(149, 157, 165, 0.2) 0 0.5rem 1.5rem;
          }
        }
      }
    }

    .create-new-input-container {
      position: relative;
      display: flex;
      flex-direction: column;
      
      .create-new-input {
        border: 0;
        padding: 0.5rem 0;
        font-size: 1rem;
        border-bottom: 1px solid #ccc;
        width: 100%;
        position: relative;
        
        &:focus {
          outline: none;
        }
        & ~ .focus-border {
          position: absolute;
          top: 2.1875rem;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: var(--light_blue);
          transition: 0.4s;
        }
        &:focus ~ .focus-border {
          width: 100%;
          transition: 0.4s;
          left: 0;
        }
        &:focus ~ .focus-border,
        &.has-content ~ .focus-border {
          width: 100%;
          transition: 0.4s;
        }
      }
      .playlist-input-error {
        font-size: 0.75rem;
        padding-right: 1rem;
        text-align: start;
        color: var(--burgundy);
      }
      .name-char-counter {
        position: absolute;
        right: 0;
        top: 2.5rem;
        font-size: 0.75rem;
        font-weight: 600;

        &.invalid-input {
          color: var(--burgundy);
        }
      }
      .create-btn {
        margin: 0.5rem 0.5rem 0 0;
        background-color: var(--chips_gray);
        border: none;
        width: 7rem;
        align-self: center;
        @include btn;

        &:hover {
          background-color: var(--chips_gray_hover);
        }

        &:active {
          transform: translateY(2px);
        }
      }
    }
    .create-new-playlist {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: center;

      &:hover {
        color: var(--dark_gray_chips);        
        text-decoration: underline;

        .create-icon {
          transform: rotate(90deg);
        }
      }

      .create-icon {
        width: 1.25rem;
        height: 1.25rem;
        transition: transform 0.3s ease;
      }
    }
  }
}

#toast-container {
  position: fixed;
	top: 1rem;
	right: 1rem;
	display: flex;
	flex-direction: column;
  gap: 0.875rem;
	z-index: 10000;
}
</style>