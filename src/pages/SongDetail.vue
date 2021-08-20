<template>
  <base-card>
    <!-- <div class="song-detail">
      <div class="top-section">
        <div class="go-back">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>
        </div>
        <div class="middle-icons">
          <font-awesome-icon :icon="iconName" :class="{'is-favorite':isFavorite}" @click="Change"></font-awesome-icon>
          <font-awesome-icon icon="trash-alt"></font-awesome-icon>
        </div>
        <div class="go-back">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </div>
      </div>
      
    </div> -->

    <div class="song-detail">
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
              class="top-icon"
            ></font-awesome-icon>
            <font-awesome-icon
              class="top-icon"
              icon="trash-alt"
            ></font-awesome-icon>
          </div>
        </div>
        <!--  -->
        <div>
          <div>Artist: RHCP</div>
          <!-- <label for="artist">Artist:</label>
            <span>RHCP</span> -->

          <!-- <input type="text" /> -->
          <div class="song-info-box">
            Learned:
            <stars></stars>
          </div>
        </div>
        <!--  -->
        <div>
          <div class="song-name">Song: Californication</div>
          <!-- <label for="song">Song:</label> -->
          <!-- <input type="text" /> -->

          <div class="song-info-box">
            BPM: 84
            <font-awesome-icon
              class="metronome"
              icon="play-circle"
            ></font-awesome-icon>
          </div>
        </div>
        <!-- ovdje mora ici vfor ako ima 2 keya -->
        <div>
          <div class="key">Key: Am</div>
          <div class="chords">Chords in scale: A B C D E F G H</div>

          <div class="tuning">Tuning: Standard</div>
        </div>
        <!--  -->
        <div>
          <div class="capo">Capo: Yes</div>
          <div class="guitar">Chord progression: 1 4 5</div>
          <div class="guitar">Guitar type: Electric</div>
        </div>
        <!--  -->
        <div>
          <div class="genre">Genre: Rock</div>
          <div class="link">Link: <a href="#">www.google.com</a></div>
          <div class="upload"><button>Upload pdf</button></div>
        </div>
      </div>
      <div class="box video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/9YffrCViTVk"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>

      <div class="box notebook">
        <hr />
        <br />
        <pre>
 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis 

        Eligendi, qui iusto distinctio aperiam corrupti voluptate deleniti
        similique dignissimos doloribus illum. Tenetur dolor odit at providentddddddddddddddddddddddddddddddddddddddd dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
        nihil culpa voluptate reprehenderit obcaecati vitae numquam laborum
        enim, molestiae, eligendi voluptates dicta praesentium corrupti est
        deleniti, perferendis recusandae
        
        
        ? Praesentium velit magni cum dolorum
        similiq nrue, itaque, odit quibusdam quidem saepe eum consequuntur.
        Explicabo dolores similique, qui nemo ex molestiae quae, nostrum autem
        excepturi eligendi fuga earum iure! Hic tempora consequuntur deleni
        </pre>
      </div>
    </div>
  </base-card>
</template>

<script>
import Stars from "./../components/ui/Stars.vue";
import BaseCard from "../components/ui/BaseCard.vue";

export default {
  name: "SongDetail",
  components: {
    BaseCard,
    Stars,
  },
  props: ["songId"],
  data() {
    return {
      id: null,
      title: "",
      isFavorite: null,
      songData: null,
    };
  },
  mounted() {
    // this.id = this.$route.params.songId;
    this.id = this.songId;

    const songData = this.$store.getters.getAllSongs.find(
      (song) => song.songId == this.id
    );
    if (songData) {
      this.songData = songData;
      this.isFavorite=songData.isFavorite;
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
  color: rgba(0, 0, 0, 0.85);
  /* background-color: #0D1117; 
  color: #c9d1d9; */
  padding: 8px;
  display: grid;
  gap: 10px;
  position: relative;
  grid-template-columns: 1fr;

  max-width: 1400px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-family: Arial, sans-serif !important;
  font-size: 18px;

  /* border: solid 2px black;
  position: relative;  */
  /* font-size: 21px; */
}
.box.notebook {
  font-weight: 400;
  line-height: 1.5em;
  order: 3;
}
pre {
  white-space: pre-wrap; /* Since CSS 2.1 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word;
}

.song-info {
  width: 600px;
  margin: auto;
  order: 2;
  overflow: hidden;
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
.box {
  border-radius: 0 0 6px 6px;
  padding: 15px;

  /* background-color: #ccc; */
}
.box.video {
  text-align: center;
  order: 1;
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

svg {
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 28px;
}

.go-back {
  position: absolute;
  left: 5px;
  top: -45px;
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
  color: rgba(0, 0, 0, 0.85);
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
  width: 600px;
  justify-content: space-between;
}
</style>