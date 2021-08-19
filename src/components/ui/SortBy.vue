<template>
  <div class="select-box" >
    <div class="options-container" :class="{ active: sortIsActive }">
      <div class="option" @click="changeSortOption('newest')">
        <input type="radio" id="recently" class="radio" name="category" />
        <label for="recently">Newest Added</label>
        <!-- <label for="recently">Recently added</label> -->
      </div>
      <div class="option" @click="changeSortOption('oldest')">
        <input type="radio" id="oldest" class="radio" name="category" />
        <label for="oldest">Oldest Added</label>
      </div>
      <div class="option" @click="changeSortOption('alphabet')">
        <input type="radio" id="alphabet" class="radio" name="category" />
        <label for="alphabet">A - Z</label>
      </div>
      <div class="option" @click="changeSortOption('reverse')">
        <input type="radio" id="reverse" class="radio" name="category" />
        <label for="alphabet_reverse">Z - A</label>
      </div>
      <div class="option" @click="changeSortOption('best')">
        <input type="radio" id="best" class="radio" name="best" />
        <label for="best">Best learned</label>
      </div>
      <div class="option" @click="changeSortOption('least')">
        <input type="radio" id="least" class="radio" name="least" />
        <label for="least">Least learned</label>
      </div>
    </div>
    <div class="selected" @click="toggleSort">Sort by: {{ selectedSort }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sortIsActive: false,
      selectedSort: "newest",
    };
  },
  methods: {
    toggleSort() {
      this.sortIsActive = !this.sortIsActive;
    },
    changeSortOption(option) {
      // console.log("changeSortOption", option);
      this.selectedSort = option;
      this.sortIsActive = false;
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
  z-index: 20;
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
  margin-bottom: 8px;
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
  /*display: block;  ovo sam dodao ako neradi click */
}

.select-box .option .radio {
  display: none;
}
</style>