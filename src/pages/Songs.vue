<template>
  <base-card>
    <template v-slot:select_box>
      <div class="select-box">
        <div class="options-container" :class="{ active: sortIsActive }">
          <div class="option"  @click="changeSortOption('newest')">
            <input type="radio" id="recently" class="radio" name="category" />
            <label for="recently">Newest Added</label>
            <!-- <label for="recently">Recently added</label> -->
          </div>
          <div class="option" @click="changeSortOption('oldest')">
            <input type="radio" id="oldest" class="radio" name="category" />
            <label for="oldest">Oldest Added</label>
          </div>
          <div class="option" @click="changeSortOption('alphabet')">
            <input type="radio" id="alphabet" class="radio" name="category" />
            <label for="alphabet">A - Z</label>
          </div>
          <div class="option" @click="changeSortOption('reverse')">
            <input
              type="radio"
              id="reverse"
              class="radio"
              name="category"
            />
            <label for="alphabet_reverse">Z - A</label>
          </div>
        </div>
        <div class="selected"  @click="toggleSort" >Sort by: {{selectedSort}}</div>
      </div>
      <!-- <div class="select_wrap" :class="{ active: sortIsActive }">
        <ul class="default_option" @click="toggleSort">
          <li @click="changeSortOption('newest')">
            <div class="option newest">
              <p>Newest</p>
            </div>
          </li>
        </ul>
        <ul class="select_ul">
          <li @click="changeSortOption('oldest')" >
            <div class="option oldest">
              <p>Oldest</p>
            </div>
          </li>
          <li @click="changeSortOption('alphabet')">
            <div class="option burger">
              <p>A - Z</p>
            </div>
          </li>
          <li @click="changeSortOption('reverse')">
            <div class="option reverse">
              <p>Z - A</p>
            </div>
          </li>
        </ul>
      </div> -->
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
export default {
  components: {
    Filters,
    SongCard,
    BaseCard,
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
      sortIsActive: false,
      selectedSort: "newest",
    };
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    toggleSort() {
      this.sortIsActive = !this.sortIsActive;
    },
    changeSortOption(option) {
      // console.log("changeSortOption", option);
      this.selectedSort = option;
      this.sortIsActive= false
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
.select-box {
  display: flex;
  width: 180px;
  flex-direction: column;
  position: absolute;
  z-index: 20;
  top: 90px;
  right: 15px;
}
.select-box .options-container {
  background: #11101d;
  color: #f1f1f1;
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 4px;

  overflow: hidden;
  order: 1;
}
.selected {
  background: #11101d;
  margin-bottom: 8px;
  color: #f1f1f1;
  position: relative;
  order: 0;
  border-radius: 4px;
  text-transform: capitalize;
}
.selected:before {
  content: "";
  position: absolute;
  top: 14px;
  right: 18px;
  width: 6px;
  height: 6px;
  border: 2px solid;
  border-color: transparent transparent #fff #fff;
  transform: rotate(-45deg);
  transition: all 0.3s ease;
}

.select-box .options-container.active {
  opacity: 1;
  max-height: 240px;
  /* overflow-y: scroll; */
  
}
.select-box .options-container.active + .selected:before {
  top: 18px;
  transform: rotate(-225deg);
}
/* .select-box .options-container::-webkit-scrollbar {
  width: 8px;
  background: #0d141f;
  border-radius: 0 8px 8px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #525861;
  border-radius: 0 8px 8px 0;
} */
.select-box .option,
.selected {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.select-box .option:hover {
  color: #11101d;
  background: #f1f1f1;
}

.select-box label {
  cursor: pointer;
  /*display: block;  ovo sam dodao ako neradi click */
}

.select-box .option .radio {
  display: none;
}
</style>