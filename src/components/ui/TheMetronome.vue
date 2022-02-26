<template>
  <div class="metronome-container">
    <div class="beat-counter">
      <h2>{{ beatCounter }}</h2>
    </div>
    <div class="beat-circles">
      <div
        class="circle"
        :class="{ active: beat == currentBeatCounter }"
        v-for="beat in numberOfBeats"
        :key="beat"
      ></div>
    </div>
    <div class="bars-counter">
      <b
        >Bars counter: <span class="bar-count">{{ currentBarCounter }}</span>
      </b>
    </div>
    <!--  -->
    <div class="slider-container">
      <span class="step-circle">- 5</span>
      <span class="step-circle">- 1</span>
      <!-- slider -->
      <input
        class="range-slider"
        type="range"
        min="30"
        max="250"
        v-model="bpmNumber"
      />
      <span class="step-circle">+ 1</span>
      <span class="step-circle">+ 5</span>
    </div>
    <!--  -->
    <div class="bpm-number">
      <h2>{{ bpmNumber }} BPM</h2>
    </div>

    <div class="btn btn-start">START</div>
    <div class="btn btn-tap">TAP TEMPO</div>

    <div class="beats-in-bar">
      <p>Beats in bar:</p>
      <div class="input-stepper">
        <button class="minus">
          <font-awesome-icon icon="minus"></font-awesome-icon>
        </button>
        <input type="text" value="4" />
        <button class="plus">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const numberOfBeats = ref(4);
    const beatCounter = ref(4);
    const currentBarCounter = ref(0); //1
    const currentBeatCounter = ref(0); //1
    const bpmNumber = ref(100);

    // = computed(() => {
    //   return beatCounter.value;
    // });

    return {
      beatCounter,
      currentBarCounter,
      numberOfBeats,
      bpmNumber,
      currentBeatCounter,
    };
  },
};
</script>

<style lang="scss" scoped>
.metronome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 700px;
  margin: 0 auto;

  @media (min-width: 720px) {
    gap: 36px;
  }

  .beat-counter h2 {
    font-size: 48px;
    font-weight: 700;
    border-bottom: 2px solid #ccc;

  }

  .beat-circles {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 28px;

    .circle {
      border-radius: 100%;
      width: 20px;
      height: 20px;
      background-color: #ccc;
    }

    .circle.active {
      background-color: $burgundy;
    }
  }

  .bar-count {
    padding-left: 8px;
  }

  .slider-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;

    gap: 16px;
    width: 100%;
    text-align: center;

    //   slider - ovo izluciti u scss
    .range-slider {
      max-width: 350px;
      width: 100%;
      -webkit-appearance: none;
      height: 10px;
      border-radius: 5px;
      background: #ccc;
      outline: none;
      order: 1;

      @media (min-width: 720px) {
        order: initial;
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: var(--dark_gray_font);
        cursor: pointer;
        -webkit-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
      }

      &::-webkit-slider-thumb:hover {
        background: #000;
      }

      &:active::-webkit-slider-thumb {
        background: #000;
      }

      &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 50%;
        background: #888;
        cursor: pointer;
        -moz-transition: background 0.15s ease-in-out;
        transition: background 0.15s ease-in-out;
      }

      &::-moz-range-thumb:hover {
        background: #888;
      }

      &:active::-moz-range-thumb {
        background: #888;
      }
    }

    .step-circle {
      border-radius: 8px;
      background-color: rgb(27, 27, 27);
      font-weight: 600;
      color: #fff;
      padding: 8px;
      // margin: 8px;
      display: inline-block;
      min-width: 35px;
      cursor: pointer;

      &:hover {
        background-color: rgb(43, 42, 42);
      }
    }
  }

  .bpm-number h2 {
    font-size: 38px;
  }

  .btn {
    border-radius: 8px;
    // background-color: #ccc;
    padding: 12px;
    color: #fff;
    font-weight: 600;
    width: 180px;
    text-align: center;
    cursor: pointer;
    transition: 0.2s all ease-in;

    &:hover {
      opacity: 0.9;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    }
  }

  .btn-start {
    background-color: $green;
  }

  .btn-tap {
    background-color: $burgundy;
  }

  .beats-in-bar {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid #dedede;

    .input-stepper {
      display: inline-block;
      padding: 5px;

      button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: 20px;
      }

      button[disabled] {
        cursor: not-allowed;
        opacity: 0.4;
      }

      input {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
        font-size: 20px;
        text-align: center;
        width: 50px;
        outline: none;
      }
    }
  }
}
</style>