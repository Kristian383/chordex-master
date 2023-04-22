<template>
  <div 
    ref="searchBoxRef"
    class="search-box" 
    :class="searchIsActive">
      <input
        type="text"
        placeholder="Search song or artist"
        @input="searchTextBox"
      />
      <div class="match-list">
        <transition-group name="list">
          <li v-for="match in searchMatch" :key="match">
            <router-link :to="'/songs/' + match.songId">
              <b>{{ match.artist }} - {{ match.songName }}</b>
            </router-link>
          </li>
        </transition-group>
      </div>
    <font-awesome-icon id="search" icon="search"> </font-awesome-icon>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import { useStore } from 'vuex';

const store = useStore();
const searchMatch = ref([]);
const searchBoxRef = ref(null)

const searchIsActive = computed(() => {
  return searchMatch.value.length ? "active" : "";
});
onMounted(() => {
  onClickOutside(searchBoxRef.value, () => {
    searchBoxRef.value.classList.remove('active');
    searchMatch.value = [];
    searchBoxRef.value.firstElementChild.value = "";
  });
});

const searchTextBox = (e) => {
  const textValue = e.target.value;

  let foundData = store.getters.getAllSongs.filter((song) => {
    const regex = new RegExp(`${textValue}`, "gi");
    return song.songName.match(regex) || song.artist.match(regex);
  });
  if (textValue.length === 0) {
    foundData = [];
  }
  searchMatch.value = foundData;
}; 

</script>

<style scoped>
.list-enter-from {
  opacity: 0;
}
.list-enter-to {
  opacity: 1;
}
.list-enter-active {
  transition: all 0.4s ease;
}

.list-leave-from {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  transition: all 0.3s ease;
}

.home-section nav .search-box {
  position: relative;
  height: 50px;
  width: 100%;
  max-width: 350px;
  margin: 0 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  z-index:50;

}
nav .search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  background: #eaebea;
  border: 2px solid #efeef1;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
nav .search-box #search {
  position: absolute;
  height: 40px;
  padding: 6px;
  width: 40px;

  background: var(--burgundy);
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  transition: all 0.4 ease;
}

.search-box .match-list {
  padding: 0;
  opacity: 0;
  pointer-events: none;
  max-height: 280px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.search-box.active .match-list {
  padding: 10px 8px;
  opacity: 1;

  pointer-events: auto;
}
.match-list li {
  list-style: none;
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
  padding: 10px 12px;
}
</style>