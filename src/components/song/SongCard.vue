<template>
  <div class="card" @click="Ispis">
    <div class="card-header">
      <img :src="song.imageUrl" alt="Artist photo" />
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
        <span class="tag tag-teal"> Capo</span>
        <span class="tag tag-teal" :class="skillLevelClass">{{
          song.difficulty
        }}</span>
      </div>
      <h3 class="artist">
        <router-link to="/"> {{ song.artist }} </router-link>
      </h3>
      <h4 class="song_name">{{ song.songName }}</h4>
      <div class="info">
        <div class="history-info">
          <font-awesome-icon icon="history"></font-awesome-icon>
          <small>{{ song.lastViewed }}</small>
        </div>
        <h5>Learned: {{practicePercentage}} </h5>
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
    Ispis(e) {
      console.log("stisak", e.target);
      // if (e.target.id == "favorite") {
      //   console.log("favorit trebamo toggle");
      //   //dispatch setInFavorites preko id propsa
      //   return;
      // } else if (e.target.id == "edit") {
      //   console.log("Edit mode");
      //   //route push na edit preko id propsa
      // }
    },
    toggleFavorite(e) {
      console.log("favorit", e.target);
    },
    openEditMode(e) {
      console.log("opening edit mode", e.target);
    },
  },
  computed: {
    skillLevelClass() {
      return this.song.difficulty.toLowerCase();
    },
    songName() {
      return null;
    },
    practicePercentage() {
      const num = (this.song.practiced / 5) * 100;

      return num + "%";
    },
    isFavorite() {
      return this.song.isFavorite;
    },
    barColor() {
      if(this.barPrctg<=40) return "rgb(194, 42, 42)"
      else if(this.barPrctg>34 && this.barPrctg <=80) return "#ff4500"

      return "#69b34c";
    },
  },
  data() {
    return {
      barPrctg: null,
    };
  },
  mounted() {
    this.barPrctg = (this.song.practiced / 5) * 100;
    
  },
};
</script>

<style scoped>
.card {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  /* box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2); */
  overflow: hidden;
  width: 180px;
  position: relative; /*moj */
  height: 260px;
  /* color: #303030; */
  color: #29264c;
  transition: 0.5s ease all;
}
.card:hover {
  cursor: pointer;
  transform: rotateZ(-1deg) scale(1.01);
}

.card-header img {
  width: 100%;
  height: 100px;
  object-fit: cover;
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
  color: #d8323c;
}
/* card body  */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4px 15px 15px 15px;
  gap: 10px;
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/*  */
.artist a {
  text-decoration: none;
  color: inherit;
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
</style>