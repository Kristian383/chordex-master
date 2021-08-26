<template>
  <base-card>
    <div class="song-detail" v-if="songData">
      <div class="box song-info">
        <div class="top-icons">
          <div class="go-back">
            <router-link to="/songs">
              <font-awesome-icon icon="arrow-left"></font-awesome-icon>
            </router-link>
          </div>
          <div class="middle-icons">
            <font-awesome-icon
              :icon="iconName"
              :class="{ 'is-favorite': isFavorite }"
              @click="ToggleFavorite"
            ></font-awesome-icon>
            <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
            <font-awesome-icon
              icon="trash-alt"
              class="delete"
            ></font-awesome-icon>
          </div>
        </div>
        <!--  -->
        <div >
          <div>Artist: {{songData.artist}}</div>
          <!-- <label for="artist">Artist:</label>
            <span>RHCP</span> -->

          <!-- <input type="text" /> -->
          <div class="song-info-box">
            Learned: {{songData.practicedPrcntg}}%
          </div>
        </div>
        <!--  -->
        <div>
          <div class="song-name">Song: Californication</div>
          <!-- <label for="song">Song:</label> -->
          <!-- <input type="text" /> -->

          <div class="song-info-box">
            BPM: {{songData.bpm}}
            <font-awesome-icon
              class="metronome"
              icon="play-circle"
            ></font-awesome-icon>
          </div>
        </div>
        <!-- ovdje mora ici vfor ako ima 2 keya -->
        <div>
          <div class="key">Key: {{songData.firstKey}}</div>
          <div class="chords">Chords in scale: {{songData.firstKeyNotes}}</div>
          <div class="guitar">Chord progression: {{songData.firstProgression}}</div>
          
        </div>
        <div v-if="songData.secondKey">
          <div class="key">Key: {{songData.secondKey}}</div>
          <div class="chords">Chords in scale: {{songData.secondKeyNotes}}</div>
          <div class="guitar">Chord progression: {{songData.secondProgression}}</div>
        </div>
        <!--  -->
        <div>
          <div class="capo">Capo: {{songData.capo ? songData.capo:"No"}}</div>
          <div class="tuning">Tuning: {{songData.tuning ? songData.tuning:"Standard"}}</div>
          
          <div class="guitar" >Guitar type: {{songData.acoustic ? "Acoustic":""}} {{songData.electric ? "Eletric":""}}</div>
        </div>
        <!--  -->
        <div>
          <!-- <div class="genre">Genre: Rock</div> -->
          <div class="link" v-if="songData.yt_link">
            Link: <a :href="songData.yt_link" target="_blank">{{songData.yt_link}} </a>
          </div>
          <div class="link" v-if="songData.yt_link">
            Link: <a :href="songData.chords_link" target="_blank">{{songData.chords_link}} </a>
          </div>
        </div>
        <div>
          <div>Difficulty: {{songData.difficulty}} </div>
        </div>
      </div>
      <div class="box video" v-if="songData">
        <iframe
          :src="songData.yt_link"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen 
        ></iframe>
      </div>

      <div class="box notebook">
        <hr />
        <br />
        <pre>{{songData.songText}}</pre>
        
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
    };
  },
  mounted() {
    // this.id = this.$route.params.songId;
    //iz rutera prop
    this.id = this.songId; 

    const songData = this.$store.getters.getAllSongs.find(
      (song) => song.songId == this.id
    );
    if (songData) {
      this.songData = songData;
      this.isFavorite = songData.isFavorite;
      //pass song name for title of page
      this.$store.commit("setSongDetailTitle",songData.song)
      
    } else {
      this.$router.push("notFound");
    }
  },
  methods: {
    ToggleFavorite() {
      this.isFavorite = !this.isFavorite;
      this.$store.commit("toggleFavorite", this.id);
    },
  },
  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
  },
};
</script>

<style scoped>
.song-detail {
  /* min-height: 95vh; */
  background-color: #fff;
  color: RGB(16, 17, 20);
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
 box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  
  font-size: 18px;
  border-right: 6px solid rgb(194, 42, 42);
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

@media (min-width: 600px){
  .box{
    width: 400px;
  }
  .box.video iframe{
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
  .box.song-info, .box.video{
    width: 600px;
    /* margin: auto; */
    min-height: 400px;
  }
  .box.video iframe {
    height: 100%;
    /* width: 560px; */
  }
  .box.notebook{
    width: 100%;
  }
}
@media (min-width: 1400px) {
  .song-detail {
    grid-template-columns: 1fr 1fr;
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
}

.go-back {
  position: absolute;
  left: 5px;
  top: -60px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.go-back a {
  text-decoration: none;
  color: RGB(16, 17, 20);
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
  color: rgb(66, 65, 65);
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
  color: black;
}


</style>