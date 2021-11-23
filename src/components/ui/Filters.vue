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
  
</template>

<script>

export default {
  
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

</style>