<template>
  <div class="metronome-container">
    <div class="beat-counter">
      <h2 id="beat-coutner">{{ showBPM }}</h2>
    </div>
    <div class="beat-circles">
      <div
        v-for="beat in beatsPerMeasure"
        :key="beat"
        class="circle"
        :class="{
          active: beat == beatCounter,
          sincopated: beat == 1 && isSincopated ? true : false,
        }"
        @click="toggleSincopation"
      ></div>
    </div>
    <div class="bars-counter">
      <b>Bars counter: <span class="bar-count">{{ barCounter }}</span>
      </b>
    </div>
    <!--  -->
    <div class="slider-container">
      <span class="step-circle" @click="changeTempo(false, 5)">- 5</span>
      <span class="step-circle" @click="changeTempo(false, 1)">- 1</span>
      <!-- slider -->
      <input
        v-model.number="bpmNumber"
        class="range-slider"
        type="range"
        min="30"
        max="250"
      />
      <span class="step-circle" @click="changeTempo(true, 1)">+ 1</span>
      <span class="step-circle" @click="changeTempo(true, 5)">+ 5</span>
    </div>
    <!--  -->
    <div class="bpm-number">
      <h2>{{ bpmNumber }} BPM</h2>
    </div>
    <div class="btn btn-start" @click="toggleMetronome">{{ startOrStop }}</div>
    <div class="btn btn-tap" @click="tapTempo">TAP TEMPO</div>
    <!-- <div class="btn btn-tap" @click="resetBpm">Reset</div> -->
    <p class="reset-bpm" @click="resetBpm">Reset BPM</p>

    <div class="beats-in-bar">
      <p>Beats in bar:</p>
      <div class="input-stepper">
        <button class="minus" @click="changeBeatsInBar(false)">
          <font-awesome-icon icon="minus"></font-awesome-icon>
        </button>
        <span class="bpm-value">{{ beatsPerMeasure }}</span>
        <button class="plus" @click="changeBeatsInBar(true)">
          <font-awesome-icon icon="plus"></font-awesome-icon>
        </button>
      </div>
    </div>
    <p class="toggle-tip">
      You can use <u>spacebar</u> to toggle metronome and &#8592; &#8594; to
      change <u>speed</u>!
    </p>

    <!--  -->
    <audio
      ref="firstClickSound"
      :src="clickFirst"
      class="audio"
      preload="auto"
      type="audio/mp3"
    ></audio>
    <audio
      ref="secondClickSound"
      :src="clickSecond"
      class="audio"
      preload="auto"
      type="audio/mp3"
    ></audio>
  </div>
</template>

<script>
import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from "vue";
import Timer from "../../helpers/TheMetronomeTimer";
import TapBPM from "../../helpers/TheMetronomeTap";

export default {
  setup() {
    const beatsPerMeasure = ref(4);
    const beatCounter = ref(0);
    const barCounter = ref(0);
    const bpmNumber = ref(100);
    const firstClickSound = ref(null);
    const secondClickSound = ref(null);
    const isPlaying = ref(false);
    const isSincopated = ref(true);

    let clickFirst = require("@/assets/sounds/first.mp3");
    let clickSecond = require("@/assets/sounds/second.mp3");

    function playClick() {
      if (beatCounter.value === beatsPerMeasure.value) {
        beatCounter.value = 0;

        if (barCounter.value == 8) {
          barCounter.value = 0;
        }

        barCounter.value++;
      }
      if (beatCounter.value === 0 && isSincopated.value) {
        firstClickSound.value.play();
        // tempoEl.value.src = clickFirst;
        // if (isSincopated.value) firstClickSound.value.play();
        // else secondClickSound.value.play()
      } else {
        // tempoEl.value.src = clickSecond;
        secondClickSound.value.play();
      }

      // tempoEl.value.play();
      beatCounter.value++;
    }
    const metronome = new Timer(playClick, 60000 / bpmNumber.value, {
      immediate: true,
    });

    const unwatch = watchEffect(() => {
      metronome.timeInterval = 60000 / bpmNumber.value;
    });
    onBeforeUnmount(unwatch);

    function changeTempo(sign, step) {
      if (
        (sign && bpmNumber.value === 250) ||
        (!sign && bpmNumber.value === 30)
      )
        return;
      if (sign) {
        bpmNumber.value += step;
      } else {
        bpmNumber.value -= step;
      }
    }

    function toggleMetronome() {
      if (isPlaying.value) {
        metronome.stop();
        beatCounter.value = 0;
        barCounter.value = 0;
        isPlaying.value = false;
      } else {
        metronome.start();
        isPlaying.value = true;
      }
    }

    const tapBpm = new TapBPM();

    function tapTempo() {
      let average = tapBpm.showCurrentBPM();

      if (average) {
        if (average >= 250) bpmNumber.value = 250;
        // else if (average <= 30) bpmNumber.value = 250;
        else bpmNumber.value = average;
      }
    }

    function changeBeatsInBar(sign) {
      barCounter.value = 0;
      beatCounter.value = 0;

      if (sign === true) {
        if (beatsPerMeasure.value == 12) return;

        beatsPerMeasure.value++;
      } else if (sign === false) {
        if (beatsPerMeasure.value == 1) return;

        beatsPerMeasure.value--;
      }
      //  else {
      //   beatsPerMeasure.value = sign.target.value;
      // }
    }

    function handleKeyPress(e) {
      if (e.keyCode === 32) {
        e.preventDefault();
        toggleMetronome();
      } else if (e.keyCode === 37) {
        if (bpmNumber.value === 30) return;

        bpmNumber.value--;
      } else if (e.keyCode === 39) {
        if (bpmNumber.value === 250) return;

        bpmNumber.value++;
      }
    }

    function toggleSincopation() {
      isSincopated.value = !isSincopated.value;
    }

    function resetBpm() {
      tapBpm.resetBpm();
      bpmNumber.value = 100;
    }

    const startOrStop = computed(() => {
      return isPlaying.value ? "STOP" : "START";
    });

    const showBPM = computed(() => {
      return beatCounter.value == 0 ? "--" : beatCounter.value;
    });

    onMounted(() => window.addEventListener("keydown", handleKeyPress));
    onBeforeUnmount(() =>
      window.removeEventListener("keydown", handleKeyPress)
    );

    return {
      beatCounter,
      barCounter,
      beatsPerMeasure,
      bpmNumber,
      toggleMetronome,
      secondClickSound,
      firstClickSound,
      startOrStop,
      changeTempo,
      changeBeatsInBar,
      clickFirst,
      clickSecond,
      tapTempo,
      resetBpm,
      showBPM,
      toggleSincopation,
      isSincopated,
    };
  },
};
</script>

<style lang="scss" scoped>
.metronome-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 26px;
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

    .circle:first-child {
      cursor: pointer;
    }

    .circle.sincopated {
      border: 2px solid black;
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
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
      user-select: none;
      // margin: 8px;
      display: inline-block;
      min-width: 35px;
      cursor: pointer;

      &:hover {
        background-color: rgb(43, 42, 42);
      }
    }
  }

  .toggle-tip {
    font-size: 14px;
    text-align: center;
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
    transition: background-color 0.2s ease-in-out;
    user-select: none;

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

    &:active {
      // transform: translateY(4px);
      transform: scale(0.98);
    }
  }

  .reset-bpm {
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
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

      .bpm-value {
        font-size: 20px;
        width: 50px;
        margin: 0 12px;
        text-align: center;
        user-select: none;
      }
    }
  }
}
</style>