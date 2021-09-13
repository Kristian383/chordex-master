<template>
  <base-card>
    <div class="form-container">
      <!-- <div class="modal" id="modal"></div> -->
      <div class="go-back" @click="goBack">
        <!-- <router-link :to="songInfo.isMySong ? '/my-songs' : '/songs'"> -->
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        <!-- </router-link> -->
      </div>
      <form @submit.prevent>
        <div class="top-section">
          <font-awesome-icon
            class="heart"
            :icon="iconName"
            :class="{ 'is-favorite': isFavorite }"
            @click.prevent="toggleFavorite"
          ></font-awesome-icon>
          <!-- my song checkbox  clipboard-list  -->
          <div class="my-song">
            <label for="my-song" class="my-label">My song:</label>
            <input
              type="checkbox"
              name="choice"
              id="my-song"
              v-model="songInfo.isMySong"
            />
            <!-- <label for="my-song">My Song</label> -->
          </div>
          <!--  -->
          <font-awesome-icon
            class="delete"
            icon="trash-alt"
          ></font-awesome-icon>
          <!-- <div class="button-container">
            <button class="btn" @click="submitSong"></button>
          </div> -->
          <!-- @click="submitSong" -->
          <button-save @click="submitSong"></button-save>
        </div>
        <div class="grid-2">
          <input
            class="input-field"
            type="text"
            id="input-artist"
            placeholder="Artist name"
            v-model.trim="artist.val"
            :class="{ 'error-msg': !artist.isValid }"
            @focus="clearValidity('artist')"
          />
          <div class="grid-2">
            <div class="find-data" @click="searchSongInfo">
              <!-- Not found anything -->
              Try to get song info
              <font-awesome-icon icon="question-circle"></font-awesome-icon>
            </div>
            <!--  -->
            <input
              v-model="songInfo.bpm"
              class="input-field"
              type="number"
              id="input-bpm"
              placeholder="BPM"
            />
          </div>
          <input
            class="input-field"
            type="text"
            id="input-song"
            placeholder="Song name"
            :class="{ 'error-msg': !song.isValid }"
            @focus="clearValidity('song')"
            v-model.trim="song.val"
          />
          <!-- easy hard -->
          <div>
            <input
              value="easy"
              type="radio"
              name="radio"
              id="easy"
              v-model="songInfo.difficulty"
            /><label for="easy">Easy</label>
            <input
              type="radio"
              name="radio"
              id="medium"
              value="medium"
              v-model="songInfo.difficulty"
            /><label for="medium">Medium</label>
            <input
              type="radio"
              name="radio"
              id="hard"
              value="hard"
              v-model="songInfo.difficulty"
            /><label for="hard">Hard</label>
            <input
              v-model="songInfo.tuning"
              class="input-field"
              type="text"
              id="input-tuning"
              placeholder="Tuning: Standard"
            />
          </div>
          <!--  -->
          <div class="grid-2">
            <select-box-key
              @check-store="insertKey"
              name="firstKey"
            ></select-box-key>
            {{ songInfo.firstKeyNotes }}
          </div>
          <div class="grid-2">
            <transition name="fade">
              <select-box-key
                name="secondKey"
                @check-store="insertKey"
                v-if="openSecond"
              ></select-box-key>
            </transition>
            <transition name="fade">
              <div class="secondOption" v-if="openSecond">
                {{ songInfo.secondKeyNotes }}
                <font-awesome-icon
                  @click="removeSecondKeySelect"
                  :icon="['far', 'times-circle']"
                ></font-awesome-icon>
              </div>
            </transition>
          </div>
          <!--  -->
          <input
            class="input-field"
            type="text"
            placeholder="Chord progression"
            v-model.trim="songInfo.firstProgression"
          />
          <transition name="fade">
            <input
              class="input-field"
              type="text"
              v-if="openSecond"
              placeholder="Chord progression"
              v-model.trim="songInfo.secondProgression"
            />
          </transition>
          <!-- guitar type -->
          <div>
            <input
              type="checkbox"
              name="choice"
              id="electric"
              v-model="songInfo.electric"
            /><label for="electric">Electric</label>
            <input
              type="checkbox"
              name="choice"
              id="acoustic"
              v-model="songInfo.acoustic"
            /><label for="acoustic">Acoustic</label>
            <input
              v-model="haveCapo"
              type="checkbox"
              name="choice"
              id="capo"
              @click="checkCapo"
            /><label for="capo">Capo</label>
            <input
              v-if="haveCapo"
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
              class="range-slider__range"
              type="range"
              min="0"
              max="100"
              v-model="songInfo.practicedPrcntg"
            />
            <span class="range-slider__value"
              >{{ songInfo.practicedPrcntg }}%</span
            >
          </div>
          <!--  -->
          <input
            v-model.trim="songInfo.yt_link"
            class="input-field"
            type="text"
            placeholder="YouTube Link: https://www.youtube.com/watch?v="
          />
          <input
            v-model.trim="songInfo.chords_link"
            class="input-field"
            type="text"
            placeholder="Chords Link"
          />
          <!--  -->
        </div>
        <!--  -->
        <div>
          <textarea class="notebook"
            v-model="songInfo.songText"
            id="txt_area"
            name=""
            rows="10"
            placeholder="Song notes..."
          ></textarea>

          <!-- @keydown.tab.prevent="tabber($event)" -->
        </div>
      </form>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import ButtonSave from "../components/ui/ButtonSave.vue";
import SelectBoxKey from "../components/ui/SelectBoxKey.vue";
export default {
  components: {
    BaseCard,
    SelectBoxKey,
    ButtonSave,
  },
  data() {
    return {
      songId: null,
      isFavorite: null,
      openSecond: false,
      formIsValid: false,
      songInfo: {
        songText: "",
        practicedPrcntg: 50,
        bpm: null,
        capo: null,
        electric: null,
        acoustic: null,
        firstProgression: null,
        secondProgression: null,
        chords_link: null,
        yt_link: null,
        firstKeyNotes: null,
        secondKeyNotes: null,
        tuning: null,
        isMySong: false,
        difficulty: null,
        firstKey: null,
        secondKey: null,
      },
      haveCapo: null,
      artist: {
        val: null,
        isValid: true,
      },
      song: {
        val: null,
        isValid: true,
      },
      isSaved: null,
    };
  },

  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    insertKey(data) {
      if (data.name == "firstKey") {
        this.openSecond = true;
        this.songInfo.firstKey = data.key;
        this.songInfo.firstKeyNotes = data.notes;
      } else {
        this.songInfo.secondKey = data.key;
        this.songInfo.secondKeyNotes = data.notes;
      }
      // console.log(data);
    },
    removeSecondKeySelect() {
      this.openSecond = false;
      this.songInfo.secondKey=null;
      this.songInfo.secondKeyNotes=null;
    },
    tabber(event) {
      let text = this.songInfo.songText,
        originalSelectionStart = event.target.selectionStart,
        textStart = text.slice(0, originalSelectionStart),
        textEnd = text.slice(originalSelectionStart);

      this.songInfo.songText = `${textStart}\t${textEnd}`;
      event.target.value = this.songInfo.songText;
      event.target.selectionEnd = event.target.selectionStart =
        originalSelectionStart + 1;
    },
    submitSong(event) {
      this.validateForm();
      if (!this.formIsValid) {
        return;
      }

      event.target.classList.toggle("loading");
      setTimeout(() => {
        event.target.classList.remove("loading");
        // api call
        event.target.classList.add("success");
      }, 1000);

      setTimeout(() => {
        event.target.classList.remove("success");
        const pushRoute = this.songInfo.isMySong ? "/my-songs" : "/songs";
        this.$router.push(pushRoute);
      }, 2500);

      if (this.songInfo.yt_link) {
        this.songInfo.yt_link = this.handleYTLink(this.songInfo.yt_link);
      }
    
      const formData = {
        ...this.songInfo,
        artist: this.artist.val,
        song: this.song.val,
        songId: this.songId,
        isFavorite: this.isFavorite,
      };
      // console.log(formData);

      //dispatch action from store addNewSong
      this.$store.dispatch("addNewSong", formData);
      this.isSaved = true;
      //router push koji je u timeoutu
    },
    checkCapo() {
      this.songInfo.capo = null;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;

      // if(!keys.first){
      //   this.formIsValid=false;
      //   this.firstKey.isValid=false;
      // }

      if (!this.artist.val || this.artist.val.length > 25) {
        this.formIsValid = false;
        this.artist.isValid = false;
      }

      if (!this.song.val || this.song.val.length > 45) {
        this.formIsValid = false;
        this.song.isValid = false;
      }
    },
    handleYTLink(link) {
      //https://www.youtube.com/embed/32GZ3suxRn4
      //https://www.youtube.com/32GZ3suxRn4

      // https://youtu.be/eeQzWRvp68Y
      // https://www.youtube.com/watch?v=eeQzWRvp68Y
      let linkArr=link.split(/[/=]+/)
      let id=linkArr[linkArr.length-1]
      // let id = link.split("https://www.youtube.com/watch?v=")[1];
      return `https://www.youtube.com/embed/${id}`;
    },
    searchSongInfo() {
      //api call to spotify
      this.$store.dispatch("apiForSongInfo", this.song.val);
    },
  },
  beforeRouteLeave(_, _2, next) {
    if ((this.song.val || this.artist.val) && !this.isSaved) {
      if (!window.confirm("Leave without saving?")) {
        return;
      }
    }
    next();
  },
  mounted() {
    const songId = this.$route.params.songId;
    this.songId = songId;

    if (songId) {
      const songData = this.$store.getters.getAllSongs.find((song) => {
        return song.songId == songId;
      });

      this.songInfo.songText = songData.songText;
      this.songInfo.practicedPrcntg = songData.practicedPrcntg;
      this.songInfo.bpm = songData.bpm;
      this.songInfo.capo = songData.capo;
      this.songInfo.electric = songData.electric;
      this.songInfo.acoustic = songData.acoustic;
      this.songInfo.firstProgression = songData.firstProgression;
      this.songInfo.chords_link = songData.chords_link;
      this.songInfo.yt_link = songData.yt_link;
      this.songInfo.firstKeyNotes = songData.firstKeyNotes;
      this.songInfo.tuning = songData.tuning;
      this.songInfo.isMySong = songData.isMySong;
      this.isFavorite = songData.isFavorite;
      this.haveCapo = !!songData.capo;
      this.artist.val = songData.artist;
      this.song.val = songData.song;
      this.songInfo.difficulty = songData.difficulty;
      this.songInfo.firstKey = songData.firstKey;

      if (songData.secondKey) {
        this.openSecond = true;
        this.songInfo.secondKey = songData.secondKey;
        this.songInfo.secondKeyNotes = songData.secondKeyNotes;
        this.songInfo.secondProgression = songData.secondProgression;
      }
    }
  },
};
</script>

<style scoped>
.form-container {
  /* background-color: #fff; */
  background-color: #f5f6fa;
  background-color: #eaebea;
  color: RGB(16, 17, 20);
  padding: 12px 15px;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 6px;
  font-family: Arial, sans-serif !important;
  font-size: 18px;

  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-left: 6px solid rgb(194, 42, 42);
  position: relative;
}
.top-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-top: 8px;
  gap: 26px;
  /* height: 90px; */
}
svg {
  font-size: 24px;
  transition: all 0.2s ease-in;
  filter: drop-shadow(1.5px 2px 2px rgb(0 0 0 / 0.3));
}
.top-section .heart {
  position: absolute;
  left: 20px;
  top: 33px;
  cursor: pointer;
}
.top-section .my-song {
  position: absolute;
  left: 65px;
  top: 33px;
  cursor: pointer;
  font-weight: 600;
}

.top-section .delete {
  cursor: pointer;
  color: RGB(16, 17, 20);
  /* margin-bottom: 28px; */
}

@media (max-width: 380px) {
  .delete {
    position: absolute;
    top: -40px;
  }
}

.top-section .delete:hover {
  color: black;
}

.is-favorite {
  color: #c22a2a;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
  margin-top: 18px;
  align-items: center;
}
.grid-2:nth-child(-n + 2) {
  margin-top: 0;
}
@media (min-width: 640px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
/* .grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
} */
.grid-2 .find-data {
  /* width: 50px; */
  color: rgb(136, 136, 136);
  /* justify-self: center; 
  align-self: center;*/
  text-align: center;
  cursor: pointer;
}
.grid-2 .find-data:hover {
  color: RGB(16, 17, 20);
}
.grid-2 > input,
.grid-2 > div {
  max-width: 500px;
}
form input:nth-child(-n + 2) {
  margin-top: 10px;
}

form .notebook,
form .input-field {
  border: 0;
  outline: 0;
  padding: 1em;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  display: inline-block; /*dodao umjesto block */
  width: 100%;
  margin-top: 1em;
  font-size: inherit;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  resize: none;
  color: RGB(16, 17, 20);
}
form .notebook{
  resize: vertical;
}
#input-bpm {
  width: 100px;
  justify-self: center;
}
#input-tuning {
  width: 200px;
  justify-self: center;
  padding: 14px;
}
.error-msg {
  border: #c22a2a solid 2px !important;
}
/* selectbox za key */
.secondOption {
  position: relative;
  display: flex;
  width: 100%;
  padding: 12px 6px;
  align-items: center;
  justify-content: flex-start;
  gap: 26px;
}
.secondOption svg {
  cursor: pointer;
}
/* chips */
input[type="checkbox"],
input[type="radio"] {
  display: none;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
  transition: all 500ms ease;
  cursor: pointer;
  border-radius: 50px;
  background-color: #fff;
  padding: 10px 16px;
  margin-right: 7px;
  border: none;
  display: inline-block;
  user-select: none;
  text-transform: capitalize;
  word-wrap: none;
  white-space: nowrap;
  margin-top: 18px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
input[type="checkbox"]:checked + label,
input[type="radio"]:checked + label {
  transition: all 500ms ease;
  background-color: #c22a2a;
  color: #fff;
}
.my-song {
  display: flex;
  align-items: center;
  user-select: none;
  margin-top: 6px;
  position: relative;
}
.my-song label:hover,
#my-song:hover {
  cursor: pointer;
}

#my-song {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 2px;
  margin-top: 0;
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

/* .fade-leave-from,
.fade-enter-to {
  opacity: 1
} */

.range-slider {
  width: 100%;
  text-align: center;
}

.range-slider__range {
  -webkit-appearance: none;
  width: calc(100% - (73px));
  height: 10px;
  border-radius: 5px;
  background: #fff;
  outline: none;
  padding: 0;
  margin: 0;
}
.range-slider__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: RGB(16, 17, 20);
  background: #2c3e50;
  cursor: pointer;
  -webkit-transition: background 0.15s ease-in-out;
  transition: background 0.15s ease-in-out;
}

.range-slider__range::-webkit-slider-thumb:hover {
  background: rgb(194, 42, 42);
}
.range-slider__range:active::-webkit-slider-thumb {
  background: rgb(194, 42, 42);
}
.range-slider__range::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border: 0;
  border-radius: 50%;
  background: #2c3e50;
  cursor: pointer;
  -moz-transition: background 0.15s ease-in-out;
  transition: background 0.15s ease-in-out;
}
.range-slider__range::-moz-range-thumb:hover {
  background: #1abc9c;
}
.range-slider__range:active::-moz-range-thumb {
  background: #1abc9c;
}

.range-slider__value {
  display: inline-block;
  position: relative;
  width: 60px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: #2c3e50;
  padding: 5px 10px;
  margin-left: 8px;
}
.range-slider__value:after {
  position: absolute;
  top: 8px;
  left: -7px;
  width: 0;
  height: 0;
  border-top: 7px solid transparent;
  border-right: 7px solid #2c3e50;
  border-bottom: 7px solid transparent;
  content: "";
}

::-moz-range-track {
  background: #d7dcdf;
  border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}

.go-back {
  position: absolute;
  left: 5px;
  top: -50px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}
.go-back:hover {
  background-color: #f1f1f1;
}
</style>