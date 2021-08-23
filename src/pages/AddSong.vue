<template>
  <base-card>
    <div class="form-container">
      <form>
        <div class="top-section">
          Searching...
          <font-awesome-icon
            :icon="iconName"
            :class="{ 'is-favorite': isFavorite }"
            @click="ToggleFavorite"
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
          <div class="select-box">
            <div class="options-container">
              <div class="option">
                <input
                  type="radio"
                  id="recently"
                  class="radio"
                  name="category"
                />
                <label for="recently">Newest Added</label>
              </div>
            </div>
            <div class="selected" @click="toggleSort">Choose key</div>
          </div>
        </div>
      </form>
    </div>
  </base-card>
</template>

<script>
import BaseCard from "../components/ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
  data() {
    return {
      isFavorite: null,
    };
  },

  computed: {
    iconName() {
      if (!this.isFavorite) {
        return ["far", "heart"];
      }
      return "heart";
    },
  },
  methods: {
    ToggleFavorite() {
      this.isFavorite = !this.isFavorite;
      // this.$store.commit("toggleFavorite", this.id);
    },
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
.select-box {
  display: flex;
  width: 180px;
  flex-direction: column;
  position: relative;
  z-index: 20;
  user-select: none;
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