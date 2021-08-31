<template>
  <div class="select-box">
    <div class="options-container" :class="{ active: chooseKeyIsActive }">
      <div
        class="option"
        v-for="songKey in songKeysWithUniqueId"
        :key="songKey.id"
        :name="name"
        @click="chooseKey(songKey.key)"
      >
        <input type="radio" :id="songKey.id" class="radio" name="category" />
        <label :for="songKey.id">{{ songKey.key }}</label>
      </div>
    </div>
    <div class="selected" @click="toggleChoose">
      <span v-if="name=='secondKey'">
        Key change:</span>
        <span v-else>Song key:</span> {{ selectedKey }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  emits:["checkStore"],
  data() {
    return {
      selectedKey: null,
      chooseKeyIsActive: false,
      songKeys: [
        "C",
        "G",
        "D",
        "A",
        "E",
        "B",
        "F#",
        "C#",
        "F",
        "Bb",
        "Eb",
        "Ab",
        "Db",
        "Gb",
        "Cb",
      ],
    };
  },
  methods: {
    toggleChoose() {
      this.chooseKeyIsActive = !this.chooseKeyIsActive;
    },
    chooseKey(key) {
      this.selectedKey = key;
      this.chooseKeyIsActive = false;
      const payload = {
        name: this.name,
        key: this.selectedKey,
      };
      this.$store.commit("selectKey", payload);
      // console.log(payload);
      this.$emit("checkStore")
      
    },
  },
  computed: {
    songKeysWithUniqueId() {
      const newKeys = [];
      this.songKeys.forEach((key) => {
        const id = Math.random().toString(36).substring(2);
        newKeys.push({ key, id });
      });
      return newKeys;
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
  user-select: none;
}
.select-box .options-container {
  background: #fff;
  /* color: #f1f1f1; */
  max-height: 0;
  width: 50%;
  text-align: center;
  opacity: 0;
  transition: all 0.4s;
  border-radius: 4px;
  overflow: hidden;
  order: 1;
  position: absolute;
}
.selected {
  box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
  margin-bottom: 8px;
  background-color: #fff;
  position: relative;
  color: inherit;
  order: 0;
  border-radius: 4px;
  text-transform: capitalize;
}
.selected:before {
  content: "";
  position: absolute;
  top: 14px;
  right: 12px;
  width: 6px;
  height: 6px;
  border: 2px solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.85) rgba(0, 0, 0, 0.85);
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
  background: #ccc;
  border-radius: 0 8px 8px 0;
}

.select-box .options-container::-webkit-scrollbar-thumb {
  background: #292828;
  border-radius: 0 8px 8px 0;
}
.select-box .option,
.selected {
  padding: 12px 20px;
  cursor: pointer;
  transition: all 0.5s ease;
}
.select-box .option:hover {
  /* color: #11101d; */
  background: #d8d8d8;
}

.select-box label {
  cursor: pointer;
  /*display: block;  ovo sam dodao ako neradi click */
}

.select-box .option .radio {
  display: none;
}

.secondOption {
  /* background-color: red; */
  justify-self: center;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}
.secondOption #secondSelectOption {
  display: inline-block;
  width: 20px;
  /* margin-left: 4px; */
  margin-top: 0;
  height: 18px;
}
</style>