<template>
  <div class="grid-2">
    <div class="select-box">
      <div class="options-container" :class="{ active: chooseKeyIsActive }">
        <div
          class="option"
          v-for="songKey in songKeysWithUniqueId"
          :key="songKey.id"
          :name="name"
          @click="chooseKey(songKey)"
        >
          <input type="radio" id="songKey.key" class="radio" name="category" />
          <label :for="songKey.key">{{ songKey.key }}</label>
        </div>
      </div>
      <div class="selected" @click="toggleChoose">
        <span v-if="name == 'secondKey'">Change:</span>
        <span v-else>Key:</span>
        {{ selectedKey }}
      </div>
    </div>
    <div class="qualities" v-if="selectedKey">
      <input
        value="major"
        type="radio"
        :name="name"
        :id="qualities.major"
        v-model="selectedQuality"
      /><label :for="qualities.major" @click="chooseQualityKey('major')"
        >Maj
      </label>
      <input
        type="radio"
        :name="name"
        :id="qualities.minor"
        value="minor"
        v-model="selectedQuality"
      /><label :for="qualities.minor" @click="chooseQualityKey('minor')"
        >Min</label
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "spotifyKey"],
  emits: ["keySelected"],
  data() {
    return {
      selectedKey: null,
      chooseKeyIsActive: false,
      qualities: {
        major: Math.random().toString(36).substring(2),
        minor: Math.random().toString(36).substring(2),
      },
      selectedQuality: null,
      payload: {},
    };
  },
  methods: {
    toggleChoose() {
      this.chooseKeyIsActive = !this.chooseKeyIsActive;
    },
    chooseKey(selected) {
      this.selectedKey = selected.key;
      this.chooseKeyIsActive = false;
    },
    chooseQualityKey(quality) {
      if (!this.selectedKey) {
        return;
      }
      let notes = this.$store.getters.getMusicKeys;
      if (quality == "major") {
        notes = notes.filter((key) => key.key == this.selectedKey)[0].notes;
      } else {
        notes = notes.filter((key) => {
          if (this.selectedKey == "Db") {
            return key.relativeMinor == "C#";
          } else if (this.selectedKey == "Gb") {
            return key.relativeMinor == "F#";
          } else if (this.selectedKey == "Cb") {
            return key.relativeMinor == "G#";
          } else {
            return key.relativeMinor == this.selectedKey;
          }
        })[0].notes;
      }
      this.payload.notes = notes.map((el) => el).join(" ");
      this.payload.name = this.name;
      this.payload.key = this.selectedKey + " " + quality;

      this.$emit("keySelected", this.payload);
    },
  },
  computed: {
    songKeysWithUniqueId() {
      const songKeysCopy = this.$store.getters.getMusicKeys.map((el) => el);

      return songKeysCopy;
    },
  },
  watch: {
    spotifyKey: function () {
      if (this.spotifyKey) {
        const payload = {
          key: this.spotifyKey.split(" ")[0],
          quality: this.spotifyKey.split(" ")[1],
        };
        this.selectedQuality = payload.quality;
        this.chooseKey(payload);
        this.chooseQualityKey(payload.quality);
      }
    },
  },
};
</script>

<style scoped>
.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.qualities {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.qualities input[type="checkbox"],
.qualities input[type="radio"] {
  display: none;
}

.qualities input[type="checkbox"] + label,
.qualities input[type="radio"] + label {
  transition: all 500ms ease;
  cursor: pointer;
  border-radius: 4px;
  background-color: #fff;
  padding: 6px;
  text-align: center;
  border: none;
  display: inline-block;
  user-select: none;
  text-transform: capitalize;
  font-size: 15px;
  font-weight: 600;

  margin-top: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.qualities input[type="checkbox"]:checked + label,
.qualities input[type="radio"]:checked + label {
  transition: all 500ms ease;
  background-color: var(--dark_gray_font);
  color: #fff;
}

/*  */
.select-box {
  display: flex;
  width: 150px;
  flex-direction: column;
  position: relative;
  z-index: 20;
  user-select: none;
}
.select-box .options-container {
  background: #fff;
  max-height: 0;
  width: 100%;
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
  background: #d8d8d8;
}

.select-box label {
  cursor: pointer;
}

.select-box .option .radio {
  display: none;
}

.secondOption {
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
  margin-top: 0;
  height: 18px;
}
</style>