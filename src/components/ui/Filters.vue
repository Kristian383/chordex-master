<template>
  <nav>
    <div class="categories">
      <span class="filter-option active">
        <input type="checkbox" />
        <label for="all">All</label>
      </span>
      <span class="filter-option">
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
        <label for="capo">Capo</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" />
        <label for="capo">Capo</label>
      </span>
    </div>
  </nav>
</template>

<script>
export default {
  props: ["type", "title"],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.categories {
  display: flex;
  max-width: 800px;
  overflow-x: auto;
  overflow-y: hidden;
}

.categories::-webkit-scrollbar {
  display: none;
}
.filter-option {
  padding: 10px 16px;
  margin-right: 8px;
  border-radius: 16px;
  border: none;
  word-wrap: none;
  white-space: nowrap;
  font-size: inherit;
  background-color: #e7e7e7;
  /* flex: 0 0  auto; */
  transition: all 0.2s ease-in;
}

.filter-option input[type="checkbox"] {
  display: none;
}
.filter-option:hover {
  color: #f1f1f1;
  background-color: #303030;
}

.filter-option.active {
  background-color: #242424;
  color: white;
}
.filter-option:last-child {
  margin-right: 0;
}
</style>