<template>
  <base-card>
    <div class="artists">
      <draggable
        class="list-group"
        tag="transition-group"
        :component-data="{
          tag: 'ul',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <li class="list-group-item">
            <div class="handle flex-center">
              <i class="fas fa-bars"></i>
            </div>
            <div class="thumbnail flex-center">
              <img src="https://picsum.photos/id/1004/100" alt="" />
            </div>
            <div class="details">
              <h2>
                <router-link :to="'/songs/'+element.order">{{ element.name }}</router-link>
              </h2>
                {{element}}
              <p>Songs: 20</p>
            </div>
            <!-- <div class="btn flex-center" @click="ToggleFavorite">
              <i
                class="fa fa-heart"
                :class="{ 'is-favorite': isFavorite }"
              ></i>
              
            </div> -->
          </li>
        </template>
      </draggable>
    </div>
  </base-card>
</template>

<script>

import draggable from "vuedraggable";
import BaseCard from "./../components/ui/BaseCard.vue";
const message = [
  "Ed Sheeran",
  "Nirvana",
  "RHCP",
  "Aerosmith",
  "Led Zeppelin",
  "John Frusciante",
  "on",
  "Sortablejs",
];
export default {
  components: {
    draggable,
    BaseCard,
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      }),
      drag: false,
      selectedArtist: null,
    };
  },
  methods: {
    // sort() {
    //   this.list = this.list.sort((a, b) => a.order - b.order);
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
  },
};
</script>

<style scoped>
.artists {
  /* display:flex;
  justify-content:center;
  align-items:center; */
  /* background-color: #ccc; */
  padding: 25px;
  max-width: 800px;
  margin: 0 auto;
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
  background: #c8ebfb;
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
  background: #eee;
  border: 1px solid #ddd;
  cursor: pointer;
  color: #555;
}
.list-group .list-group-item .handle:hover {
  color: #111;
}

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
.list-group .list-group-item .details h2 a{
  text-decoration: none;
  color: inherit;
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