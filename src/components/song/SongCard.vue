<template>
  <div class="card" @click="openSongDetail">
    <div class="card-header">
      <div class="image">
        <img :src="song.imgUrl || imgUrl" alt="Photo" />
      </div>

      <div class="icons">
        <div
          class="icon"
          @click.stop="toggleFavorite"
          :class="{ is_favorite: isFavorite }"
        >
          <font-awesome-icon icon="heart"></font-awesome-icon>
        </div>
        <div class="icon" id="edit" @click.stop="openEditMode">
          <font-awesome-icon icon="edit"></font-awesome-icon>
        </div>
      </div>
    </div>

    <div class="card-body">
      <div class="tags">
        <!-- <span class="tag tag-teal" v-if="song.capo"> Capo</span> -->
        <span class="tag tag-teal" v-if="song.firstKey">
          {{ showFirstKey }}</span
        >
        <span
          class="tag tag-teal difficulty"
          v-if="song.difficulty"
          :class="skillLevelClass"
          >{{ song.difficulty }}</span
        >
        <span v-if="!song.capo && !song.difficulty" style="height: 24px"></span>
      </div>
      <!-- <div  > -->
      <h3
        class="artist"
        @click.stop="chooseArtist"
        :aria-label="song.artist"
        :title="song.artist"
      >
        {{ song.artist }}
      </h3>
      <!-- </div> -->
      <h4 class="song_name" :aria-label="song.songName" :title="song.songName">
        {{ song.songName }}
      </h4>
      <div class="info">
        <div class="history-info">
          <font-awesome-icon icon="history"></font-awesome-icon>
          <small>{{ timeSince }}</small>
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
      const pushRoute = this.song.isMySong
        ? `/songs/${this.song.songId}?isMySong=True`
        : `/songs/${this.song.songId}`;
      this.$router.push(pushRoute);
    },
    toggleFavorite() {
      this.$store.commit("toggleFavorite", {
        songId: this.song.songId,
        isMySong: this.$route.query.isMySong,
      });
      this.$store.dispatch("addNewSong", this.song);
    },
    openEditMode() {
      const pushRoute = this.song.isMySong
        ? `/new/${this.song.songId}?isMySong=True`
        : `/new/${this.song.songId}`;
      // this.$router.push("/new/" + this.song.songId);
      this.$router.push(pushRoute);
    },
    chooseArtist() {
      if (!this.song.isMySong)
        this.$router.push("/songs?artist=" + this.song.artist);
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
      const lastViewedDate = +new Date(this.song.lastViewed);
      var msPerMinute = 60 * 1000;
      var msPerHour = msPerMinute * 60;
      var msPerDay = msPerHour * 24;
      var msPerMonth = msPerDay * 30;
      var msPerYear = msPerDay * 365;
      var elapsed = new Date() - lastViewedDate;

      if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + "s ago";
      } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + " min ago";
      } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + "h ago";
      } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + "d ago";
      } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + " mon ago";
      } else {
        return Math.round(elapsed / msPerYear) + " yrs ago";
      }
    },
    imgUrl() {
      return require("@/assets/music.png");
    },
    showFirstKey() {
      // console.log(this.song.firstKey);
      let key = "";
      if (this.song.firstKey) {
        key = this.song.firstKey.split(" ");
        switch (key[1].toLowerCase()) {
          case "major":
            key = key[0] + " maj";
            break;
          default:
            key = key[0] + " min";
        }
      }
      return key;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: var(--white);
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  overflow: hidden;
  width: 180px;
  position: relative;
  height: 260px;
  color: var(--font_black);
  transition: 0.3s ease-in all;
  cursor: pointer;
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
  padding: 8px 13px 13px 13px;
  gap: 10px;
  width: 100%;
}

.tags {
  display: flex;
  gap: 4px;
}
.tag {
  border-radius: 50px;
  font-size: 12px;
  margin: 0;
  color: var(--white);
  padding: 4px 10px;
  /* text-transform: uppercase; */
  /* text-transform: capitalize; */
  cursor: pointer;
}
.tag-teal {
  background-color: var(--teals);
}
.tag.difficulty {
  text-transform: uppercase;
}
.easy {
  background-color: var(--green);
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

.artist:hover {
  color: var(--burgundy);
}

.info {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
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
</style>