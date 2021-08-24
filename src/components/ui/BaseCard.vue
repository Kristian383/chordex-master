<template>
  <section
    class="home-section"
    :class="{ expand_home_section: !sidebarIsActive }"
  >
    <nav>
      <div class="filter_categories">
        <slot name="filters"></slot>
      </div>
      <div class="search-box" id="search_box" :class="searchIsActive">
        <input
          type="text"
          placeholder="Search song or artist"
          @input="searchTextBox"
        />
        <div class="match-list">
          <li v-for="match in searchMatch" :key="match">
            <router-link :to="'/songs/' + match.songId"
              >{{ match.artist }} {{ match.songName }}</router-link
            >
          </li>
        </div>
        <font-awesome-icon icon="search" id="search"> </font-awesome-icon>
      </div>
    </nav>
    <div class="home-content">
      <div class="sort-section-title">
        <h2 class="title">{{ Title }}</h2>
        <slot name="select_box"></slot>
      </div>
      <slot></slot>
      <!-- <div class="song-cards" >
        <slot name="song_cards" ></slot>
      </div> -->
      <!-- ovdje ide poseban div za artists i poseban za favorites  -->
    </div>
  </section>
</template>

<script>
import { onClickOutside } from "@vueuse/core";

export default {
  computed: {
    sidebarIsActive() {
      // console.log("otvoreno", this.$store.getters.sidebarIsActive);
      return this.$store.getters.sidebarIsActive;
    },
    Title() {
      //staviti if route name zavrsava na /songs/broj onda dohvatiti iz vuexa song name
      return this.$route.name;
    },
    searchIsActive() {
      return this.searchMatch.length ? "active" : "";
    },
  },
  data() {
    return {
      title: "",
      searchMatch: [],
    };
  },
  methods: {
    searchTextBox(e) {
      let textValue = e.target.value;

      let foundData = this.$store.getters.getAllSongs.filter((song) => {
        const regex = new RegExp(`${textValue}`, "gi");
        return song.songName.match(regex) || song.artist.match(regex);
      });
      if (textValue.length === 0) {
        foundData = [];
      }
      console.log(foundData);
      this.searchMatch = foundData;
    },
  },
  mounted() {
    let target = document.getElementById("search_box");
    onClickOutside(target, () => {
      target.classList.remove("active");
      this.searchMatch = [];
      target.firstElementChild.value = "";
    });
  },
};
</script>

<style scoped>
.home-section {
  position: relative;
  background: #f5f5f5;
  
  /* background: #161B22; */
  
  min-height: 100vh;
  transition: all 0.5s ease;
  width: calc(100% - 240px);
  left: 240px;
}

.expand_home_section {
  width: calc(100% - 80px);
  left: 80px;
}

.home-section nav {
  display: flex;
  justify-content: space-between;
  height: 80px;
  background: #fff;
  /* background: #161B22; */
  align-items: center;
  position: fixed;
  width: calc(100% - 240px);
  left: 240px;
  z-index: 100;
  padding: 0 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}
.expand_home_section nav {
  width: calc(100% - 80px);
  left: 80px;
}

.filter_categories {
  display: flex;
  max-width: 800px;
  overflow-x: auto;
  overflow-y: hidden;
  gap: 4px;
}
.filter_categories::-webkit-scrollbar {
  display: none;
}

.home-section nav .search-box {
  position: relative;
  height: 50px;
  max-width: 350px;
  /* min-width: 200px; */
  width: 100%;
  margin: 0 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
nav .search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  background: #f5f6fa;
  border: 2px solid #efeef1;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
}
nav .search-box #search {
  position: absolute;
  height: 40px;
  padding: 6px;
  width: 40px;

  background: rgb(194, 42, 42);
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  transition: all 0.4 ease;
}
nav .search-box #search:hover {
  cursor: pointer;
}
/* Content under header */
.home-section .home-content {
  position: relative;
  /* padding-top: 124px; */
  padding: 100px 15px 15px 15px;
  /* max-width: 1400px; */
  margin: 0 auto;
}
/* Search */
.search-box .match-list {
  padding: 0;
  opacity: 0;
  pointer-events: none;
  max-height: 280px;
  overflow-y: auto;
  z-index: 26;
  background-color: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}

.search-box.active .match-list {
  padding: 10px 8px;
  opacity: 1;
  pointer-events: auto;
}
.match-list li {
  list-style: none;
  padding: 10px 12px;
  display: none;
  width: 100%;
  border-radius: 3px;
}
.search-box.active .match-list li {
  display: block;
}
.match-list li:hover {
  background: #f2f2f2;
  cursor: pointer;
}
.match-list li a {
  text-decoration: none;
  color: inherit;
  display: inline-block;
  width: 100%;
}
/*  */
.sort-section-title {
  /* position: absolute;
  top: 104px;
  transform: translateX(-50%);

  left: 50%; */
  display: flex;
  justify-content: space-around;
  gap: 14px;
  /* align-items: center; */
  margin-bottom: 8px;
  color: rgba(0, 0, 0, 0.85);
}
.sort-section-title h2 {
  padding-top: 8px;
}
/* list of all songs - song-cards  */
.home-section .song-cards {
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px; */
  padding-top: 20px;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
}
</style>