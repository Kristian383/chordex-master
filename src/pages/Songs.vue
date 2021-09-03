<template>
  <base-card>
    <template v-slot:filters>
      <filters  @filters-changed="setFilters"></filters>
    </template>
    <template v-slot:select_box>
      <sort-by-optimized @changeSort="sortSongs" :options="sortOptions"></sort-by-optimized>
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
      <skeleton-song-card v-for="skeleton in 6" :key="skeleton" v-else></skeleton-song-card>
      <!-- staviti for  skeleton in count  -->
    </div>
    <!-- <template v-slot:song_cards>
      <song-card 
        v-for="song in AllSongs"
        :key="song.id"
        :song="song"
      ></song-card>
    </template> -->
    <!-- <div class="cover">&nbsp;</div> -->
  </base-card>
</template>

<script>
import Filters from "../components/ui/Filters.vue";
import SongCard from "./../components/song/SongCard.vue";
import SkeletonSongCard from "./../components/song/SkeletonSongCard.vue";
import BaseCard from "../components/ui/BaseCard.vue";
// import SortBy from "../components/ui/SortBy.vue";
import SortByOptimized from '../components/ui/SortByOptimized.vue';
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
    // SortBy,
    SkeletonSongCard,
    SortByOptimized,
  },
  data() {
    return {
      isLoaded: true,
      filters:[]
    };
  },
  computed: {
    AllSongs() {
      return this.filterSongs();
    },
    sortOptions(){
      return ["Newest Added","Oldest Added","A-Z","Z-A","Best learned","Least learned"]
    }
  },
  methods: {
    filterSongs() {
      if(this.$route.params.name){
        return this.$store.getters.filterSongs(this.filters,this.$route.params.name);
      }
      return this.$store.getters.filterSongs(this.filters);
      
    },
    setFilters(filters){
      this.filters=filters;
    },
    // initialLoad() {
    //   this.isLoaded=true;
    // },
    // loadMoreSongs() {
    //   //fetch more songs
    //   // let response=await axios("htp://www.wdasd.com/+this.page")
    //   console.log("load more songs");
    // },

    // observer
    beTouching(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //fetch call
          // loadMoreSongs()
          // console.log("intersecting");
          entry.target.classList.add("active");
          // observer.unobserve(entry.target)
        }
        // else{
        //   entry.target.classList.remove("active")
        // }
      });
    },
    sortSongs(option)
    {
      this.$store.commit("sortSongs",option)
    }
  },
  mounted() {
    // this.initialLoad();
    // console.log(this.$route);
    let options = {
      root: null,
      rootMargin: "-100px 0px",
      threshold: 0.05,
    };
    let observer = new IntersectionObserver(this.beTouching, options);

    document.querySelectorAll(".card").forEach((c) => {
      observer.observe(c);
      // console.log("card",c);
    });
    //initial load of data
    // loadMoreSongs()
  },
};
</script>

<style scoped>
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