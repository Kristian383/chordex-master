<template>
  <base-card>
    <template v-slot:select_box>
      <!-- <sort-by @changeSort="sortArtists"></sort-by> -->
      <sort-by-optimized
        @changeSort="sortArtists"
        :options="getOptions"
      ></sort-by-optimized>
    </template>
    <div class="artists">
      <draggable
        class="list-group"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="sortList"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <li class="list-group-item" :key="element.name">
            <div class="handle flex-center">
              <i class="fas fa-bars"></i>
            </div>
            <div class="thumbnail flex-center">
              <img src="https://picsum.photos/id/1004/100" alt="" />
            </div>
            <div class="details">
              <h2>
                <router-link :to="'/songs?artist=' + element.name">{{
                  element.name
                }}</router-link>
              </h2>
              <p>Songs: {{ element.totalSongs }}</p>
            </div>
          </li>
        </template>
      </draggable>
    </div>
    <the-loader v-if="itemsAreLoading"></the-loader>
  </base-card>
</template>

<script>
import draggable from "vuedraggable";
import BaseCard from "./../components/ui/BaseCard.vue";
import TheLoader from "./../components/ui/TheLoader.vue";
import SortByOptimized from "../components/ui/SortByOptimized.vue";

export default {
  components: {
    draggable,
    BaseCard,
    SortByOptimized,
    TheLoader,
  },
  data() {
    return {
      drag: false,
      selectedArtist: null,
      list: this.sortList,
      itemsAreLoading: false,
      // observer:null,
      el:null
    };
  },
  methods: {
    sortArtists(option) {
      this.$store.commit("sortArtists", option);
    },
    
    // handleIntersect(entries) {
    //   if (entries[0].isIntersecting) {
    //     this.itemsAreLoading = true;
    //     // setTimeout(() => {
    //     this.$store.dispatch("loadAllArtists").then(() => {
    //       this.itemsAreLoading = false;
    //       this.isLoaded = true;
    //     });

    //     // }, 1000);
    //   }
    // },
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
    // getElement(element) {
    //   return element;
    // },
    getOptions() {
      return ["A-Z", "Z-A"];
    },
    sortList: {
      get: function () {
        return this.$store.getters.getArtists;
      },
      set: function (newList) {
        this.$store.commit("updateArtistsList", newList);
      },
    },
  },
  mounted() {
    // let options = {
    //   root: null,
    //   rootMargin: " 0px",
    //   threshold: 0.5,
    // };

    // this.observer = new IntersectionObserver(this.handleIntersect, options);
    // this.el = document.querySelector(".footer");
    // this.observer.observe(this.el);

    // this.$store.dispatch("loadAllArtists")
    // .then(() => {
    //   this.isLoaded = true;
    // });
    // setTimeout(() => {
    // }, 1000);
  },
  beforeUnmount(){
    // console.log("unmounting artists component");
    // this.observer.unobserve(this.el)
  }
};
</script>

<style scoped>
.artists {
  /* display:flex;
  justify-content:center;
  align-items:center; */
  /* background-color: #ccc; */

  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
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

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #eaebea;
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
.list-group .list-group-item .handle {
  width: 50px;
  background: #0d1117;
  border: 1px solid #ddd;
  cursor: pointer;
  color: #fff;
}

/* @media (min-width: 720px) {
  .list-group .list-group-item  {
   
  }
} */
/* .list-group .list-group-item .handle:hover {
  color: #111;
} */

.list-group .list-group-item .thumbnail {
  padding: 0px 10px;
}
.list-group .list-group-item .thumbnail img {
  width: 50px;
  border-radius: 50%;
}
.list-group .list-group-item .details {
  /* gap: 14px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.list-group .list-group-item .details h2 {
  font-size: 18px;
  color: #111;
  padding: 0px 5px 3px;
}
.list-group .list-group-item .details h2 a {
  text-decoration: none;
  color: inherit;
  transition: 0.2s all ease;
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
.is-favorite {
  color: #c22a2a;
}
</style>