<template>
  <div class="card" @click="openSongDetail">
    <div class="card-header">
      <div class="image">
        <img :src="song.imageUrl" alt="Artist photo" />
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
        <!-- <span class="tag tag-teal" v-else></span> -->
        <span
          class="tag tag-teal"
          v-if="song.difficulty"
          :class="skillLevelClass"
          >{{ song.difficulty }}</span
        >
        <span v-if="!song.capo && !song.difficulty" style="height: 24px"></span>
      </div>
      <!-- <div  > -->
      <!-- <router-link to="/"> -->
      <h3
        class="artist"
        @click.stop="chooseArtist"
        :aria-label="song.artist"
        :title="song.artist"
      >
        {{ song.artist }}
      </h3>
      <!-- </router-link> -->
      <!-- </div> -->
      <h4 class="song_name" :aria-label="song.songName" :title="song.songName">
        {{ song.songName }}
      </h4>
      <div class="info">
        <div class="history-info">
          <font-awesome-icon icon="history"></font-awesome-icon>
          <small>{{ timeSince }}</small>
          <!-- <small>{{ song.lastViewed }}</small> -->
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
      //this.song.isFavorite=!this.song.isFavorite
      this.$store.dispatch("addNewSong", this.song);
    },
    openEditMode() {
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
    timeSince() {
      var seconds = Math.floor((new Date() - new Date(this.song.lastViewed) ) / 1000);

      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        
        return Math.floor(interval) + "d ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + "h ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " min ago";
      }
      return Math.floor(seconds) + "s ago";
    },
  },
 
};
</script>

<style scoped>
.card {
  background-color: var(--white);
  border-radius: 2px;
  /* box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06); */
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  width: 180px;
  position: relative;
  height: 260px;
  /* color: #303030; */
  color: var(--font_black);
  transition: 0.3s ease-in all;
  cursor: pointer;

  /* transform: translateY(10%); */
}
.card:focus {
  outline: none;
}
.card:hover {
  transform: rotateZ(-1deg) scale(1.04);
}
.card-header img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.image {
  width: 100%;
  height: 100px;
  text-align: center;
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
  background-color: var(--white);
  transition: all 0.5s ease;
}

@media (min-width: 720px) {
  .icons .icon:hover {
    background-color: #303030;
    color: var(--white);
  }
}
.favorite,
.edit {
  /* pointer-events: none; */
  height: 15px;
  width: auto;
}
.is_favorite {
  color: var(--burgundy);
}
/* card body  */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 8px 15px 15px 15px;
  gap: 10px;
  width: 100%;
}

.tags {
  display: flex;
  gap: 4px;
}
.tag {
  /* background: #cccccc; */
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: var(--white);
  padding: 4px 10px;
  text-transform: uppercase;
  cursor: pointer;
}
.tag-teal {
  background-color: var(--teals);
}
.easy {
  background-color: var(--green);
  /* background-color: #41a592; */
}
.medium {
  background-color: var(--orange);
}
.hard {
  background: var(--burgundy);
}
.artist,
.song_name {
  text-transform: capitalize;
  z-index: 35;
  /* font-size: 16px; */

  /* max-height: 50px ; */

  /* overflow: hidden; */

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: normal; */

  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; */

  width: 100%;
}
/*  */
/* .artist a {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
} */
.artist:hover {
  /* color: rgb(194, 42, 42); */
  color: var(--burgundy);
}

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
  align-items: center;
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