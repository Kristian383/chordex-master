<template>
  <base-card>
    <div class="song-detail" v-if="songData">
      <div class="box song-info">
        <div class="top-icons">
          <div class="go-back" @click="goBack">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="middle-icons">
            <font-awesome-icon
              :icon="favoriteIconName"
              style="pointer-events: none"
              :class="{ 'is-favorite': isFavorite }"
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
        <!-- Artist and learned-->
        <div>
          <div class="artist-link">
            <b>Artist: </b>
            <router-link
              :to="{ path: '/songs', query: { artist: songData.artist } }"
              >{{ songData.artist }}
            </router-link>
          </div>
          <div class="song-info-box">
            <b>Learned:</b> {{ songData.practicedPrcntg }}%
          </div>
        </div>
        <!-- Song and bpm -->
        <div>
          <div class="song-name"><b>Song:</b> {{ songData.songName }}</div>
          <div class="song-info-box" v-if="songData.bpm">
            <b> BPM:</b> {{ songData.bpm }}
          </div>
        </div>
        <!-- keys -->
        <div v-if="songData.firstKey">
          <div class="key"><b>Key:</b> {{ songData.firstKey }}</div>
          <div class="chords">
            <b>Chords in key:</b> {{ songData.firstKeyNotes }}
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
        <!-- capo  tuning guitar-->
        <div>
          <div class="capo" v-if="songData.capo">
            <b>Capo:</b> {{ songData.capo }}
          </div>
          <div class="tuning">
            <b>Tuning:</b> {{ songData.tuning ? songData.tuning : "Standard" }}
          </div>

          <div class="guitar" v-if="songData.acoustic || songData.electric">
            <b>Guitar type:</b> {{ songData.acoustic ? "Acoustic" : "" }}
            {{ songData.electric ? "Eletric" : "" }}
          </div>
        </div>
        <!-- chordsWebsiteLink -->
        <div>
          <div class="link" v-if="songData.chordsWebsiteLink">
            <b>Website Link: </b>
            <a :href="songData.chordsWebsiteLink" target="_blank"> Click me </a>
          </div>
        </div>
        <!-- difficulty -->
        <div v-if="songData.difficulty">
          <div><b>Difficulty:</b> {{ songData.difficulty }}</div>
        </div>
      </div>
      <!-- yt video  -->
      <div class="box video">
        <iframe
          v-if="songData.ytLink"
          :src="songData.ytLink"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>

        <img v-else :src="songData.imgUrl || imgUrl" alt="" />
      </div>

      <div class="box notebook">
        <hr v-if="songData.songText" />
        <br />
        <pre>{{ songData.songText }}</pre>
      </div>
      <!--  -->
    </div>
  </base-card>
</template>

<script>
import { ref, toRefs, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "SongDetail",
  props: ["songId"],
  setup(props) {
    const { songId } = toRefs(props);
    const songData = ref(null);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const isFavorite = ref(null);

    onMounted(() => {
      if (route.query.isMySong) {
        songData.value = store.getters.getAllMySongs.find((song) => {
          return song.songId == songId.value;
        });
      } else {
        songData.value = store.getters.getAllSongs.find((song) => {
          return song.songId == songId.value;
        });
      }
      if (songData.value) {
        isFavorite.value = songData.value.isFavorite;
        store.commit("setSongDetailTitle", songData.value.songName);
      } else {
        router.push("/songs");
      }
    });

    function goBack() {
      router.go(-1);
    }

    function openEdit() {
      let song = store.getters.findSong(songId.value);
      const pushRoute = song.isMySong
        ? `/new/${song.songId}?isMySong=True`
        : `/new/${song.songId}`;
      router.push(pushRoute);
    }

    function deleteSong() {
      if (window.confirm("Are you sure?")) {
        const payload = {
          songName: songData.value.songName,
          artist: songData.value.artist,
          songId: songData.value.songId,
        };
        store.dispatch("deleteSong", payload).then(() => {
          router.push(
            songData.value.isMySong ? "/songs?isMySong=True" : "/songs"
          );
        });
      }
    }

    const favoriteIconName = computed(() => {
      if (!isFavorite.value) {
        return ["far", "heart"];
      }
      return "heart";
    });

    const displayAccordingToYT = computed(() => {
      if (songData.value.yt_link) {
        return "1fr";
      } else {
        return "1fr 1fr";
      }
    });

    const imgUrl = computed(() => {
      return require("@/assets/music.png");
    });

    return {
      goBack,
      openEdit,
      deleteSong,
      favoriteIconName,
      displayAccordingToYT,
      imgUrl,
      songData,
      isFavorite,
    };
  },
};
</script>

<style scoped>
.song-detail {
  background-color: var(--white);
  color: var(--font_black);
  padding: 12px 15px;
  display: grid;
  gap: 10px;
  position: relative;
  grid-template-columns: 1fr;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  font-size: 18px;
  border-right: 6px solid var(--burgundy);
}
.artist-link a {
  color: inherit;
  font-weight: 600;
}
.artist-link a:hover {
  color: var(--mid_gray);
}

.box {
  border-radius: 0 0 6px 6px;
  width: 240px;
  justify-self: center;
}
.box.notebook {
  font-weight: 400;
  line-height: 31px;
  order: 3;
  padding-bottom: 52px;
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
    order: 2;
    overflow: hidden;
  }
  .box.song-info,
  .box.video {
    width: 600px;
    min-height: 400px;
  }
  .box.video iframe {
    height: 100%;
  }
  .box.notebook {
    width: 100%;
  }
}
.box.video img {
  height: 100%;
  max-height: 400px;
  max-width: 100%;
}
@media (min-width: 1500px) {
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
  top: 0px;
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
    top: -50px;
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
  padding: 0px 18px;
}

@media (min-width: 720px) {
  .middle-icons {
    padding: 0px;
  }
}

.middle-icons .delete {
  position: absolute;
  right: 0;
}
.middle-icons .edit {
  position: absolute;
  right: 50px;
}
.middle-icons .delete:hover,
.middle-icons .edit:hover {
  color: var(--font_black);
}

.link {
  word-break: break-all;
}
</style>