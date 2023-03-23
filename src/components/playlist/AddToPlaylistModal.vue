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
              type="checkbox" class="checkbox" :checked="playlist[1]"
              @input="updatePlaylist(playlist[0], $event)"
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
            tabindex="0" 
            placeholder="Enter playlist name"
            @focus="clearValidity()"
          />
          <span :class="{'invalid-input-border': !inputIsValid}" class="focus-border" />
          <span :class="{'invalid-input': playlistNameChars > 50}" class="name-char-counter">
            {{ playlistNameChars }}/50
          </span>
          <div
            tabindex="0"
            class="create-btn"
            @click="createPlaylist"
            @keydown.enter="createPlaylist"
          >
            Create
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits, reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

defineEmits(["closeModal"]);
const props = defineProps(["playlists", "songId"]);
const store = useStore();

const playlistMap = reactive(new Map());

// todo: podici logiku u Songs.vue
async function fetchPlaylistsOfSong() {
  const playlistsOfSong = await store.dispatch("fetchSongPlaylists", props.songId);
  props.playlists.forEach((playlist) => playlistMap.set(playlist, playlistsOfSong.includes(playlist)))
}

function updatePlaylist(name, event) {
  playlistMap.set(name, event.target.checked);
  // todo: send api request and
  // console.log(name, event.target.checked);
}

onMounted(fetchPlaylistsOfSong);

const inputIsOpen = ref(false);
const inputIsValid = ref(true);
const playlistName = ref("");

const playlistNameChars = computed(() => playlistName.value.length)

function openCreatePlaylist() {
  inputIsOpen.value = true;
}

function clearValidity() {
  inputIsValid.value = true;
}

async function createPlaylist() {
  if (playlistNameChars.value > 50 || playlistMap.has(playlistName.value)) { // dodati "or" gdje provjerimmo u mappedPlaylists jeli 
    inputIsValid.value = false;
    return;
  }

  // disable create button?
  // nakon sto se kreira playlista, dodati tu pjesmu u nju i zatvoriti modal
}


</script>

<style lang="scss" scoped>

.add-to-playlist-modal-wrapper {
  @include modal-wrapper;

  .add-to-playlist-container {
    @include center-inner-modal;
    max-width: 18rem;
    padding: 1rem 1rem 0 1.5rem;
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
        margin: 0.5rem 0.5rem 0.5rem 0;
        background-color: var(--chips_gray);
        border-radius: 1rem;
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
      cursor: pointer;
      padding: 1rem;

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