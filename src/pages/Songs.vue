<template>
  <base-card>
    <template v-slot:select_box>
      <sort-by></sort-by>
    </template>
    <template v-slot:filters>
      <filters
      @filters-changed="filterSongs"></filters>
    </template>
    <!-- saong list -->
    <div class="song-cards">
      <song-card
        v-for="song in AllSongs"
        :key="song.songId"
        :song="song"
      ></song-card>
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
import BaseCard from "../components/ui/BaseCard.vue";
import SortBy from "../components/ui/SortBy.vue";
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
    SortBy,
  },
  computed: {
    AllSongs() {
      return this.filteredSongs;
    },
    getActiveFilters() {
      return this.$store.getters.getActiveFilters;
    },
    // getFilteredSongs(){

    // }
  },
  data() {
    return {
      filteredSongs: [],
    };
  },
  methods: {
    filterSongs(){
      // console.log("ej filtirraj",this.filteredSongs);
      let activeFilters=this.getActiveFilters;
      
      if(activeFilters.all)
      {
        this.filteredSongs=this.$store.getters.getAllSongs;
      }else{
        for (let i = 0; i < activeFilters.length; i++) {
          const element = activeFilters[i];
          console.log(element);
        }
        activeFilters=activeFilters.filter(filter=>filter==true)
      }
      

      console.log(activeFilters);
      this.filteredSongs.filter(song=>{
          console.log(song);
      })
    },
    initialLoad() {
      this.filteredSongs = this.$store.getters.getAllSongs;
    },
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
  },
  mounted() {
    this.initialLoad();
    this.getActiveFilters;
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