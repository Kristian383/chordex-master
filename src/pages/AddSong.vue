<template>
  <base-card>
    <div class="form-container">
      <form @submit.prevent>
        <div class="top-section">
          <font-awesome-icon
            class="heart"
            :icon="iconName"
            :class="{ 'is-favorite': isFavorite }"
            @click.prevent="toggleFavorite"
          ></font-awesome-icon>

          <font-awesome-icon
            class="delete"
            icon="trash-alt"
          ></font-awesome-icon>
          <div class="button-container">
            <button class="btn" @click="submitSong"></button>
          </div>
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
            <div class="find-data">
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
              type="radio"
              name="radio"
              id="easy"
              v-model="easy"
            /><label for="easy">Easy</label>
            <input
              type="radio"
              name="radio"
              id="medium"
              v-model="medium"
            /><label for="medium">Medium</label>
            <input
              type="radio"
              name="radio"
              id="hard"
              v-model="hard"
            /><label for="hard">Hard</label>
          </div>
          <!--  -->
          <div class="grid-2">
            <select-box-key
              @checkStore="needSecondKey = true"
              name="firstKey"
            ></select-box-key>
            A B C D E F H
          </div>
          <div class="grid-2">
            <transition name="fade">
              <select-box-key
                name="secondKey"
                v-if="needSecondKey && getSelectedKeys.first"
              ></select-box-key>
            </transition>
            <transition name="fade">
              <div class="secondOption" v-if="needSecondKey">
                Second opetion keys
                <font-awesome-icon
                  @click="removeKeySelect"
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
              v-if="needSecondKey"
              placeholder="Chord progression"
              v-model.trim="songInfo.secondProgression"
            />
          </transition>
          <!--  -->

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
          slider
          <!--  -->
          <input
            v-model.trim="songInfo.yt_link"
            class="input-field"
            type="text"
            placeholder="YouTube Link"
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
        <div class="notebook">
          <textarea
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
import SelectBoxKey from "../components/ui/SelectBoxKey.vue";
export default {
  components: {
    BaseCard,
    SelectBoxKey,
  },
  data() {
    return {
      isFavorite: null,
      needSecondKey: false,
      formIsValid: false,
      songInfo: {
        // artist: "",
        // songName: "",
        // firstKey: null,
        // secondKey:null,
        songText: "",
        practicedPrcntg: 0,
        bpm: null,
        capo: null,
        electric: false,
        acoustic: null,
        firstProgression: null,
        secondProgression: null,
        chords_link: null,
        yt_link: null,
        firstKeyNotes:null,
        secondKeyNotes:null,
      },
      haveCapo: null,
      easy: null,
      medium: null,
      hard: null,
      artist: {
        val: null,
        isValid: true,
      },
      song: {
        val: null,
        isValid: true,
      },
    };
  },

  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
    getSelectedKeys() {
      return this.$store.getters.selectedKeys;
    },
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    removeKeySelect() {
      this.$store.commit("removeSecondKey");
      this.needSecondKey = false;
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
      }, 2500);

      setTimeout(() => {
        event.target.classList.remove("success");
      }, 3500);

      const keys = this.getSelectedKeys;

      let difficulty;
      if (this.songInfo.easy == "on") {
        difficulty = "easy";
      } else if (this.songInfo.medium == "on") {
        difficulty = "medium";
      } else {
        difficulty = "hard";
      }
      const formData = {
        ...this.songInfo,
        artist: this.artist.val,
        song: this.song.val,
        firstKey: keys.first,
        secondKey: keys.second,
        difficulty: difficulty,
        isFavorite:this.isFavorite
      };
      console.log(formData);

      //dispatch action from store addNewSong
      this.$store.dispatch("addNewSong", formData);
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

      if (!this.song.val || this.song.val.length > 25) {
        this.formIsValid = false;
        this.song.isValid = false;
      }
    },
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

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
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
}
.top-section .heart {
  position: absolute;
  left: 25px;
  top: 33px;
  cursor: pointer;
}

.top-section .delete {
  cursor: pointer;
  color: rgb(136, 136, 136);
  /* margin-bottom: 28px; */
}
.top-section .delete:hover {
  color: black;
}
/* button */
.button-container {
  position: relative;
  width: 100px;
  height: 50px;
}
.button-container button {
  position: relative;
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  /* color: rgb(136, 136, 136); */
  color: RGB(16, 17, 20);
  border-radius: 3px;
  outline: none;
  border: none;
  background-color: #fff;
  border: 2px solid RGB(16, 17, 20);
  border-radius: 100px;
}
.button-container button:before {
  content: "Save";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 21px;
}
.button-container button:hover {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4),
    0 5px 10px -1px rgba(51, 51, 51, 0.3);
}
.button-container button.loading:hover,
.button-container button.success:hover {
  box-shadow: none;
}
.button-container button.loading {
  pointer-events: none;
  width: 50px;
  border-radius: 50%;
}
.button-container button.loading:before {
  opacity: 0.75;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45);
  border-top: 3px solid rgb(136, 136, 136);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  -webkit-animation: spin 0.25s linear infinite;
  animation: spin 0.25s linear infinite;
}
.button-container button.success {
  pointer-events: none;
  background-color: #6fc982;
  width: 50px;
  border-radius: 50%;
  color: #fff;
  font-size: inherit;
  -webkit-animation: pop 260ms forwards 1;
  animation: pop 260ms forwards 1;
}
.button-container button.success:before {
  opacity: 0.75;
  font-size: inherit;
  text-rendering: auto;
  content: "\2713";
  -webkit-font-smoothing: antialiased;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@-webkit-keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@keyframes spin {
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
@-webkit-keyframes pop {
  0% {
    transform: scale(0);
  }
  85% {
    transform: scale(1.2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: none;
  }
}
@keyframes pop {
  0% {
    transform: scale(0);
  }
  85% {
    transform: scale(1.2);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: none;
  }
}

.is-favorite {
  color: #c22a2a;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 18px;
  align-items: center;
}
.grid-2:nth-child(-n + 2) {
  margin-top: 0;
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

form textarea,
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

#input-bpm {
  width: 100px;
  justify-self: center;
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
  justify-content: space-evenly;
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
}
input[type="checkbox"]:checked + label,
input[type="radio"]:checked + label {
  transition: all 500ms ease;
  background-color: #c22a2a;
  color: #fff;
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
</style>