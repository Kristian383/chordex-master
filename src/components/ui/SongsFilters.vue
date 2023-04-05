<template>
  <div
    v-for="filter in allFilters"
    :key="filter"
    class="filter-option"
    :class="{ active: filters[filter] }"
  >
    <input
      :id="filter"
      v-model="filters[filter]"
      type="checkbox"
      @change="setFilter(filter)"
    />
    <label :for="filter">{{ filter }}</label>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useStore } from 'vuex';

const store = useStore(); 

const allFilters = ["all", "favorites", "acoustic", "electric", "easy", "medium", "hard"];
const filters = reactive({
  all: true,
  acoustic: false,
  electric: false,
  easy: false,
  medium: false,
  hard: false,
  favorites: false,
});

function clearFilter() {
  for (const item in filters) filters[item] = false;
}

function setFilter(filter) {
  if (filter === "all") {
    clearFilter();
    filters.all = true;
  } else {
    filters.all = false;
  }
  
  let activeFilters = Object.keys(filters).filter(el => filters[el]);
  if (!activeFilters.length || activeFilters.length === Object.keys(filters).length - 1) {
    clearFilter();
    filters["all"] = true;
    activeFilters = ["all"];
  }
  store.commit("setActiveFilters", activeFilters);
}
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
  font-size: 1.125rem;
  cursor: pointer;
  border-radius: 3.125rem;
  background-color: #e7e7e7;
  padding: 0.625rem 1rem;
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