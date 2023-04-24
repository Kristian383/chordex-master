<template>
  <section
    class="home-section"
    :class="{ expand_home_section: sidebarIsActive && isDesktop }"
  >
    <nav v-if="!isMetronomeView">
      <the-search />
      <div class="filter_categories">
        <slot name="filters" />
      </div>
    </nav>
    <div class="home-content" :class="{ reduce_content_padding: isMetronomeView }">
      <!-- TODO: add slot here and move this logic in songdetail -->
      <div :style="{ justifyContent: $route.path !== '/songs' ? 'space-around' : 'space-between' }" class="sort-section-title">
        <slot name="playlist_name_edit" />
        <div class="title">
          <span
            v-if="showArrows == 'both' || showArrows == 'prev'"
            class="arrow-left"
            @click="goToSong('prev')"
          >
            <font-awesome-icon icon="angle-left" />
          </span>
          <div v-if="$route.query?.artist" @click="$router.push('/songs')" class="active-artist-chip">
            <span>{{ $route.query?.artist }}</span>
            <font-awesome-icon class="chip-icon" icon="times" />
          </div>
          <span v-else class="title-text">{{ getTitle }}</span>
          <span
            v-if="showArrows == 'both' || showArrows == 'next'"
            class="arrow-right"
            @click="goToSong('next')"
          >
            <font-awesome-icon icon="angle-right" />
          </span>
        </div>
        <slot name="sort_select_box" />
      </div>
      <slot />
      <scroll-up :class="{ show: showBackToTop }" />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const TheSearch = defineAsyncComponent(() => import('./../ui/TheSearch.vue'));

const route = useRoute();
const router = useRouter();
const store = useStore();
const showBackToTop = ref(false);

const sidebarIsActive = computed(() => {
  return store.getters.sidebarIsActive;
});

const isDesktop = computed(() => {
  return !store.getters.isMobile;
});

const isMetronomeView = computed(() => {
  return route.path == "/metronome" ? true : false;
});

const getTitle = computed(() => {
  const { name, query } = route;

  if (name === "SongDetail") {
    return store.getters.getSongDetailTitle;
  }

  if (query?.artist) {
    return `Songs by: ${query?.artist}`;
  }

  if(query?.playlist) return;

  return name;
});

const hasQuery2 = computed(() => {
  return Object.keys(route.query).length > 0;
});

const indexOfCurrentSong = computed(() => {
  return store.getters.indexOfCurrentSong({ id: route.params.songId, query: Object.keys(route.query).length > 0 });
});

const showArrows = computed(() => {
  if (route.name !== "SongDetail") return false;

  const index = indexOfCurrentSong.value;

  const lenAll = hasQuery2.value ? store.getters.getAllMySongsLen : store.getters.getAllSongsLen;

  if (index === 0) {
    return lenAll === 1 ? false : "next";
  } else if (index === lenAll - 1) {
    return "prev";
  } else {
    return "both";
  }
});

function showButtonUp() {
  if (window.scrollY > 800) {
    showBackToTop.value = true;
  } else if (window.scrollY < 800) {
    showBackToTop.value = false;
  }
};

function goToSong(direction) {
  const currentSongIndex = indexOfCurrentSong.value;
  const goToIndex = direction === "next" ? currentSongIndex + 1 : currentSongIndex - 1; 
  const goToSongId = hasQuery2.value ? store.getters.getAllMySongs[goToIndex].songId : store.getters.getAllSongs[goToIndex].songId;
  const pushRoute = hasQuery2.value ? `/songs/${goToSongId}?isMySong=True` : `/songs/${goToSongId}`;
  router.push(pushRoute);
};

onMounted(() => {
  window.addEventListener("scroll", showButtonUp);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", showButtonUp);
});
</script>

<style lang="scss" scoped>
.home-section {
  position: relative;
  background: var(--white);
  min-height: 100vh;
  transition: all 0.5s ease;
}

.home-section nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--white);
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 40;
  padding: 0.625rem 1.25rem;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in-out;
}
.expand_home_section {
  left: 15rem;
  width: calc(100% - 15rem);
}
.expand_home_section nav {
  left: 15rem;
  width: calc(100% - 15rem);
}

@media (min-width: 87.5rem) {
  .home-section nav {
    flex-direction: row;
    height: 5rem;
    justify-content: center;
  }
}

.filter_categories {
  min-width: 15.625rem;
  max-width: 50rem;
  display: flex;
  width: 100%;
  order: 2;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0 1.25rem;
  gap: 0.25rem;
}
@media (min-width: 87.5rem) {
  .filter_categories {
    order: 0;
  }
}
.filter_categories::-webkit-scrollbar {
  display: none;
}

/* Content under header */
.home-section .home-content {
  position: relative;
  padding: 8.75rem 1rem 1rem 1rem;
  margin: 0 auto;
  background-color: var(--white);
  height: 100%;
  max-width: 106.25rem;

    .active-artist-chip {
      display: inline-block;
      border: 2px solid #ccc;
      border-radius: 1.25rem;
      padding: 0.3125rem 0.625rem;
      font-size: 0.875rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: var(--dark_gray_chips);

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

        .chip-icon {
          color: var(--dark_gray_chips);
        }
      }
      &:active {
        transform: translateY(1px);
      }
      .chip-icon {
        color: var(--mid_gray);
      }
  }
}

@media (min-width: 1400px) {
  .home-section .home-content {
    padding: 6rem 1rem 1rem 1rem;
  }
}
.home-content.reduce_content_padding {
  padding: 1rem;
}

/*  */
.sort-section-title {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 0.875rem;
  margin-bottom: 0.5rem;
  color: var(--font_black);
  align-items: center;
  padding: 0 2rem;
  
  @media (min-width: 90rem) {
    padding-left: 2.5rem;
  }
  @media (min-width: 37.5rem) {
    flex-direction: row;
  }
}
.sort-section-title .title {
  flex-shrink: 0; /*  this doesnt remove arrows down */
  font-size: 1.3125rem;
  font-weight: 600;
}

/* arrows for song */
.arrow-right,
.arrow-left {
  display: inline-block;
  width: 3.125rem;
  text-align: center;
  color: var(--burgundy);
  transition: all ease-in 0.3s;
}
.arrow-right:hover,
.arrow-left:hover {
  cursor: pointer;
  color: #222;
}
</style>