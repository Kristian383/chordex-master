<template>
  <base-card>
    <div class="keys-accordion">
      <div class="tabs">
        <div
          v-for="(value, key, index) in sortedSongsByKey"
          :key="key"
          class="tab"
        >
          <input :id="'chck' + index" type="checkbox" class="accordion-chk" />
          <label class="tab-label" :for="'chck' + index">{{ key }} maj</label>
          <div class="tab-content">
            <ul>
              <song-by-key v-for="song in value" :key="song" :song="song" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  </base-card>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SongByKey from "./../components/song/SongByKey.vue";

export default {
  name: "Song Keys",
  components: {
    SongByKey,
  },
  setup() {
    const store = useStore();

    const musicKeys = ref([]);
    const songs = ref([]);

    const allKeys = computed(() => {
      return store.getters.getMusicKeys;
    });

    const sortedSongsByKey = computed(() => {
      return store.getters.getSongsByKey;
    });

    return {
      musicKeys,
      songs,
      sortedSongsByKey,
      allKeys,
    };
  },
};
</script>
<style lang="scss" scoped>
.keys-accordion {
  max-width: 800px;
  margin: 32px auto 0 auto;

  .accordion-chk {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  .tabs {
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .tab {
    width: 100%;

    &-label {
      display: flex;
      justify-content: space-between;
      padding: 1em;
      background: $dark_blue_sidebar;
      font-weight: bold;
      cursor: pointer;
      color: #fff;
      text-transform: capitalize;

      // Icon
      &:hover {
        background: darken($burgundy, 10%);
      }

      &::after {
        content: "\276F";
        width: 1em;
        height: 1em;
        text-align: center;
        transition: all 0.35s;
      }
    }

    &-content {
      max-height: 0;
      background: white;
      transition: all 0.35s;

      ul {
        list-style: none;
        display: none;
      }
    }

    &-close {
      display: flex;
      justify-content: flex-end;
      padding: 1em;
      font-size: 0.75em;
      background: $f1_gray;
      cursor: pointer;

      &:hover {
        background: darken($burgundy, 10%);
      }
    }
  }

  input:checked {
    + .tab-label {
      background-color: $burgundy;

      &::after {
        transform: rotate(90deg);
      }
    }

    ~ .tab-content {
      max-height: 100%;
      padding: 8px;

      ul {
        display: block;
      }
    }
  }
}
</style>