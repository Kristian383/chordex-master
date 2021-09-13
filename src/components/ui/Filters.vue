<template>
  <span
    class="filter-option"
    :class="{ active: filters[filter] }"
    v-for="filter in allFilters"
    :key="filter"
  >
    <input
      type="checkbox"
      :id="filter"
      @change="setFilter"
      v-model="filters[filter]"
    />
    <label :for="filter">{{ filter }}</label>
  </span>
  <!-- </n-config-provider> -->
  <!-- <span class="arrow right" @click="moveRight">
    <font-awesome-icon icon="angle-right"></font-awesome-icon>
  </span> -->
</template>

<script>
// import { NConfigProvider } from 'naive-ui'

export default {
  components: {
    // NConfigProvider ,
  },
  emits: ["filters-changed"],
  props: ["active"],
  data() {
    return {
      allFilters: [
        "all",
        "favorites",
        "acoustic",
        "electric",
        "easy",
        "medium",
        "hard",
      ],
      filters: {
        all: true,
        acoustic: false,
        electric: false,
        easy: false,
        medium: false,
        hard: false,
        favorites: false,
      },
    };
  },

  methods: {
    setFilter(e) {
      const item = e.target.id;
      if (item == "all") {
        this.filters = {
          all: true,
          acoustic: false,
          electric: false,
          easy: false,
          medium: false,
          hard: false,
          favorites: false,
        };
      } else {
        this.filters["all"] = false;
      }

      let activeFilters = [];
      for (const item in this.filters) {
        if (this.filters[item]) {
          activeFilters.push(item);
        }
      }
      if (!activeFilters.length) {
        this.filters["all"] = true;
      }
      this.$emit("filters-changed", activeFilters);
    },
  },
};
</script>

<style scoped>
/* .arrow.left,
.arrow.right {
  width: 20px;
  height: 20px;
  text-align: center;
  align-self: center;
  cursor: pointer;
  position: absolute;
  font-size: 22px;
  z-index: 56;
}

.arrow.left{
  left: 0;
}
.arrow.right{
  right: 0;
} */

.filter-option.active > label {
  background-color: #242424;
  color: white;
  
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  transition: all 500ms ease;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50px;
  background-color: #e7e7e7;
  padding: 10px 16px;
  border: none;
  user-select: none;
  text-transform: capitalize;
  word-wrap: none;
  white-space: nowrap;
  margin-right: 4px;
  
  display: inline-block;
}
input[type="checkbox"]:checked + label {
  transition: all 500ms ease;
  background-color: #242424;
  color: white;
}

/* .filter-option {
  padding: 10px 16px;
  margin-right: 8px;
  border-radius: 16px;
  border: none;

  word-wrap: none;
  white-space: nowrap;
  font-size: inherit;
  text-transform: capitalize;
  background-color: #e7e7e7;
  transition: all 0.2s ease-in;
}

.filter-option input[type="checkbox"] {
  display: none;
}
input[type="checkbox"]:checked + label {
  background-color: #242424;
  color: white;
  user-select: none;
}
.filter-option label:hover {
  cursor: pointer;
}
.filter-option:hover {
  color: #f1f1f1;
  background-color: #303030;
  cursor: pointer;
}

.filter-option.active {
  background-color: #242424;
  color: white;
}
.filter-option:last-child {
  margin-right: 0;
} */
</style>