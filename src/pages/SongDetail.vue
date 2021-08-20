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
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>
          </div>
          <div class="middle-icons">
            <font-awesome-icon
              :icon="iconName"
              :class="{ 'is-favorite': isFavorite }"
              @click="Change"
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
          <div>Song: Californication</div>
          <!-- <label for="song">Song:</label> -->
          <!-- <input type="text" /> -->

          <div class="song-info-box">
            Metronome
            <font-awesome-icon icon="search"></font-awesome-icon>
            <font-awesome-icon icon="trash-alt"></font-awesome-icon>
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
          <div class="link">Link: www.google.com</div>
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

        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis nulla
        magni vel aut at rem laudantium facere harum debitis ratione, vero ipsam
        deserunt minima. Qui laborum libero repellat corrupti magni iusto
        voluptatibus voluptatem aliquid perspiciatis neque culpa a, vero, fuga,
        praesentium cupiditate enim eius molestiae sed maiores veritatis!
        Eligendi, qui iusto distinctio aperiam corrupti voluptate deleniti
        similique dignissimos doloribus illum. Tenetur dolor odit at provident
        nihil culpa voluptate reprehenderit obcaecati vitae numquam laborum
        enim, molestiae, eligendi voluptates dicta praesentium corrupti est
        deleniti, perferendis recusandae? Praesentium velit magni cum dolorum
        similiq nrue, itaque, odit quibusdam quidem saepe eum consequuntur.
        Explicabo dolores similique, qui nemo ex molestiae quae, nostrum autem
        excepturi eligendi fuga earum iure! Hic tempora consequuntur deleniti
        officiis id atque recusandae repellat dicta laboriosam quibusdam, illum
        nobis odit voluptatibus. Eaque eligendi soluta sint assumenda ullam fuga
        cupiditate veniam vitae alias. Error quis reiciendis nihil optio quo,
        voluptas magnam labore repellendus, ducimus ipsum culpa fugit sapiente
        placeat vel harum, corporis consequatur amet alias enim fuga nam cumque
        non nisi delectus. Iusto a saepe esse quos pariatur odio non magnam
        nobis unde debitis aperiam sequi error ex adipisci vitae exercitationem
        maxime tempora, aut officia? Enim odio cumque voluptatem atque totam
        praesentium, officia soluta ea temporibus, at expedita excepturi
        architecto perspiciatis amet porro error cum repellendus numquam velit
        esse debitis repudiandae aperiam ut laborum? Doloremque neque deleniti
        sunt odit quos ea nisi accusantium quasi mollitia quaerat sint impedit
        asperiores recusandae cum excepturi assumenda magni repudiandae, laborum
        facilis saepe. Facere quis aspernatur aut officia dolore.
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
  data() {
    return {
      id: null,
      title: "",
      isFavorite: false,
    };
  },
  mounted() {
    this.id = this.$route.params.songId;

    const songData = this.$store.getters.getAllSongs.find(
      (song) => song.id == this.id
    );
    if (songData) {
      this.songData = songData;
    }
  },
  methods: {
    Change() {
      this.isFavorite = !this.isFavorite;
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
.song-info {
  width: 600px;
  margin: auto;
  order: 2;
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
}
.song-info > div {
  display: flex;
  justify-content: space-between;
  gap: 25px;
  margin: 0 auto;
  padding-bottom: 20px;
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