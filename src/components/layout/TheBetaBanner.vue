<template>
  <div class="banner">
    <div class="banner__content">
      <div class="banner__text">
        <strong>"Beta website, development in progress."</strong>
      </div>
      <span class="banner__close"  @click="removeBanner">
        <font-awesome-icon :icon="['far', 'times-circle']"></font-awesome-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    removeBanner(e) {
      e.target.closest(".banner").style.display="none";
    },
  },
};
</script>

<style scoped>
.banner {
  background: var(--burgundy);
}

.banner__content {
  padding: 16px;
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.banner__text {
  line-height: 1.4;
}

.banner__close {
  cursor: pointer;
  font-size: 21px;
  margin-left: 14px;
  color: #ffffff;

}

.banner__text,
.banner__close > span {
  color: #ffffff;
}
</style>