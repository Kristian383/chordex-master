<template>
  <li class="song-item">
    <div class="thumbnail flex-center">
      <img :src="song.imgUrl || artistPhoto" alt="Artist" />
    </div>
    <router-link :to="'/songs?artist=' + song.artist">{{
      song.artist
    }}</router-link>
    <router-link :to="'/songs/' + song.songId">{{ song.songName }}</router-link>
    <div class="key-info">{{ song.songKey }}</div>
  </li>
</template>

<script>
import { computed } from "vue";
export default {
  props: ["song"],
  setup() {
    const artistPhoto = computed(() => {
      return require("../../assets/guitar.svg");
    });

    return {
      artistPhoto,
    };
  },
};
</script>

<style lang="scss" scoped>
.song-item {
  display: flex;
  gap: 12px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ccc;
  align-items: center;

  @media (min-width: 720px) {
    gap: 32px;
  }

  .thumbnail {
    padding: 0px 10px;
  }

  .thumbnail img {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    object-fit: cover;
  }

  a {
    text-decoration: none;
    color: inherit;
    font-weight: 600;

    &:hover {
      color: $burgundy;
    }
  }

  a {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: normal;
  }

  .key-info {
    margin-left: auto;
    font-size: 0.9rem;
  }
}
</style>