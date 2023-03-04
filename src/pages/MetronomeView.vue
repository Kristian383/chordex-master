<template>
  <base-card>
    <section>
      <!-- <h2 class="title-metronome">
        Metronome and Tap Tempo / Beats Per Minute
      </h2> -->

      <div class="metronome-view">
        <!-- :class="{ 'reduce-width': sidebarIsActive && isDesktop }" -->
        <the-metronome></the-metronome>
      </div>
      <div class="blog-about-metronome">
        <div class="about-metronome">
          <h2>What is Metronome?</h2>
          <p>
            A metronome is a practice tool that produces a steady pulse (or
            beat) to help musicians play rhythms accurately. The pulses are
            measured in
            <b>beats-per-minute (BPM)</b>.
          </p>
          <p>
            Common uses of the metronome are helping you to maintain an
            established <u>tempo</u> while practicing, recording and learning
            difficult licks and riffs. You can also use the feature with
            <b>"Tap Tempo"</b> button to find out the rythm of a song.
          </p>
        </div>
        <div class="about-usage">
          <h2>How to use it?</h2>
          <ul>
            <li>
              <b>Sincopation</b> - click on the first circle to toggle accent of
              the first beat
            </li>
            <li>
              <b>Tap tempo</b> - click the red button to find the rythm of the
              songs
            </li>
            <li>
              <b>Manually set tempo</b> - use the slider or the left / right
              arrow keys on your keyboard
            </li>
            <li>
              <b>Measure</b> - change the number of beats in a bar at the very
              bottom of metronome
            </li>
          </ul>
        </div>
        <div class="about-time-signatures">
          <h2>Understanding Time Signatures</h2>
          <p>
            Time signatures are one of the most important indications in music.
            We use them to help <b>divide music into phrases</b> and
            <b>make it easier to memorize and understand</b> music.
          </p>
          <p>
            Time signatures consist of <b>two</b> numbers: a top number and a
            bottom number. The <b>top</b> number indicates the number of beats
            in each measure, while the <b>bottom</b> number tells you what note
            values those beats are. The <u>most used time</u> signature is
            <b>4/4.</b> If the bottom number is a 4, it means the beats are
            quarter notes (four quarter notes in a measure).
          </p>
        </div>
      </div>
    </section>
  </base-card>
</template>

<script>
// import BaseCard from "../components/ui/BaseCard.vue";
import TheMetronome from "../components/ui/TheMetronome.vue";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    // BaseCard,
    TheMetronome,
  },
  setup() {
    const store = useStore();

    const sidebarIsActive = computed(() => {
      return store.getters.sidebarIsActive;
    });

    const isDesktop = computed(() => {
      return !store.getters.isMobile;
    });

    return {
      sidebarIsActive,
      isDesktop,
    };
  },
};
</script>

<style lang="scss" scoped>
.title-metronome {
  text-align: center;
}

.metronome-view {
  margin: 25px auto;
  background-color: #f1f1f1;
  padding: 16px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  max-width: 920px;

  @include md {
    border-radius: 16px;
  }
  // margin: 0 auto;
}

.blog-about-metronome {
  max-width: 720px;
  margin: 42px auto;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 14px;

  @include md {
    gap: 44px;
  }

  p {
    line-height: 28px;
    color: #454545;
    font-size: 18px;
    margin-bottom: 18px;
  }

  mark {
    background-color: #ffcdd2;
    // color: white;
  }

  h2 {
    padding-left: 8px;
    margin-bottom: 14px;
    border-left: 5px solid $burgundy;
  }

  .about-usage {
    ul {
      list-style: none;
      list-style: circle inside;

      li {
        position: relative;
        margin-bottom: 18px;
      }
    }
  }
}
</style>