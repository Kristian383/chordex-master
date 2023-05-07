<template>
  <div ref="searchBoxRef" class="search-box">
    <input
      type="text"
      placeholder="Search song or artist"
      @input="searchTextBox"
    />
    <div v-if="searchMatch.length" class="match-list">
      <transition-group name="list">
        <li v-for="match in searchMatch" :key="match">
          <router-link :to="'/songs/' + match.songId">
            <b>{{ match.artist }} - {{ match.songName }}</b>
          </router-link>
        </li>
      </transition-group>
    </div>
    <font-awesome-icon id="search-icon" icon="search" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useStore } from 'vuex';

const store = useStore();
const searchMatch = ref([]);
const searchBoxRef = ref(null);

const allSongs = computed(() => store.getters.getAllSongs);

const handleOutsideClick = (event) => {
  if (!searchBoxRef.value.contains(event.target)) {
    searchMatch.value = [];
    searchBoxRef.value.firstElementChild.value = "";
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

const searchTextBox = (e) => {
  const textValue = e.target.value;
  const foundData = allSongs.value.filter((song) => {
    const regex = new RegExp(textValue, "gi");
    return song.songName.match(regex) || song.artist.match(regex);
  });
  searchMatch.value = foundData;
}; 

</script>

<style lang="scss" scoped>
.search-box {
  position: relative;
  height: 50px;
  width: 100%;
  max-width: 21rem;
  z-index:50;

  input {
    // height: 100%;
    outline: none;
    width: 100%;
    background: var(--chips_gray);
    border: none;
    border-radius: 6px;
    font-size: 18px;
    padding: 0.875rem 3rem 0.875rem 0.875rem;

    &:focus {
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }

  #search-icon {
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
  }
}

.search-box .match-list {
  max-height: 17.5rem;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  margin-top: 0.375rem;
  padding: 0.125rem;

  li {
    list-style: none;
    width: 100%;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #f2f2f2;
    }

    a {
      text-decoration: none;
      color: inherit;
      display: inline-block;
      width: 100%;
      padding: 10px 12px;
      // @include ellipsis-text;
    }
  }
}

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
</style>