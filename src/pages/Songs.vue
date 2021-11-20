<template>
  <base-card>
    <template v-slot:filters>
      <filters @filters-changed="setFilters"></filters>
    </template>
    <template v-slot:select_box>
      <sort-by-optimized
        @changeSort="sortSongs"
        :options="sortOptions"
      ></sort-by-optimized>
    </template>
    <!-- saong list -->
    <div class="song-cards">
      <template v-if="isLoaded">
        <song-card
          v-for="song in AllSongs"
          :key="song.songId"
          :song="song"
        ></song-card>
      </template>
      <skeleton-song-card
        v-for="skeleton in 2"
        :key="skeleton"
        v-else
      ></skeleton-song-card>
      <!-- staviti for  skeleton in count  -->
    </div>
    <!-- loader -->
    <div class="box" v-if="itemsAreLoading">
      <div class="loader-02"></div>
    </div>
  </base-card>
</template>

<script>
import Filters from "../components/ui/Filters.vue";
import SongCard from "./../components/song/SongCard.vue";
import SkeletonSongCard from "./../components/song/SkeletonSongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
import SortByOptimized from "../components/ui/SortByOptimized.vue";
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
    SkeletonSongCard,
    SortByOptimized,
  },
  data() {
    return {
      isLoaded: false,
      filters: [],
      itemsAreLoading: false,
      el:null,
      observer:null
    };
  },
  computed: {
    AllSongs() {
      return this.filterSongs();
    },
    sortOptions() {
      return [
        // "Newest",
        "Last viewed",
        "Oldest",
        "A-Z",
        "Z-A",
        "Best learned",
        "Least learned",
      ];
    },
    // fetchedSongs(){
    //   console.log(this.$store.state.songs.length);
    //   return this.$store.state.songs.length
    // }
  },
  methods: {
    filterSongs() {
      if (this.$route.params.name) {
        return this.$store.getters.filterSongs(
          this.filters,
          this.$route.params.name
        );
      }
      return this.$store.getters.filterSongs(this.filters);
    },
    setFilters(filters) {
      this.filters = filters;
    },
    sortSongs(option) {
      this.$store.commit("sortSongs", option);
    },
    handleIntersect(entries) {
      if (entries[0].isIntersecting) {
        this.itemsAreLoading = true;
          this.$store.dispatch("loadMoreSongs").then(()=>{
            this.itemsAreLoading = false;
          this.isLoaded = true;
          });
          
      }
    },
  },
  mounted() {
    let options = {
      root: null,
      rootMargin: " 0px",
      threshold: 0.5,
    };

    this.observer = new IntersectionObserver(this.handleIntersect, options);
    this.el = document.querySelector(".footer");
    this.observer.observe(this.el);

    this.$store.dispatch("loadMoreSongs").then(() => {
      // this.sortSongs("Last viewed")
      this.isLoaded = true;
    });

  },
  beforeUnmount(){
    this.observer.unobserve(this.el)
  }
};
</script>

<style scoped>
.box {
  display: inline-block;
  width: 100%;
  height: 100px;
  text-align: center;
  /* border: 1px solid currentcolor; */
  font-size: 30px;
  padding: 1em;
  position: relative;
  /* vertical-align: top; */
  transition: 0.3s color, 0.3s border, 0.3s transform, 0.3s opacity;
}
[class*="loader-"] {
  display: inline-block;
  width: 1em;
  height: 1em;
  color: inherit;
  vertical-align: middle;
  pointer-events: none;
}

.loader-02 {
  border: 0.2em solid transparent;
  border-left-color: currentcolor;
  border-right-color: currentcolor;
  border-radius: 50%;
  -webkit-animation: 1s loader-02 linear infinite;
  animation: 1s loader-02 linear infinite;
}

@-webkit-keyframes loader-02 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-02 {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/*  */
.song-cards {
  /* display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px; */
  padding-top: 10px;
  max-width: 1700px;
  margin: auto;
  display: grid;
  gap: 8px;
  grid-template-columns: repeat(auto-fill, 180px);
  justify-content: center;
}

/* .cover{
  position: fixed;
  top: 100px;
  right: 0;
  bottom: 100px;
  left: 0;
  background-color: rgba(240, 216, 176, 0.5);
} */
/* .select_wrap {
  display: flex;
  width: 200px;
  flex-direction: column;
  user-select: none;
  position: relative;
  z-index: 20;
}
.select_wrap .default_option {
  background: #11101d;
  color: #f1f1f1;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
}
.select_wrap ul {
  list-style: none;
}
.select_wrap .default_option li {
  padding: 10px 20px;
}

.select_wrap .default_option:before {
  content: "";
  position: absolute;
  width: 6px;
  top: 12px;
  right: 18px;
  height: 6px;
  border: 2px solid;
  border-color: transparent transparent #555555 #555555;
  transform: rotate(-45deg);
  transition: all 0.3s ease;
}
.select_wrap .select_ul {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  background: #11101d;
  color: #f1f1f1;
  border-radius: 4px;
  display: none;
}

.select_wrap .select_ul li {
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.4s ease;
}
.select_wrap .select_ul li:first-child:hover {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.select_wrap .select_ul li:last-child:hover {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

.select_wrap .select_ul li:hover {
  background: #fff;
  color: #11101d;
}
.select_wrap.active .select_ul {
  display: block;
}

.select_wrap.active .default_option:before {
  top: 18px;
  transform: rotate(-225deg);
} */

/*  */
</style>