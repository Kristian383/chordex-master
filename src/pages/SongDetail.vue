<template>
  <base-card>
    <div class="song-detail" v-if="songData">
      <div class="box song-info">
        <div class="top-icons">
          <div class="go-back">
            <router-link :to="songData.isMySong ? '/my-songs' : '/songs'">
              <font-awesome-icon icon="arrow-left"></font-awesome-icon>
            </router-link>
          </div>
          <div class="middle-icons">
            <font-awesome-icon
              :icon="iconName"
              :class="{ 'is-favorite': isFavorite }"
              @click="ToggleFavorite"
            ></font-awesome-icon>
            <font-awesome-icon
              icon="edit"
              @click="openEdit"
              class="edit"
            ></font-awesome-icon>
            <font-awesome-icon
              icon="trash-alt"
              class="delete"
              @click="deleteSong"
            ></font-awesome-icon>
          </div>
        </div>
        <!--  -->
        <div>
          <div><b>Artist:</b> {{ songData.artist }}</div>
          <!-- <label for="artist">Artist:</label>
            <span>RHCP</span> -->

          <!-- <input type="text" /> -->
          <div class="song-info-box">
            <b>Learned:</b> {{ songData.practicedPrcntg }}%
          </div>
        </div>
        <!--  -->
        <div>
          <div class="song-name"><b>Song:</b> {{ songData.songName }}</div>
          <!-- <label for="song">Song:</label> -->
          <!-- <input type="text" /> -->

          <div class="song-info-box" v-if="songData.bpm">
            <b> BPM:</b> {{ songData.bpm }}
            <font-awesome-icon
              class="metronome"
              icon="play-circle"
            ></font-awesome-icon>
          </div>
        </div>
        <!-- ovdje mora ici vfor ako ima 2 keya -->
        <div v-if="songData.firstKey">
          <div class="key"><b>Key:</b> {{ songData.firstKey }}</div>
          <div class="chords">
            <b>Chords in scale:</b> {{ songData.firstKeyNotes }}
          </div>
          <div class="guitar" v-if="songData.firstChordProgression">
            <b>Chord progression:</b> {{ songData.firstChordProgression }}
          </div>
        </div>
        <div v-if="songData.secondKey">
          <div class="key"><b>Key Change:</b> {{ songData.secondKey }}</div>
          <div class="chords">
            <b>Chords in scale:</b> {{ songData.secondKeyNotes }}
          </div>
          <div class="guitar" v-if="songData.secondChordProgression">
            <b>Chord progression:</b> {{ songData.secondChordProgression }}
          </div>
        </div>
        <!--  -->
        <div>
          <div class="capo" v-if="songData.capo">
            <b>Capo:</b> {{ songData.capo ? songData.capo : "No" }}
          </div>
          <div class="tuning">
            <b>Tuning:</b> {{ songData.tuning ? songData.tuning : "Standard" }}
          </div>

          <div class="guitar" v-if="songData.acoustic || songData.electric">
            <b>Guitar type:</b> {{ songData.acoustic ? "Acoustic" : "" }}
            {{ songData.electric ? "Eletric" : "" }}
          </div>
        </div>
        <!--  -->
        <div>
          <!-- <div class="genre">Genre: Rock</div> -->
          <!-- <div class="link" v-if="songData.yt_link">
            <b>Link: </b>
            <a :href="songData.yt_link" target="_blank"
              >{{ songData.yt_link }}
            </a>
          </div> -->
          <div class="link" v-if="songData.chordsWebsiteLink">
            <b>Resource Link: </b>
            <a :href="songData.chordsWebsiteLink" target="_blank"
              >{{ songData.chordsWebsiteLink }}
            </a>
          </div>
        </div>
        <div v-if="songData.difficulty">
          <div><b>Difficulty:</b> {{ songData.difficulty }}</div>
        </div>
      </div>
      <div class="box video" v-if="songData && songData.ytLink">
        <iframe
          :src="songData.ytLink"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div class="box notebook">
        <hr />
        <br />
        <pre>{{ songData.songText }}</pre>
      </div>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";

export default {
  name: "SongDetail",
  components: {
    BaseCard,
  },
  props: ["songId"],
  data() {
    return {
      id: null,
      isFavorite: null,
      songData: null,
      isMy: null,
    };
  },
  mounted() {
    // this.id = this.$route.params.songId;
    //iz rutera prop
    this.id = this.songId;
    let songData = this.$store.getters.getAllSongs.find((song) => {
      return song.songId == this.id;
    });
    // console.log("ucitano",songData);

    if (songData) {
      this.songData = songData;
      this.isFavorite = songData.isFavorite;
      //pass song name for title of page
      this.$store.commit("setSongDetailTitle", songData.songName);
    } else {
      this.$router.push("notFound");
    }
  },
  methods: {
    ToggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$store.commit("toggleFavorite", { songId: this.id });
    },
    openEdit() {
      this.$router.push("/new/" + this.songId);
    },
    deleteSong() {
      if (window.confirm("Are you sure?")) {
        const payload = {
          songName: this.songData.songName,
          artist: this.songData.artist,
          songId:this.songData.songId
        };
        this.$store.dispatch("deleteSong", payload).then(() => {
           this.$router.push(this.songData.isMySong ? "/my-songs" : "/songs");
        });
      }
    },
  },
  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
    displayAccordingToYT() {
      if (this.songData.yt_link) {
        return "1fr";
      } else {
        return "1fr 1fr";
      }
    },
  },
};
</script>

<style scoped>
.song-detail {
  /* min-height: 95vh; */
  background-color: var(--white);
  color: var(--font_black);

  /* background-color: #0D1117; 
  color: #c9d1d9; */
  /* padding: 8px; */
  padding: 12px 15px;
  display: grid;
  gap: 10px;
  position: relative;
  grid-template-columns: 1fr;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 6px;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 18px;
  border-right: 6px solid var(--burgundy);
  /* border: solid 2px black;
  position: relative;  */
  /* font-size: 21px; */
}

.box {
  border-radius: 0 0 6px 6px;

  width: 240px;
  /* margin: auto; */
  justify-self: center;
  /* background-color: #ccc; */
}
.box.notebook {
  font-weight: 400;
  line-height: 1.5em;
  order: 3;
}
.box.video {
  text-align: center;
  order: 1;
}
.box.video iframe {
  width: 230px;
}

@media (min-width: 600px) {
  .box {
    width: 400px;
  }
  .box.video iframe {
    width: 100%;
    height: 300px;
  }
}
@media (min-width: 770px) {
  .song-info {
    /* width: 600px; */
    /* margin: auto; */
    order: 2;
    overflow: hidden;
  }
  .box.song-info,
  .box.video {
    width: 600px;
    /* margin: auto; */
    min-height: 400px;
  }
  .box.video iframe {
    height: 100%;
    /* width: 560px; */
  }
  .box.notebook {
    width: 100%;
  }
}
@media (min-width: 1400px) {
  .song-detail {
    grid-template-columns: displayAccordingToYT;
  }
  .box.notebook {
    grid-column: 1/3;
  }
  .song-info {
    margin: auto;
    order: 1;
  }
  .box.video {
    order: 2;
  }
}

.song-info-box {
  display: flex;
  gap: 15px;
  align-items: center;
}
.song-info > div {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  margin: 0 auto;
  padding-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
}
svg {
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 28px;

  filter: drop-shadow(1.5px 2px 2px rgb(0 0 0 / 0.3));
}

.go-back {
  position: absolute;
  left: -5px;
  top: -50px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
@media (min-width: 720px) {
  .go-back {
    left: 15px;
  }
}
.go-back a {
  text-decoration: none;
  color: var(--font_black);
}
.go-back:hover {
  background-color: #f1f1f1;
}

.is-favorite {
  color: #c22a2a;
}
.middle-icons {
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 600px;
  outline: none;
  color: var(--dark_gray_chips);
}
.middle-icons .delete {
  position: absolute;
  right: 0;
}
.middle-icons .edit {
  position: absolute;
  right: 40px;
}
.middle-icons .delete:hover,
.middle-icons .edit:hover {
  color: var(--font_black);
}

.link {
  word-break: break-all;
}
</style>