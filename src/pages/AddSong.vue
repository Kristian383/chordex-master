<template>
  <base-card>
    <div class="form-container">
      <!-- yt modal -->
      <transition name="fade">
        <how-to-modal
          v-if="showYtModal"
          @close-modal="closeYtModal"
        ></how-to-modal>
      </transition>
      <!--  -->
      <div class="go-back" @click="goBack">
        <font-awesome-icon icon="arrow-left"></font-awesome-icon>
      </div>
      <form @submit.prevent autocomplete="off">
        <div class="error-container" v-if="errorMsg">
          <p class="error-text">
            {{ errorMsg }}
          </p>
        </div>
        <div class="top-section">
          <font-awesome-icon
            class="heart"
            :icon="iconName"
            :class="{ 'is-favorite': isFavorite }"
            @click.prevent="toggleFavorite"
          ></font-awesome-icon>
          <!-- my song checkbox  -->
          <div class="mysong">
            <template v-if="!songId">
              <input
                type="checkbox"
                name="my-song"
                id="my-song"
                v-model="songInfo.isMySong"
                @click="setArtist"
              /><label for="my-song">My song</label>
            </template>
            <!-- <label for="my-song">My Song</label> -->
          </div>
          <!--  -->
          <font-awesome-icon
            @click="deleteSong"
            class="delete"
            icon="trash-alt"
          ></font-awesome-icon>

          <button-save name="Save" @click="submitSong"></button-save>
        </div>

        <div class="grid-2">
          <!-- artist name -->
          <input
            class="input-field"
            type="text"
            id="input-artist"
            placeholder="Artist name"
            :disabled="songInfo.isMySong || songId"
            v-model.trim="artist.val"
            :class="{ 'error-msg': !artist.isValid }"
            @focus="clearValidity('artist')"
          />
          <!-- song name -->
          <input
            class="input-field"
            type="text"
            id="input-song"
            placeholder="Song name"
            :class="{ 'error-msg': !song.isValid }"
            @focus="clearValidity('song')"
            v-model.trim="song.val"
          />
          <!-- spotify api and bpm -->
          <div class="grid-2">
            <div
              class="find-data"
              @click="searchSongInfo"
              v-if="!songInfo.isMySong"
            >
              <!-- Not found anything -->
              {{ getSongInfoTxt }}
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

          <!-- easy hard and tuning badges -->
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
          <!-- first key -->
          <div class="grid-2">
            <select-box-key
              @key-selected="insertKey"
              name="firstKey"
              :spotify-key="getSpotifyKey"
            ></select-box-key>
            {{ songInfo.firstKeyNotes }}
          </div>
          <!-- second key -->
          <div class="grid-2">
            <transition name="fade">
              <select-box-key
                name="secondKey"
                @key-selected="insertKey"
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
          <!-- first key Chord progression-->
          <input
            class="input-field"
            type="text"
            placeholder="First chord progression"
            v-model.trim="songInfo.firstChordProgression"
          />
          <!-- second key Chord progression-->
          <transition name="fade">
            <input
              class="input-field"
              type="text"
              v-if="openSecond"
              placeholder="Second chord progression"
              v-model.trim="songInfo.secondChordProgression"
            />
          </transition>
          <!-- guitar types -->
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
          <!-- yt link -->
          <div class="yt">
            <input
              v-model.trim="songInfo.ytLink"
              class="input-field"
              type="text"
              placeholder="YouTube Link: https://www.youtube.com/..."
            />
            <span class="yt_questionmark" @click="displayYtModal"
              ><font-awesome-icon icon="question-circle"></font-awesome-icon
            ></span>
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
            class="notebook"
            v-model="songInfo.songText"
            id="txt_area"
            name=""
            rows="20"
            placeholder="Notes about this song..."
            @keydown.tab.prevent="tabber($event)"
          ></textarea>
        </div>
      </form>
    </div>
  </base-card>
</template>

<script>
// import BaseCard from "../components/ui/BaseCard.vue";
import ButtonSave from "../components/ui/ButtonSave.vue";
import SelectBoxKey from "../components/ui/SelectBoxKey.vue";
import HowToModal from "../components/ui/HowToModal.vue";
export default {
  components: {
    // BaseCard,
    SelectBoxKey,
    ButtonSave,
    HowToModal,
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
        firstKey: null,
        firstChordProgression: "",
        secondKey: null,
        secondChordProgression: "",
        chordsWebsiteLink: "",
        ytLink: "",
        firstKeyNotes: null,
        secondKeyNotes: null,
        tuning: null,
        isMySong: false,
        difficulty: "medium",
        lastViewed: null,
        imgUrl: "",
      },
      haveCapo: null,
      artist: {
        val: "",
        isValid: true,
      },
      song: {
        val: "",
        isValid: true,
      },
      getSongInfoTxt: "Try to get song info",
      showYtModal: false,
      errorMsg: "",
    };
  },

  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
    getUsername() {
      return this.$store.getters.user.username;
    },
    getSpotifyKey() {
      return this.songInfo.firstKey;
    },
  },
  methods: {
    deleteSong() {
      if (window.confirm("Are you sure?")) {
        const payload = {
          songName: this.song.val,
          artist: this.artist.val,
          songId: +this.songId,
        };
        this.$store.dispatch("deleteSong", payload).then(() => {
          this.$router.push(
            this.songInfo.isMySong ? "/songs?isMySong=True" : "/songs"
          );
        });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
    },
    insertKey(data) {
      // if(!data){
      //   this.songInfo.firstKey = null;
      //   this.songInfo.firstKeyNotes = null;
      // }
      if (data.name == "firstKey") {
        this.openSecond = true;
        this.songInfo.firstKey = data.key;
        this.songInfo.firstKeyNotes = data.notes;
      } else {
        this.songInfo.secondKey = data.key;
        this.songInfo.secondKeyNotes = data.notes;
      }
    },
    removeSecondKeySelect() {
      this.openSecond = false;
      this.songInfo.secondKey = null;
      this.songInfo.secondKeyNotes = null;
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
    async submitSong(event) {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      event.target.classList.toggle("loading");

      if (this.songInfo.ytLink) {
        this.songInfo.ytLink = this.handleYTLink(this.songInfo.ytLink);
      }

      const formData = {
        ...this.songInfo,
        artist: this.artist.val,
        songName: this.song.val,
        songId: +this.songId,
        isFavorite: this.isFavorite,
      };

      this.$store.dispatch("addNewSong", formData).then((res) => {
        event.target.classList.remove("loading");

        if (res != false) {
          // let pushRoute = this.songInfo.isMySong
          //   ? "/songs?isMySong=True"
          //   : "/songs";
          let pushRoute = this.songInfo.isMySong
            ? `/songs/${res}?isMySong=True`
            : `/songs/${res}`;
          // event.target.classList.add("success");
          // event.target.classList.remove("success");
          this.$router.push(pushRoute);
          //update artists if there isnt any in app
          let index = this.$store.getters.getArtists.findIndex(
            (artist) =>
              artist.name.toLowerCase() == formData.artist.toLowerCase()
          );
          if (index == -1) {
            this.$store.dispatch("loadAllArtists");
          }
        } else {
          this.formIsValid = false;
          this.song.isValid = false;
          this.errorMsg =
            "Something went wrong. Check if you already have that song or if you have reached maximum number of songs (40).";
        }
      });
    },
    checkCapo() {
      this.songInfo.capo = null;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      this.errorMsg = "";
      if (!this.artist.val || this.artist.val.length > 40) {
        this.formIsValid = false;
        this.artist.isValid = false;
        this.errorMsg =
          "Please check if your artist has less than 40 characters. Yours: " +
          this.artist.val.length;
        return;
      }

      if (!this.song.val || this.song.val.length > 40) {
        this.formIsValid = false;
        this.song.isValid = false;
        this.errorMsg =
          "Please check if your song has less than 40 characters. Yours: " +
          this.song.val.length;
        return;
      }
      //
      if (this.songInfo.bpm == "" || typeof this.songInfo.bpm == "string") {
        this.songInfo.bpm = null;
      }
      if (this.songInfo.bpm < 0 || this.songInfo.bpm > 300) {
        this.formIsValid = false;
        this.errorMsg =
          "Please check if BPM > 0 and < 300. Yours: " + this.songInfo.bpm;
        return;
      }
      if (
        this.songInfo.secondChordProgression.length > 100 ||
        this.songInfo.firstChordProgression.length > 100
      ) {
        this.formIsValid = false;
        this.errorMsg =
          "Please check if chord progressions have less than 100 characters. First: " +
          this.songInfo.firstChordProgression.length +
          " Second: " +
          this.songInfo.secondChordProgression.length;
        return;
      }
      if (this.songInfo.songText.length > 3500) {
        this.errorMsg =
          "Please check if the notes about song have less than 3500 chars. Yours: " +
          this.songInfo.songText.length;
        this.formIsValid = false;

        return;
      }
      if (
        this.songInfo.chordsWebsiteLink.length > 150 ||
        this.songInfo.ytLink.length > 150
      ) {
        this.formIsValid = false;
        this.errorMsg =
          "Please check if Youtube or Chord website links have less than 150 chars. Yours YT: " +
          this.songInfo.ytLink.length +
          " Chord website: " +
          this.songInfo.chordsWebsiteLink.length;

        return;
      }
      if (typeof this.songInfo.capo == "string" || this.songInfo.capo == "") {
        this.songInfo.capo = null;
      }
      if (this.songInfo.capo > 20 || this.songInfo.capo < 0) {
        this.formIsValid = false;
        this.errorMsg = "Capo seems to be wrongly inserted.";
        return;
      }
    },
    displayYtModal() {
      this.showYtModal = true;
    },
    closeYtModal() {
      this.showYtModal = false;
    },
    handleYTLink(link) {
      let linkArr = link.split(/[/=]+/);
      let id = linkArr[linkArr.length - 1];
      //console.log(id);
      // let id = link.split("https://www.youtube.com/watch?v=")[1];
      return `https://www.youtube.com/embed/${id}`;
    },
    setArtist(e) {
      if (e.target.checked) {
        this.artist.val = this.getUsername;
      } else {
        this.artist.val = "";
      }
    },

    searchSongInfo() {
      //api call to spotify

      if (
        !this.song.val ||
        !this.artist.val ||
        this.getSongInfoTxt == "Searching for song..."
      ) {
        this.getSongInfoTxt = "Please insert song and artist.";
        setTimeout(() => {
          this.getSongInfoTxt = "Try to get song info";
        }, 2000);
        return;
      }
      const payload = {
        songName: this.song.val,
        artist: this.artist.val,
      };
      this.getSongInfoTxt = "Searching for song...";
      this.$store.dispatch("apiForSongInfo", payload).then((res) => {
        // console.log("response from spotify", res);

        if (!res) {
          this.getSongInfoTxt = "Couldn't find anything.";
        } else {
          this.songInfo.firstKey = res.key;
          this.artist.val = res.artist;
          this.song.val = res.songName;
          this.songInfo.bpm = res.bpm;
          this.songInfo.imgUrl = res.imgUrl;
          this.getSongInfoTxt = "Successfuly fetched info!";
        }
        setTimeout(() => {
          this.getSongInfoTxt = "Try to get song info";
        }, 2000);
      });
    },
  },
  mounted() {
    const songId = this.$route.params.songId;
    this.songId = songId;
    let mysong = false;
    if (this.$route.query.isMySong) {
      {
        mysong = true;
      }
    }

    let songData;
    if (songId) {
      if (mysong) {
        songData = this.$store.getters.getAllMySongs.find((song) => {
          return song.songId == songId;
        });
      } else {
        songData = this.$store.getters.getAllSongs.find((song) => {
          return song.songId == songId;
        });
      }

      if (!songData) {
        this.$router.push("/songs");
        return;
      }

      this.songInfo.songText = songData.songText;
      this.songInfo.practicedPrcntg = songData.practicedPrcntg;
      this.songInfo.bpm = songData.bpm;
      this.songInfo.capo = songData.capo;
      this.songInfo.electric = songData.electric;
      this.songInfo.acoustic = songData.acoustic;
      this.songInfo.firstChordProgression = songData.firstChordProgression;
      this.songInfo.chordsWebsiteLink = songData.chordsWebsiteLink;
      this.songInfo.ytLink = songData.ytLink;
      this.songInfo.firstKeyNotes = songData.firstKeyNotes;
      this.songInfo.tuning = songData.tuning;
      this.songInfo.isMySong = songData.isMySong;
      this.isFavorite = songData.isFavorite;
      this.haveCapo = !!songData.capo;
      this.artist.val = songData.artist;
      this.song.val = songData.songName;
      this.songInfo.difficulty = songData.difficulty;
      this.songInfo.firstKey = songData.firstKey;
      this.songInfo.lastViewed = songData.lastViewed;
      this.songInfo.imgUrl = songData.imgUrl;

      if (songData.secondKey) {
        this.openSecond = true;
        this.songInfo.secondKey = songData.secondKey;
        this.songInfo.secondKeyNotes = songData.secondKeyNotes;
        this.songInfo.secondChordProgression = songData.secondChordProgression;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  background-color: #eaebea;
  color: RGB(16, 17, 20);
  padding: 12px 15px;
  max-width: 1100px;
  margin: 0 auto;
  border-radius: 6px;
  font-size: 18px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-left: 6px solid var(--burgundy);
  position: relative;

  /* error msg */
  .error-container {
    position: relative;
    border-radius: 8px;
    z-index: 23;

    .error-text {
      color: var(--burgundy);
      font-size: 14px;
      text-align: center;
      border-radius: 8px;
      background-color: var(--burgundy);
      color: #fff;
      padding: 16px;
      margin-top: 6px;
    }
  }

  .top-section {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-top: 8px;
    gap: 26px;

    .is-favorite {
      color: var(--burgundy);
    }

    .heart {
      position: absolute;
      left: 20px;
      top: 33px;
      cursor: pointer;
    }

    .mysong {
      position: absolute;
      left: 50px;
      top: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .delete {
      cursor: pointer;
      color: RGB(16, 17, 20);

      &:hover {
        color: black;
      }

      @media (max-width: 380px) {
        position: absolute;
        top: -40px;
      }
    }
  }
  // fontawesome icons
  svg {
    font-size: 24px;
    transition: all 0.2s ease-in;
    filter: drop-shadow(1.5px 2px 2px rgb(0 0 0 / 0.3));
  }
}

@media (min-width: 420px) {
  .top-section {
    gap: 35px;
  }

  .top-section .mysong {
    left: 75px;
  }
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 8px;
  margin-top: 18px;
  align-items: center;

  &:nth-child(-n + 2) {
    margin-top: 0;
  }

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .find-data {
    color: rgb(136, 136, 136);
    text-align: center;
    cursor: pointer;

    &:hover {
      color: RGB(16, 17, 20);
    }
  }
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
  display: inline-block;
  width: 100%;
  margin-top: 1em;
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
}

form .notebook {
  resize: vertical;
  line-height: 31px;
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

/* selectbox for key */
.secondOption {
  position: relative;
  display: flex;
  width: 100%;
  padding: 12px 6px;
  align-items: center;
  justify-content: flex-start;
  gap: 26px;

  svg {
    cursor: pointer;
  }
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
  background-color: var(--dark_gray_font);
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

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
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
    width: 20px;
    height: 20px;
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
  width: 60px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: var(--dark_gray_font);
  padding: 5px 10px;
  margin-left: 8px;

  &:after {
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
}

::-moz-range-track {
  background: #d7dcdf;
  border: 0;
}
input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}

/* yt  */
.yt {
  position: relative;
}
.yt_questionmark {
  position: absolute;
  top: 60%;
  left: 90%;
  transform: translate(0, -50%);
  cursor: pointer;

  width: 24px;
  height: 24px;
}
.yt input {
  padding-right: 35px;
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

  &:hover {
    background-color: var(--f1_gray);
  }
}
</style>