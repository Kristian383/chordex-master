<template>
  <teleport to="body">
    <div
      class="add-to-playlist-modal-wrapper"
      @click.self="$emit('closeModal')"
      @keydown.esc="$emit('closeModal')"
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
        <!-- <the-loader v-if="isLoading" class="playlist-modal-loader" /> -->
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
  <!-- <the-toast
    v-if="toastActive"
    :message="toastMessage"
    :status="toastStatus"
    :is-active="toastActive"
    @update:isActive="toastActive = $event"
  /> -->
</template>

<script setup>
import { ref, defineProps, defineEmits, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
// import TheToast from '../ui/TheToast.vue';

defineEmits(["closeModal"]);
const props = defineProps(["playlists", "songId"]);
const store = useStore();

const playlistMap = reactive(new Map());
const isLoading = ref(false);
const errorMsg = ref("");
// todo: podici logiku u Songs.vue
async function fetchPlaylistsOfSong() {
  const playlistsOfSong = await store.dispatch("fetchSongPlaylists", props.songId);
  props.playlists.forEach((playlist) => playlistMap.set(playlist, playlistsOfSong.includes(playlist)))
}

onMounted(fetchPlaylistsOfSong);

const inputIsOpen = ref(false);
const inputIsValid = ref(true);
const playlistName = ref("");
const toastActive = ref(true);
// const toastMessage = ref("");
// const toastStatus = ref("");
// const toastsComponents = ref([]);
// const toasts = ref(null);

const playlistNameChars = computed(() => playlistName.value.length)

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
  let response;
  if (checked) {
    response = await store.dispatch("addSongToPlaylist", payload);
  } else {
    response = await store.dispatch("deleteSongFromPlaylist", payload);
  }
  // todo
  // check if response is true or false and according to that display confirmation
  // temporary solution - revert back changes
  if (!response) playlistMap.set(name, !checked)
  isLoading.value = false;
  // return response
}
async function createPlaylist() {
  inputIsValid.value = true;
  if (playlistNameChars.value > 50) {
    inputIsValid.value = false;;
    errorMsg.value = "Character limit exceeded."
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
  // nakon sto se kreira playlista, dodati tu pjesmu u nju i zatvoriti modal
  let response = await store.dispatch("createPlaylist", playlistName.value);
  if (!response) {
    inputIsValid.value = false;
    errorMsg.value = "Playlist creation failed. Please try again.";
    return;
  }
  updatePlaylist(playlistName.value, {target: {checked: true}});
}

// function showToast() {
//   toastActive.value = true;
// }

// function closeToast() {
//   toastActive.value = false;
// }
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
    // border-top: 0.375rem solid var(--burgundy);
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

      // &.blur {
      //   filter: blur(2px);
      // }
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
      // margin-bottom: 1rem;
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
          
          // &.invalid-input-border {
          //   background-color: var(--burgundy);
          // }
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
        // border-radius: 1rem;
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
</style>