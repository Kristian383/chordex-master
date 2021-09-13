<template>
  <div class="card" @click="openSongDetail">
    <div class="card-header">
      <div class="image">
        <img  :src="song.imageUrl" alt="Artist photo" />
      </div>

      <div class="icons">
        <div class="icon" id="edit" @click.stop="openEditMode">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </div>
        <div
          class="icon"
          @click.stop="toggleFavorite"
          :class="{ is_favorite: isFavorite }"
        >
          <font-awesome-icon icon="heart"></font-awesome-icon>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="tags">
        <span class="tag tag-teal" v-if="song.capo"> Capo</span>

        <span
          class="tag tag-teal"
          v-if="song.difficulty"
          :class="skillLevelClass"
          >{{ song.difficulty }}</span
        >
      </div>
      <h3 class="artist" @click.stop="chooseArtist">
        <router-link to="/">
          <h3>{{ song.artist }}</h3>
        </router-link>
      </h3>
      <h4 class="song_name" :aria-label="song.song" :title="song.song">
        {{ song.song }}
      </h4>
      <div class="info">
        <div class="history-info">
          <font-awesome-icon icon="history"></font-awesome-icon>
          <small>{{ song.lastViewed }}</small>
        </div>
        <h5>Learned: {{ practicePercentage }}</h5>
      </div>
    </div>
    <div class="progress" :style="{ width: practicePercentage }"></div>
  </div>
</template>

<script>
export default {
  name: "SongCard",
  props: ["song"],
  methods: {
    openSongDetail() {
      // console.log("stisak", e.target);
      if (this.song.isMySong) {
        this.$router.push("/my-songs/" + this.song.songId);
      } else {
        this.$router.push("/songs/" + this.song.songId);
      }
      //if (e.target.id == "edit") {
      //   console.log("Edit mode");
      //   //route push na edit preko id propsa
      // }
    },
    toggleFavorite() {
      this.$store.commit("toggleFavorite", { songId: this.song.songId });
    },
    openEditMode() {
      // console.log("opening edit mode", e.target);
      this.$router.push("/new/" + this.song.songId);
    },
    chooseArtist() {
      // console.log("artist");
      this.$router.push("/artists/" + this.song.artist);
    },
  },
  computed: {
    skillLevelClass() {
      return this.song.difficulty;
    },
    practicePercentage() {
      return this.song.practicedPrcntg + "%";
    },
    isFavorite() {
      return this.song.isFavorite;
    },
    barColor() {
      if (this.song.practicedPrcntg <= 40) return "rgb(194, 42, 42)";
      else if (
        this.song.practicedPrcntg > 34 &&
        this.song.practicedPrcntg <= 80
      )
        return "#ff4500";

      return "#69b34c";
    },
  },
  // data() {
  //   return {
  //     barPrctg: null,
  //   };
  // },
  // mounted() {
  //   this.barPrctg = this.song.practicedPrcntg;
  // },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 2px;
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  width: 180px;
  position: relative;
  height: 260px;
  /* color: #303030; */
  color: #101114;
  transition: 0.3s ease-in all;
  cursor: pointer;

  /* transform: translateY(10%); */
}
.card:hover {
  transform: rotateZ(-1deg) scale(1.04);
}
/* .card.active {
  opacity: 1;
  transform: translateY(0);
} */
.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image {
  width: 100%;
  height: 100px;
  text-align: center;
  /* background-color: #242424; */
  /* background-color: rgb(194, 42, 42); */
}

.progress {
  bottom: 0;
  left: 0;
  position: absolute;
  top: 0;
}
.progress:before {
  animation: slideIn 2s ease-out;
  background-color: v-bind(barColor);
  bottom: 0;
  left: 0;
  content: "";
  position: absolute;
  width: 100%;
  height: 6px;
  border-radius: 0 0 2px 2px;
}
.prgoress.low:before {
  background-color: yellw;
}
/*  ikonice*/
.icons {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: space-between;
  padding: 4px;
  z-index: 14;
}
.icons .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;
  transition: all 0.5s ease;
}
.icons .icon:hover {
  background-color: #303030;
  color: white;
}
.favorite,
.edit {
  /* pointer-events: none; */
  height: 15px;
  width: auto;
}
.is_favorite {
  /* color: #d8323c; */
  color: #b02828;
}
/* card body  */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4px 15px 15px 15px;
  gap: 10px;
  width: 100%;
}

.tags {
  display: flex;
  gap: 4px;
}
.tag {
  background: #cccccc;
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: #fff;
  padding: 4px 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.tag-teal {
  background-color: #11101d;
}
.easy {
  background-color: #69b34c;
  /* background-color: #41a592; */
}
.medium {
  background-color: #ff4500;
}
.hard {
  background: rgb(194, 42, 42);
}
/* overflow 
.artist {
  overflow: hidden;
  width: 150px;
  white-space: nowrap;
  text-overflow: ellipsis;
}*/
.artist,
.song_name {
  text-transform: capitalize;
  z-index: 32;
  font-size: 16px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  -webkit-line-clamp: 2;
  width: 100%;
}
/*  */
.artist a {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}
.artist:hover {
  /* color: rgb(194, 42, 42); */
  color: #00c;
}
/* .artist a:hover {
  color: rgb(73, 70, 70);
} */
.info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  /* margin-top: auto; */
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
}
.history-info {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

/* skeleton */
/* skeleton load */
.skeleton {
  /* opacity: .7; */
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 70%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}
.skeleton-text {
  width: 100%;
  height: 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 0.125rem;
}

.skeleton-text:last-child {
  width: 80%;
  margin-bottom: 0;
}
</style>