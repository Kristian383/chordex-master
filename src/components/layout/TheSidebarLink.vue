<template>
  <li @click="emitLogOut">
    <router-link :to="`/${routeName}`" :class="{ 'cx-active_item': isActive }">
      <font-awesome-icon :icon="iconName" class="cx-icon" />
      <span class="links_name">{{ label }}</span>
    </router-link>
  </li>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["logOut"]);

function emitLogOut() {
  if (props.iconName !== "sign-out-alt") return;
  emit("logOut");
}
</script>

<style lang="scss" scoped>
li {
  list-style: none;
  height: 3.125rem;
  position: relative;
  width: 100%;
  margin: 0.3125rem 0;

  .cx-icon {
    height: 3.125rem;
    text-align: center;
    cursor: pointer;

    &.fa-plus-square {
      color: var(--green);
    }
  }

  a {
    color: var(--f1_gray);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    transition: all 0.4s ease;
    border-radius: 0.75rem;
    padding-left: 1rem;
    white-space: nowrap;
    font-size: 1rem;

    &:hover {
      color: #11101d;
      background: #f1f1f1;
    }

    .links_name {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
.cx-active_item {
  background: var(--burgundy);

  svg {
    color: #f1f1f1;
  }
}
</style>