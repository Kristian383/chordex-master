<template>
  <div class="playlist-input-with-buttons">
    <div class="create-new-input-container">
      <input
        v-model.trim="playlistName"
        class="create-new-input"
        type="text"
        placeholder="Enter playlist name"
        @focus="clearValidity"
        @keydown.enter="updatePlaylistName"
        @keydown.esc="cancelEdit"
      />
      <span :class="{'invalid-input-border': !inputIsValid}" class="focus-border" />
      <span class="name-char-counter">
        {{ playlistNameChars }}/50
      </span>
      <p v-if="!inputIsValid" class="playlist-input-error">
        {{ errorMsg }}
      </p>
    </div>
    <div class="buttons-container">
      <button
        class="save-btn"
        :disabled="isLoading"
        @click="updatePlaylistName"
        @keydown.enter="updatePlaylistName"
      >
        Save
      </button>
      <button
        class="cancel-btn"
        :disabled="isLoading"
        @click="cancelEdit"
        @keydown.enter="cancelEdit"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const props = defineProps({ playlist: { type: String, required: true }, 
                            playlists: {type: Array, required: true}});
const emits = defineEmits(["cancelEdit"]);
const store = useStore();
const router = useRouter();

const playlistName = ref(props.playlist);
const inputIsValid = ref(true);
const errorMsg = ref("This is error message.");
const isLoading = ref(false);

const playlistNameChars = computed(() => playlistName.value.length);

async function updatePlaylistName() {
  inputIsValid.value = true;
  if (playlistName.value === props.playlist) {
    cancelEdit();
    return;
  } else if (!playlistName.value) {
    inputIsValid.value = false;
    errorMsg.value = "Please enter a playlist name.";
    return;
  } else if (playlistNameChars.value > 50) {
    inputIsValid.value = false;
    errorMsg.value = "Character limit exceeded.";
    return;
  } else if (props.playlists.includes(playlistName.value)) {
    inputIsValid.value = false;
    errorMsg.value = "Playlist name already exists.";
    return;
  }

  const payload = { playlist_name: props.playlist, new_playlist_name: playlistName.value};
  isLoading.value = true;
  const response = await store.dispatch("updatePlaylistName", payload);
  isLoading.value = false;
  if (!response) {
    inputIsValid.value = false;
    errorMsg.value = "Something went wrong. Please refresh page.";
    return;
  } else {
    router.push(`/songs?playlist=${playlistName.value}`);
    cancelEdit();
  }
}

function clearValidity() {
  inputIsValid.value = true;
}
function cancelEdit() {
  emits("cancelEdit");
}
</script>

<style lang="scss" scoped>
.playlist-input-with-buttons {
    display: flex;
    gap: 4rem;
		align-items: center;	
	.create-new-input-container {
		position: relative;
		display: flex;
		flex-direction: column;

		.create-new-input {
			@include playlist-input;
		}
		.playlist-input-error {
			@include input-error-msg;
		}
		.name-char-counter {
			position: absolute;
			right: -2.5rem;
			top: 1.5rem;
			font-size: 0.625rem;
			font-weight: 600;

			&.invalid-input {
				color: var(--burgundy);
			}
		}
	}

		.buttons-container {
			display: flex;
			gap: 0.5rem;
			align-items: center;

			.cancel-btn,
			.save-btn {
				border: none;
				padding: 0.75rem ;
				border-radius: 2rem;
				background-color: transparent;
				user-select: none;

				&:hover {
					background-color: var(--light_gray);
				}

				&:active {
					transform: translateY(2px);
				}
			}
		}
	}
</style>