<template>
  <span class="filter-option" :class="{ active: isActive }">
    <input type="checkbox" :id="filter" @change="setFilter" />
    <label :for="filter">{{ filter }}</label>
  </span>
  <!-- <span class="filter-option">
        <input type="checkbox" />
        <label for="favorites">Favorites</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="electric">Electric</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="acoustic">Acoustic</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Easy</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Medium</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Hard</label>
      </span> -->
</template>

<script>
export default {
  props: ["filter"],
  computed: {
    isActive() {
      const activeFilters = this.$store.getters.activeFilters;

      if (activeFilters.includes(this.filter)) {
        return true;
      }
      return "";
    },
  },
  methods: {
    setFilter() {
      this.$emit("change-filter", this.filter);
    },
  },
};
</script>

<style scoped>

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
  display: inline-block;
  user-select: none;
  text-transform: capitalize;

  word-wrap: none;
  white-space: nowrap;
}

input[type="checkbox"]:checked + label {
  -webkit-transition: all 500ms ease;
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