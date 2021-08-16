<template>
  <span class="filter-option" :class="{ active: isActive }">
    <input
      :checked="isActive"
      type="checkbox"
      :id="filter"
      @change="setFilter"
    />
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
  props: ["filter", "activeFilters"],
  data() {
    return {};
  },
  computed: {
    isActive() {
      if (this.activeFilters[this.filter]) {
        return true;
      }
      return false;
    },
  },
  methods: {
    setFilter(e) {
      const isActive = e.target.checked;
      let updatedFilters;
      if (this.filter == "all" && isActive) {
        updatedFilters = {
          all: true,
          favorites: false,
          acoustic: false,
          electric: false,
          easy: false,
          medium: false,
          hard: false,
        };
      } else {
        updatedFilters = {
          ...this.activeFilters,
          [this.filter]: isActive,
          all: false,
        };
      }
      this.$emit("change-filter", updatedFilters);
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
  display: inline-block;
  user-select: none;
  text-transform: capitalize;

  word-wrap: none;
  white-space: nowrap;
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