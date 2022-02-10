<template>
  <base-card>
    <template v-slot:select_box>
      <sort-by @changeSort="sortArtists" :options="getOptions"></sort-by>
    </template>
    <div class="artists">
      <ul class="list-group">
        <li class="list-group-item" v-for="artist in sortList" :key="artist">
          <div class="thumbnail flex-center">
            <img :src="artist.artistImg || artistPhoto" alt="Artist" />
          </div>

          <div class="details">
            <h2>
              <router-link :to="'/songs?artist=' + artist.name">{{
                artist.name
              }}</router-link>
            </h2>
            <p>Songs: {{ artist.totalSongs }}</p>
          </div>
        </li>
      </ul>
    </div>
    <!-- <the-loader class="box" v-if="!sortList"></the-loader> -->
  </base-card>
</template>

<script>
import BaseCard from "./../components/ui/BaseCard.vue";
// import TheLoader from "./../components/ui/TheLoader.vue";
import SortBy from "../components/ui/SortBy.vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    BaseCard,
    SortBy,
    // TheLoader,
  },
  setup() {
    const store = useStore();
    // const itemsAreLoading = ref(true);
    // const artistList = ref([]);

    const sortList = computed({
      get: () => {
        return store.getters.getArtists;
      },
      set: (newList) => {
        store.commit("updateArtistsList", newList);
      },
    });

    const getOptions = computed(() => {
      return ["A-Z", "Z-A"];
    });
    const artistPhoto = computed(() => {
      return require("../assets/guitar.svg");
    });

    function sortArtists(option) {
      store.commit("sortArtists", option);
    }
    return {
      sortArtists,
      getOptions,
      // itemsAreLoading,
      sortList,
      artistPhoto,
    };
  },
};
</script>

<style  scoped>
.artists {
  max-width: 800px;
  margin: 0 auto;
}
@media (min-width: 720px) {
  .artists {
    padding: 25px;
  }
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
}
.list-group {
  width: 100%;
  background: #fff;
}
.list-group .list-group-item {
  display: flex;
  border-bottom: 1px solid #ccc;
  list-style: none;
  height: 80px;
}
.list-group .list-group-item > div {
  padding: 15px 0px;
}
.list-group .list-group-item .thumbnail {
  padding: 0px 10px;
}
.list-group .list-group-item .thumbnail img {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
}
.list-group .list-group-item .details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
}

.list-group .list-group-item .details h2 {
  font-size: 18px;
  color: #111;
  display: block;
  height: 100%;
}
.list-group .list-group-item .details h2 a {
  text-decoration: none;
  color: inherit;
  transition: 0.2s all ease;
  display: block;
  height: 100%;
  display: flex;
  align-items: center;
}
.list-group .list-group-item .details h2 a:hover {
  color: var(--burgundy);
}
.list-group .list-group-item .details p {
  color: #555;
  font-size: 14px;
  padding: 0px 5px;
}
.list-group .list-group-item .btn {
  width: 50px;
  color: #aaa;
  cursor: pointer;
}
.list-group .list-group-item .btn:hover {
  color: #111;
}
</style>