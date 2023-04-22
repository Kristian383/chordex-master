<template>
  <div class="select-box">
    <div class="options-container" :class="{ active: sortIsActive }">
      <div
        v-for="option in options"
        :key="option"
        class="option"
        @click.prevent="changeSortOption(option)"
      >
        <input
          :id="option"
          type="radio"
          class="radio"
          name="category"
        />
        <label :for="option">{{ option }} </label>
      </div>
    </div>
    <div class="selected" @click="toggleSort">Sort by: {{ selectedSort }}</div>
  </div>
</template>

<script>
export default {
  props: ["options"],
  emits: ["changeSort"],
  data() {
    return {
      sortIsActive: false,
      selectedSort: null,
    };
  },
  methods: {
    toggleSort() {
      this.sortIsActive = !this.sortIsActive;
    },
    changeSortOption(option) {
      this.selectedSort = option;
      this.sortIsActive = false;
      this.$emit("changeSort", option);
    },
  },
};
</script>

<style scoped>
.select-box {
  display: flex;
  width: 180px;
  flex-direction: column;
  position: relative;
  z-index: 36;
  user-select: none;
  font-size: 16px;
}
.select-box .options-container {
  background: #11101d;
  color: #f1f1f1;
  max-height: 0;
  width: 100%;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 4px;
  overflow: hidden;
  order: 1;
  position: absolute;
}
.selected {
  background: #11101d;
  /* margin-bottom: 8px; */
  color: #f1f1f1;
  position: relative;
  order: 0;
  border-radius: 4px;
  text-transform: capitalize;
}
.selected:before {
  content: "";
  position: absolute;
  top: 14px;
  right: 18px;
  width: 6px;
  height: 6px;
  border: 2px solid;
  border-color: transparent transparent #fff #fff;
  transform: rotate(-45deg);
  transition: all 0.3s ease;
}

.select-box .options-container.active {
  opacity: 1;
  max-height: 210px;
  overflow-y: scroll;

  position: absolute;
  top: 50px;
}
.select-box .options-container.active + .selected:before {
  top: 18px;
  transform: rotate(-225deg);
}
.select-box .options-container::-webkit-scrollbar {
  width: 8px;
  background: #363453;
  border-radius: 0 8px 8px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #c22a2a;
  border-radius: 0 8px 8px 0;
}
.select-box .option,
.selected {
  padding: 12px 24px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.select-box .option:hover {
  color: #11101d;
  background: #f1f1f1;
}

.select-box label {
  cursor: pointer;
  text-transform: capitalize;
}

.select-box .option .radio {
  display: none;
}
</style>