<template>
  <base-card>
    <template v-slot:select_box>
      <sort-by></sort-by>
    </template>
    <template v-slot:filters>
      <filters
        v-for="filter in allFilters"
        :key="filter"
        :filter="filter"
        @change-filter="setFilters"
        :activeFilters="getActiveFilters"
      ></filters>
    </template>
    <template v-slot:song_cards>
      <song-card
        v-for="song in AllSongs"
        :key="song.id"
        :song="song"
      ></song-card>
    </template>
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
    BaseCard,SortBy
  },
  computed: {
    AllSongs() {
      //get favorite songs
      // console.log("allsongs",this.$store.getters.getAllSongs);
      return this.$store.getters.getAllSongs;
    },
    allFilters() {
      return this.$store.getters.getAllFilters;
    },
    getActiveFilters() {
      return this.activeFilters;
    },
  },
  data() {
    return {
      activeFilters: {
        all: true,
        favorites: false,
        acoustic: false,
        electric: false,
        easy: false,
        medium: false,
        hard: false,
      },
      
    };
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    
    
  },
};
</script>

<style scoped>
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