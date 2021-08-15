<template>
  <div class="song-cards">
    <!-- <div class="icons">
      <div class="icon" @click="editQuote">
        <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
      </div>
      <div class="icon" @click="removeQuote">
        <font-awesome-icon icon="heart" class="favorite"></font-awesome-icon>
      </div>
    </div>
    <img src="" alt="Quote photo" />
    <div class="info">
      <h4>{{ songArtist }}NirvanaNirvana Nirvana</h4>
      <h6>{{ songName }}Smells like teen</h6>
    </div> -->
    <div class="card" @click="Ispis">
      <div class="card-header">
        <img
          src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
          alt="rover"
        />
        <div class="icons">
          <div class="icon" @click="editQuote">
            <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
          </div>
          <div class="icon" @click="favorteQuote">
            <font-awesome-icon
              icon="heart"
              class="favorite"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="tags">
          <span class="tag tag-teal"> Capo</span>
          <span class="tag tag-teal" :class="skillLevelClass">{{
            skillLevel
          }}</span>
        </div>
        <h3 class="artist">
          <router-link to="/">
            Nirvana NirvanaNirvanaNi NirvanaNirvana
          </router-link>
        </h3>
        <h4 class="song_name">
          {{ songName }} Smells like teen spirit hell yeah Smells like teen
          Smells like teen
        </h4>
        <div class="info">
          <div class="history-info">
            <font-awesome-icon icon="history"></font-awesome-icon>
            <small>2h ago</small>
          </div>
          <h5>Practiced {{ score }}4/5</h5>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <img
          src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
          alt="rover"
        />
        <div class="icons">
          <div class="icon" @click="editQuote">
            <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
          </div>
          <div class="icon" @click="favorteQuote">
            <font-awesome-icon
              icon="heart"
              class="favorite"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="tags">
          <span class="tag tag-teal"> Capo</span>
          <span class="tag tag-teal medium">{{ skillLevel }}</span>
        </div>
        <h3 class="artist">
          <router-link to="/">NirvNirvanaana NirvanaNirvan assssss</router-link>
        </h3>
        <h4 class="song_name">{{ songName }} Smells</h4>
        <div class="info">
          <div class="history-info">
            <font-awesome-icon icon="history"></font-awesome-icon>
            <small>2h ago</small>
          </div>
          <h5>Practiced {{ score }}4/5</h5>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <img
          src="https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg"
          alt="rover"
        />
        <div class="icons">
          <div class="icon" @click="editQuote">
            <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
          </div>
          <div class="icon" @click="favorteQuote">
            <font-awesome-icon
              icon="heart"
              class="favorite"
            ></font-awesome-icon>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="tags">
          <span class="tag tag-teal"> Capo</span>
          <span class="tag tag-teal easy">{{ skillLevel }}</span>
        </div>
        <h3 class="artist">
          <router-link to="/">NirvNirvanaana NirvanaNirvan assssss</router-link>
        </h3>
        <h4 class="song_name">{{ songName }} Smells</h4>
        <div class="info">
          <div class="history-info">
            <font-awesome-icon icon="history"></font-awesome-icon>
            <small>2h ago</small>
          </div>
          <h5>Practiced: {{ score }}4/5</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Stars from "./../ui/Stars.vue"
export default {
  name: "SongCard",
  components: {},
  methods: {
    Ispis(e) {
      console.log("stisak", e.target);
      if (e.target.className == "icon") {
        console.log("nemoj");
        return;
      }
    },
  },
  computed: {
    skillLevelClass() {
      return this.skillLevel.toLowerCase();
    },
    songName() {
      return null;
    },
  },
  data() {
    return {
      skillLevel: "hard",
      score: null,
    };
  },
};
</script>

<style scoped>
.song-cards {
  display: flex;
  width: 1040px;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.card:first-child {
  margin-left: 10px;
}
.card {
  margin: 5px;
  background-color: #fff;
  border-radius: 2px;
  /* box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2); */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  width: 180px;
  position: relative; /*moj */
  height: 250px;
  color: #303030;
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
/*  ikonice*/
.icons {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: space-between;
  padding: 4px;
  z-index: 15;
  /* display: none; */
}
.icons .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;
  transition: 0.5s ease all;
}
.icons .icon:hover {
  background-color: #303030;
  color: white;
}
.favorite,
.edit {
  pointer-events: none;
  height: 15px;
  width: auto;
}
/* card body  */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4px 15px 15px 15px;
  gap: 6px;

  /* min-height: 120px; */
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
  background-color: #11101D;
  
}
.easy {
  background-color: #69B34C;
  /* background-color: #fa8e44; */
}
.medium {
  background-color: #ff4500;
  
  /* background-color: #fa8e44; */
}
.hard {
  /* background-color: #fd084a; */
  /* background-color: #d8323c;
  background-color: #e73213; */
  background: rgb(194, 42, 42);
  
  /* background-color: #FF0D0D; */
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
/* iznad je novije */

/* .quote-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  max-height: 220px;
  transition: 0.5s ease all;
  max-width: 200px;
}
.quote-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 15px;
  gap: 8px;
  z-index: 15;
}
.icons .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;
  transition: 0.5s ease all;
}
.icons .icon:hover {
  background-color: #303030;
  color: white;
}
.favorite,
.edit {
  pointer-events: none;
  height: 15px;
  width: auto;
}
.info {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 16px;
  z-index: 3;
}
.info h4 {
  padding-bottom: 6px;
  font-size: 22px;
  font-weight: 400;

  overflow-wrap: break-word;
}
.info h6 {
  font-weight: 500;
  font-size: 16px;
  padding-bottom: 6px;
  overflow-wrap: break-word;
}
.link {
  display: inline-flex;
  align-items: center;
  margin-top: auto; 
  font-weight: 500;
  padding-top: 18px;
  padding-bottom: 4px;
  gap: 8px;
  transition: 0.2s ease-in all;
  text-transform: uppercase;
  font-size: 12px;
  text-decoration: none;
  color: #da3f3f;
}
.link:hover {
  color: #00afea;
}
#ikona {
  width: 14px;
}
.quote-card img {
  display: block;
  z-index: 1;
  width: 100%;
  min-height: 80px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  background-color: black;
} */
</style>