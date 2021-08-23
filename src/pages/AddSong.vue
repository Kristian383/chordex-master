<template>
  <base-card>
    <div class="form-container">
      <form>
        <div class="top-section">
          Searching...
          <font-awesome-icon
            :icon="iconName"
            :class="{ 'is-favorite': isFavorite }"
            @click="toggleFavorite"
          ></font-awesome-icon>
        </div>
        <div class="grid-2">
          <input type="text" id="input-artist" placeholder="Artist name" />
          <div class="find-data">
            Click to get song info
            <font-awesome-icon icon="question-circle"></font-awesome-icon>
          </div>
          <input type="text" id="input-song" placeholder="Song name" />
          <input type="number" id="input-bpm" placeholder="BPM" />
          <!-- chips -->
          <input type="text" id="chips" placeholder="chips" />
          <input type="number" id="c" placeholder="chips" />
          <!--  -->
          <div class="grid-2">
            <select-box-key :songKeys="songKeys" name="firstKey" ></select-box-key>
            A B C D E F H
          </div>
          <!--  -->
          <div class="grid-2">
            <select-box-key :songKeys="songKeys" name="secondKey"  v-if="needSecondKey && getSelectedKeys.first"></select-box-key>
          A B C D E F H
          </div>
        </div>
      </form>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
import SelectBoxKey from "../components/ui/SelectBoxKey.vue";
export default {
  components: {
    BaseCard,
    SelectBoxKey,
  },
  data() {
    return {
      isFavorite: null,
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
      // selectedKey: null,
      // chooseKeyIsActive: false,
      needSecondKey: true,
    };
  },

  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
    getSelectedKeys(){
      return this.$store.getters.selectedKeys;
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      console.log(this.getSelectedKeys);
    }
  },
};
</script>

<style scoped>
.form-container {
  /* background-color: #fff; */

  color: rgba(0, 0, 0, 0.85);
  padding: 12px 15px;
  max-width: 1400px;
  margin: 0 auto;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-family: Arial, sans-serif !important;
  font-size: 18px;
  border-right: 6px solid rgb(194, 42, 42);
  position: relative;
}
.top-section {
  text-align: center;
}
svg {
  font-size: 24px;
}
.top-section svg {
  position: absolute;
  right: 50px;
}
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 18px;
  align-items: center;
}
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}
.grid-2 .find-data {
  /* width: 50px; */
  color: rgb(136, 136, 136);
  justify-self: center;
  align-self: center;
  text-align: center;
  cursor: pointer;
}
.grid-2 .find-data:hover {
  color: rgba(0, 0, 0, 0.85);
}
form textarea,
form input {
  border: 0;
  outline: 0;
  padding: 1em;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  border-radius: 8px;
  display: block;
  width: 100%;
  margin-top: 1em;
  font-size: inherit;
  -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  resize: none;
}

#input-bpm {
  width: 100px;
  justify-self: center;
}

/* selectbox za key */


.secondOption {
  /* background-color: red; */
  /* justify-self: center; */
  position: relative;
  /* width: 100%; */
  display: flex;
  width: 160px;
  padding: 12px 6px;
  /* align-items: center;
  justify-content: center; */
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