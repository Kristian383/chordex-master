<template>
  <base-card>
    <div class="form-container">
      <!-- yt modal -->
      <transition name="fade">
        <how-to-modal v-if="openYTModal" @close-modal="closeYtModal" />
      </transition>
      <div class="go-back" @click="$router.go(-1)">
        <font-awesome-icon icon="arrow-left" />
      </div>
      <form autocomplete="off" @submit.prevent>
        <div v-if="errorMsg" class="error-container">
          <p class="error-text">{{ errorMsg }}</p>
        </div>
        <div class="top-section" tabindex="-1">
          <font-awesome-icon
            tabindex="0"
            class="delete"
            icon="trash-alt"
            @click="deleteSong"
            @keydown.enter.prevent="deleteSong"
          />
          <font-awesome-icon
            tabindex="0"
            class="heart"
            :icon="favoriteIconName"
            :class="{ 'is-favorite': isFavorite }"
            @click.prevent="toggleFavorite"
            @keydown.enter="toggleFavorite"
          />
          <div class="mysong">
            <template v-if="!songId">
              <input
                id="my-song"
                v-model="songInfo.isMySong"
                type="checkbox"
                name="my-song"
                class="form-input-chk-field"
                @click="setMySongArist"
              />
              <label 
                tabindex="0" 
                for="my-song" 
                @keydown.enter="{ 
                  songInfo.isMySong = !songInfo.isMySong;
                  artist.val = getUsername;
                }"
              >
                My song
              </label>
            </template>
          </div>
          <button-save
            tabindex="0"
            name="Save"
            @keydown.enter="submitSong"
            @click="submitSong" 
          />
        </div>
        <div class="grid-2">
          <!-- artist name -->
          <div class="artist-input-container">
            <input
              id="input-artist"
              v-model.trim="artist.val"
              class="input-field"
              type="text"
              placeholder="Artist name"
              :disabled="songInfo.isMySong || songId"
              :class="{ 'error-msg': !artist.isValid }"
              @focus="clearValidity('artist'); artistDropdownOpen = true;"
              @input="searchArtistsInput"
              @keydown.esc="artistDropdownOpen = false;"
            />
            <div v-if="artistDropdownOpen && searchMatch.length" class="popup-aritst">
              <ul>
                <li
                  v-for="(artistData, index) in searchMatch"
                  :key="artistData.name + index" 
                  tabindex="0" 
                  @click="handleArtistSelect(artistData.name)"
                  @keydown.enter.prevent="handleArtistSelect(artistData.name)"
                >
                  {{ artistData.name }}
                </li>
              </ul>
            </div>
          </div>
          <!-- song name -->
          <input
            id="input-song"
            ref="songInputRef"
            v-model.trim="song.val"
            class="input-field"
            type="text"
            placeholder="Song name"
            :class="{ 'error-msg': !song.isValid }"
            @focus="clearValidity('song')"
          />
          <!-- spotify api and bpm -->
          <div class="grid-2">
            <button
              v-if="!songInfo.isMySong"
              class="spotify-btn"
              :disabled="showToast"
              @click="searchSongInfo"
              @keydown.enter.prevent="searchSongInfo"
            >
              <!-- Get song info -->
              {{ getSongInfoTxt }}
              <font-awesome-icon icon="question-circle" />
            </button>
            <input
              id="input-bpm"
              v-model="songInfo.bpm"
              class="input-field"
              type="number"
              placeholder="BPM"
            />
          </div>
          <!-- easy hard and tuning badges -->
          <div>
            <difficulty-chips v-model="songInfo.difficulty" />
            <input
              id="input-tuning"
              v-model="songInfo.tuning"
              class="input-field"
              type="text"
              placeholder="Tuning: Standard"
            />
          </div>
          <!-- first key -->
          <div class="grid-2">
            <select-box-key
              key-number="firstKey"
              :music-key="songInfo.firstKey"
              :key-notes="songInfo.firstKeyNotes"
              @key-selected="insertKey"
            />
          </div>
          <!-- second key -->
          <div class="grid-2">
            <select-box-key
              v-if="openSecond"
              key-number="secondKey"
              :music-key="songInfo.secondKey"
              :key-notes="songInfo.secondKeyNotes"
              @key-selected="insertKey"
            />
            <font-awesome-icon
              v-if="openSecond"
              class="remove-second-key-btn"
              :icon="['far', 'times-circle']"
              @click="removeSecondKeySelect"
            />
          </div>
          <!-- first key Chord progression-->
          <input
            v-model.trim="songInfo.firstChordProgression"
            class="input-field"
            type="text"
            placeholder="First chord progression"
          />
          <!-- second key Chord progression-->
          <transition name="fade">
            <input
              v-if="openSecond"
              v-model.trim="songInfo.secondChordProgression"
              class="input-field"
              type="text"
              placeholder="Second chord progression"
            />
          </transition>
          <!-- guitar types -->
          <div>
            <input
              id="electric"
              v-model="songInfo.electric"
              type="checkbox"
              name="choice"
              class="form-input-chk-field"
            /><label for="electric">Electric</label>
            <input
              id="acoustic"
              v-model="songInfo.acoustic"
              type="checkbox"
              name="choice"
              class="form-input-chk-field"
            /><label for="acoustic">Acoustic</label>
            <input
              id="capo"
              v-model="hasCapo"
              type="checkbox"
              name="choice"
              class="form-input-chk-field"
            /><label for="capo">Capo</label>
            <input
              v-if="hasCapo"
              v-model="songInfo.capo"
              class="input-field"
              style="width: 100px !important"
              type="number"
              placeholder="Fret"
            />
          </div>
          <!-- slider -->
          <div class="range-slider">
            <input
              v-model="songInfo.practicedPrcntg"
              class="range-slider__range"
              type="range"
              min="0"
              max="100"
            />
            <span class="range-slider__value">
              {{ songInfo.practicedPrcntg }}%
            </span>
          </div>
          <!-- yt link -->
          <div class="yt">
            <input
              v-model.trim="songInfo.ytLink"
              class="input-field"
              type="text"
              placeholder="YouTube Link: https://www.youtube.com/..."
            />
            <span class="yt_questionmark" @click="showYtModal">
              <font-awesome-icon icon="question-circle" />
            </span>
          </div>
          <!-- chords website link -->
          <input
            v-model.trim="songInfo.chordsWebsiteLink"
            class="input-field"
            type="text"
            placeholder="Chords website link"
          />
          <!--  -->
        </div>
        <!-- song notes -->
        <div>
          <textarea
            id="txt_area"
            v-model="songInfo.songText"
            class="notebook"
            name=""
            rows="20"
            placeholder="Notes about this song..."
            @keydown.tab.prevent="tabber($event)"
          />
        </div>
      </form>
    </div>
  </base-card>
  <teleport to="#app">
    <div v-if="showToast" class="toast-container">
      <the-toast 
        :message="toastMessage" 
        :status="toastStatus" 
        :show-close-button="false"
      />
    </div>
  </teleport>
</template>

<script setup>
import ButtonSave from "../components/ui/ButtonSave.vue";
import SelectBoxKey from "../components/ui/SelectBoxKey.vue";
import DifficultyChips from "../components/ui/add-song/DifficultyChips.vue";
import getNotesFromKey from "../helpers/GetKeyNotes";
import { reactive, ref, computed, onMounted, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const HowToModal = defineAsyncComponent(() => import('../components/ui/HowToModal.vue'));
const TheToast = defineAsyncComponent(() => import('../components/ui/TheToast.vue'));

const store = useStore();
const route = useRoute();
const router = useRouter();

const songId = ref(null);
const isFavorite = ref(null);
const formIsValid = ref(false);
const errorMsg = ref('');
const hasCapo = ref(null);
const openSecond = ref(false);
const openYTModal = ref(false);
const artist = reactive({
  val: "",
  isValid: true
});
const song = reactive({
  val: "",
  isValid: true
});

const songInfo = reactive({
  songText: '',
  practicedPrcntg: 0,
  bpm: null,
  capo: null,
  electric: null,
  acoustic: null,
  firstKey: null,
  firstChordProgression: '',
  secondKey: null,
  secondChordProgression: '',
  chordsWebsiteLink: '',
  ytLink: '',
  firstKeyNotes: null,
  secondKeyNotes: null,
  tuning: null,
  isMySong: false,
  difficulty: 'medium',
  lastViewed: null,
  imgUrl: ''
});

const favoriteIconName = computed(() => isFavorite.value ?  "heart" : ["far", "heart"]);
const getUsername = computed(() => store.getters.user.username);
const allMusicKeys = computed(() => store.getters.getMusicKeys);

onMounted(() => {
  songId.value = route.params?.songId;
  if (!songId.value) return;

  const isMySong = !!route.query?.isMySong;
  const allSongs = isMySong ? store.getters.getAllMySongs : store.getters.getAllSongs;
  const songData = allSongs.find((song) => song.songId === +songId.value);
  if (!songData) {
    router.push('/songs');
    return;
  }

  isFavorite.value = songData.isFavorite;
  hasCapo.value = !!songData.capo;
  artist.val = songData.artist;
  song.val = songData.songName;
  songInfo.songText = songData.songText;
  songInfo.practicedPrcntg = songData.practicedPrcntg;
  songInfo.bpm = songData.bpm;
  songInfo.capo = songData.capo;
  songInfo.electric = songData.electric;
  songInfo.acoustic = songData.acoustic;
  songInfo.firstChordProgression = songData.firstChordProgression;
  songInfo.chordsWebsiteLink = songData.chordsWebsiteLink;
  songInfo.ytLink = songData.ytLink;
  songInfo.firstKeyNotes = songData.firstKeyNotes;
  songInfo.tuning = songData.tuning;
  songInfo.isMySong = songData.isMySong;
  songInfo.difficulty = songData.difficulty;
  songInfo.firstKey = songData.firstKey;
  songInfo.lastViewed = songData.lastViewed;
  songInfo.imgUrl = songData.imgUrl;

  if(songData.firstKey) openSecond.value = true;
  if (songData.secondKey) {
    openSecond.value = true;
    songInfo.secondKey = songData.secondKey;
    songInfo.secondKeyNotes = songData.secondKeyNotes;
    songInfo.secondChordProgression = songData.secondChordProgression;
  }
});

function insertKey(data) {
  const notesFromKey = getNotesFromKey(data.keyWithQuality, allMusicKeys.value);

  if (data.keyNumber === "firstKey") {
    openSecond.value = true;
    songInfo.firstKey = data.keyWithQuality;
    songInfo.firstKeyNotes = notesFromKey;
  } else {
    songInfo.secondKey = data.keyWithQuality;
    songInfo.secondKeyNotes = notesFromKey;
  }
}

async function deleteSong() {
  const shouldDelete = window.confirm(`Are you sure you want to delete ${song.val} song?`);
  if (!shouldDelete) return;

  const payload = {
    songName: song.val,
    artist: artist.val,
    songId: +songId.value,
  };
  await store.dispatch("deleteSong", payload);
  const routePath = songInfo.isMySong ? "/songs?isMySong=True" : "/songs";
  router.push(routePath);
}

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}

function removeSecondKeySelect() {
  openSecond.value = false;
  songInfo.secondKey = null;
  songInfo.secondKeyNotes = null;
}

function tabber(event) {
  let text = songInfo.songText,
      originalSelectionStart = event.target.selectionStart,
      textStart = text.slice(0, originalSelectionStart),
      textEnd = text.slice(originalSelectionStart);

  songInfo.songText = `${textStart}\t${textEnd}`;
  event.target.value = songInfo.songText;
  event.target.selectionEnd = event.target.selectionStart =
    originalSelectionStart + 1;
}

function clearValidity(field) {
  if (field === "artist") artist.isValid = true;
  else song.isValid = true;
}

async function submitSong(event) {
  validateForm();
  if (!formIsValid.value) return;

  event.target.classList.toggle("loading");

  if (songInfo.ytLink) songInfo.ytLink = setYTLink(songInfo.ytLink);

  const formData = {
    ...songInfo,
    artist: artist.val,
    songName : song.val,
    songId: +songId.value,
    isFavorite: isFavorite.value
  };
  
  try {
    const response = await store.dispatch("addNewSong", formData);
    event.target.classList.remove("loading");

    if (response != false) {
      let pushRoute = songInfo.isMySong ? `/songs/${response}?isMySong=True` : `/songs/${response}`;
      router.push(pushRoute);
      const index = store.getters.getArtists.findIndex((artist) => artist.name.toLowerCase() == formData.artist.toLowerCase());
      if (index === -1) store.dispatch("loadAllArtists");
    } else {
      formIsValid.value = false;
      song.isValid = false;
      errorMsg.value = "Something went wrong. Check if you already have that song or if you have reached maximum number of songs (30).";
    }
  } catch(error) {
    console.log(error);
  }
}

function validateForm() {
  formIsValid.value = true;
  errorMsg.value = "";

  if (!artist.val || artist.val.length > 40) {
    artist.isValid = false;
    errorMsg.value = `Please check if your artist has less than 40 characters. Yours: ${artist.val.length}`;
  } else if (!song.val || song.val.length > 40) {
    song.isValid = false;
    errorMsg.value = `Please check if your song has less than 40 characters. Yours: ${song.val.length}`;
  } else if (songInfo.bpm === "" || typeof songInfo.bpm === "string") {
    songInfo.bpm = null;
  } else if (songInfo.bpm < 0 || songInfo.bpm > 300) {
    errorMsg.value = `Please check if BPM > 0 and < 300. Yours: ${songInfo.bpm}`;
  } else if (songInfo.secondChordProgression.length > 100 || songInfo.firstChordProgression.length > 100) {
    errorMsg.value = `Please check if chord progressions have less than 100 characters. First: ${songInfo.firstChordProgression.length} Second: ${songInfo.secondChordProgression.length}`;
  } else if (songInfo.songText.length > 3500) {
    errorMsg.value = `Please check if the notes about song have less than 3500 chars. Yours: ${songInfo.songText.length}`;
  } else if (songInfo.chordsWebsiteLink.length > 150 || songInfo.ytLink.length > 150)  {
    errorMsg.value = `Please check if YouTube or Chord website links have less than 150 chars. Yours YT: ${songInfo.ytLink.length} Chord website: ${songInfo.chordsWebsiteLink.length}`;
  } else if (typeof songInfo.capo === "string" || songInfo.capo === "") {
    songInfo.capo = null;
  } else if (songInfo.capo > 20 || songInfo.capo < 0) {
    errorMsg.value = "Capo seems to be wrongly inserted.";
  } else {
    return;
  }
  formIsValid.value = false;
}

function showYtModal() {
  openYTModal.value = true;
}

function closeYtModal() {
  openYTModal.value = false;
}

function setYTLink(link) {
  let linkArr = link.split(/[/=]+/);
  let id = linkArr[linkArr.length - 1];
  return `https://www.youtube.com/embed/${id}`;
}

function setMySongArist(event) {
  if (event.target.checked) artist.val = getUsername;
}

const toastMessage = ref("");
const toastStatus = ref(null);
const showToast = ref(false);
const getSongInfoTxt = ref('Get song info');

function callToast(status, message) {
  toastStatus.value = status;
  toastMessage.value = message;
}

async function searchSongInfo() {
  if (!song.val || !artist.val || getSongInfoTxt.value === "Searching...") {
    callToast("Error", "Please insert song and artist.");
    showToast.value = true;
    setTimeout(() => showToast.value = false, 3000);
    return;
  }

  const payload = {
    songName: song.val,
    artist: artist.val,
  };
  getSongInfoTxt.value = "Searching...";
  try {
    const response = await store.dispatch("apiForSongInfo", payload);
    
    if (!response) {
      callToast("Unsuccessful", "Couldn't find anything.");
      showToast.value = true;
    } else {
      const _firstKeyNotes = getNotesFromKey(response.key, allMusicKeys.value);
      songInfo.firstKeyNotes = _firstKeyNotes;
      songInfo.firstKey = response.key;
      songInfo.bpm = response.bpm;
      songInfo.imgUrl = response.imgUrl;
      artist.val = response.artist;
      song.val = response.songName;
      callToast("Add", "Successfuly fetched song info!");
      showToast.value = true;
    }
  } catch(error) {
    callToast("Unsuccessful", "Couldn't find anything.");
    showToast.value = true;
  }
  setTimeout(() => showToast.value = false, 3000);
  getSongInfoTxt.value = "Get song info";
}

const getAllArtists = computed(() => store.getters.getArtists);
const searchMatch = ref([]);
const artistDropdownOpen = ref(false);
const songInputRef = ref(null);

const handleArtistSelect = (selectedValue) => {
  artist.val = selectedValue;
  artistDropdownOpen.value = false;
  songInputRef.value.focus();
};

const searchArtistsInput = (e) => {
  const textValue = e.target.value;
  const foundData = getAllArtists.value.filter((artist) => {
    const regex = new RegExp(textValue, "gi");
    return artist.name.match(regex);
  });
  searchMatch.value = foundData;
};
</script>

<style lang="scss" scoped>
.form-container {
  background-color: #eaebea;
  color: RGB(16, 17, 20);
  padding: 0.75rem 0.9375rem;
  max-width: 68.75rem;
  margin: 0 auto;
  border-radius: 0.375rem;
  font-size: 1.125rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-left: 0.375rem solid var(--burgundy);
  position: relative;

  @media (min-width: 87.5rem) {
    margin: 1rem auto 0;
  }

  /* error msg */
  .error-container {
    position: relative;
    border-radius: 0.5rem;
    z-index: 23;
    margin-bottom: 0.375rem;

    .error-text {
      color: var(--burgundy);
      font-size: 0.875rem;
      text-align: center;
      border-radius: 0.5rem;
      background-color: var(--burgundy);
      color: #fff;
      padding: 1rem;
    }
  }

  .top-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: relative;
    gap: 0.5rem;

    @media (min-width: 26.25rem) {
      gap: 1.5rem;
    }

    .is-favorite {
      color: var(--burgundy);
    }

    .heart {
      cursor: pointer;
    }

    .mysong {
      cursor: pointer;

      label {
        margin: 0;
        padding: 8px 1rem;
      }
    }

    .delete {
      cursor: pointer;
      color: RGB(16, 17, 20);
      margin-right: auto;

      &:hover {
        color: black;
      }
    }
  }
  // fontawesome icons
  svg {
    font-size: 1.5rem;
    transition: all 0.2s ease-in;
  }
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.5rem;
  margin-top: 1.125rem;
  align-items: center;
  position: relative;

  &:nth-child(-n + 2) {
    margin-top: 0;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.grid-2 > input,
.grid-2 > div {
  max-width: 31.25rem;
}

form input:nth-child(-n + 2) {
  margin-top: 0.625rem;
}

form .notebook,
form .input-field {
  border: 0;
  outline: 0;
  padding: 1rem;
  -moz-border-radius: 0.5rem;
  -webkit-border-radius: 0.5rem;
  border-radius: 0.5rem;
  display: inline-block;
  width: 100%;
  margin-top: 1rem;
  font-size: inherit;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: 0.4s;
  resize: none;
  color: var(--font_black);

  &:focus {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  &#input-artist:disabled {
    box-shadow: none;
    background-color: var(--light_gray);
  }
}
.artist-input-container {
  position: relative;
  .popup-aritst {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 15rem;
    overflow-y: auto;
    border-radius: 0.5rem;
    background-color: var(--white);
    margin-top: 0.25rem;
    z-index: 21;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    padding: 0.125rem;

    ul {
      margin: 0;
      padding: 0;
      list-style: none;
      
      li {
        padding: 0.625rem;
        font-size: 1rem;
        cursor: pointer;
        @include ellipsis-text;
        &:hover {
          background-color: var(--f1_gray);
        }
        &:active {
          background-color: var(--light_gray);
        }
      }
    }
  }
}
form .notebook {
  resize: vertical;
  line-height: 1.9375rem;
}

.spotify-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border: 2px solid var(--dark_gray_font);
  padding: 0.3125rem 0.625rem;
  font-size: inherit;
  border-radius: 1.25rem;
  color: var(--dark_gray_font);
  width: 12.5rem;
  margin: 0 auto;
  
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }
  &:active {
    transform: translateY(1px);
  }
  &:focus-visible {
    outline: 2px solid var(--orange);
  }
  svg {
    margin-left: 0.5rem;
    color: var(--dark_gray_font);
  }

  @media (min-width: 640px) {
    margin: 0;
  }
}

#input-bpm {
  width: 6.25rem;
  justify-self: center;
  margin-top: 0;
  @media (min-width: 640px) {
    margin-left: 0;
  }
}

#input-tuning {
  width: 13.75rem;
  justify-self: center;
  padding: 0.875rem;
}

/* selectbox for key */
.remove-second-key-btn {
  position: absolute;
  right: 0;
  cursor: pointer;
}

form input:-internal-autofill-selected {
  background-color: #fff !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.range-slider {
  width: 100%;
  text-align: center;
}

.range-slider__range {
  -webkit-appearance: none;
  width: calc(100% - (4.5625rem));
  height: 0.625rem;
  border-radius: 0.3125rem;
  background: #fff;
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    background: var(--dark_gray_font);
    cursor: pointer;
    -webkit-transition: background 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background: #888;
  }

  &:active::-webkit-slider-thumb {
    background: #888;
  }

  &::-moz-range-thumb {
    width: 1.25rem;
    height: 1.25rem;
    border: 0;
    border-radius: 50%;
    background: #888;
    cursor: pointer;
    -moz-transition: background 0.15s ease-in-out;
    transition: background 0.15s ease-in-out;
  }

  &::-moz-range-thumb:hover {
    background: #888;
  }

  &:active::-moz-range-thumb {
    background: #888;
  }
}

.range-slider__value {
  display: inline-block;
  position: relative;
  width: 3.75rem;
  color: #fff;
  line-height: 1.25rem;
  text-align: center;
  border-radius: 0.1875rem;
  background: var(--dark_gray_font);
  padding: 0.3125rem 0.625rem;
  margin-left: 0.5rem;

  &:after {
    position: absolute;
    top: 0.5rem;
    left: -0.4375rem;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid #2c3e50;
    border-bottom: 7px solid transparent;
    content: "";
  }
}

::-moz-range-track {
  background: #d7dcdf;
  border: 0;
}
input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}

.yt {
  position: relative;
  input {
    padding-right: 2.875rem;
  }
}
.yt_questionmark {
  position: absolute;
  top: 60%;
  left: 90%;
  transform: translate(0, -50%);
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
}

.go-back {
  position: absolute;
  left: 0.3125rem;
  top: -3.125rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px 0, rgba(0, 0, 0, 0.1) 0 0 1px 0;

  &:hover {
    background-color: var(--f1_gray);
  }
}

.toast-container {
  position: fixed;
	top: 1rem;
	right: 1rem;
	z-index: 10000;
}
</style>