<template>
  <base-card>
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
            ></font-awesome-icon>
            <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
            <font-awesome-icon
              icon="trash-alt"
              class="delete"
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
          <!-- <div class="genre">Genre: Rock</div> -->
          <div class="link">
            Link: <a href="#">www.yt-lesson-orbacking track.com</a>
          </div>
          <div class="upload"><button>Upload pdf</button></div>
        </div>
        <div>
          <div>Difficulty: Hard</div>
        </div>
      </div>
      <div class="box video">
        <iframe
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
        excepturi eligendi fuga earum iure! Hic tempora consequuntur deleni? Praesentium velit magni cum dolorum
        similiq nrue, itaque, odit quibusdam quidem saepe eum consequuntur.
        Explicabo dolores similique, qui nemo ex molestiae quae, nostrum autem
        excepturi eligendi fuga earum iure! Hic tempora consequuntur deleni

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
      this.isFavorite = songData.isFavorite;
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
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
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
  }
  .box.video iframe {
    height: 315px;
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