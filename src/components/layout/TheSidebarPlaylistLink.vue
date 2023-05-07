<template>
  <li v-if="isDropdown" class="cx-sidebar-playlist-dropdown-li">
    <div
      class="cx-sidebar-dropdown-toggle"
      tabindex="0"
      @click="toggleDropdown"
      @keydown.enter="toggleDropdown"
    >
      <font-awesome-icon icon="list-ul" />
      <font-awesome-icon class="cx-dropdown-chevron" :icon="dropdownIconName" />
      <span class="link_name">Playlists</span>
    </div>
    <ul v-if="isDropdownOpen" class="cx-sidebar-dropdown-list">
      <li v-for="playlist in playlists" :key="playlist" class="cx-dropdown-list-item">
        <router-link 
          :to="getPlaylistUrl(playlist)"
          :class="{'active-playlist-link': $route.query?.playlist === playlist}"
        >
          {{ playlist }}
        </router-link>
      </li>
    </ul>
  </li>
  <li v-else class="cx-sidebar-link-li" @click.capture="emitLogOut">
    <router-link :to="`/${routeName}`" :class="{ 'cx-active_item': isActive }">
      <font-awesome-icon :icon="iconName" class="cx-icon" />
      <span class="links_name">{{ label }}</span>
    </router-link>
  </li>
</template>

<script setup>
import { computed, ref } from "vue";

const emit = defineEmits(["logOut"]);
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
  isDropdown: {
    type: Boolean,
    required: false
  },
  playlists: {
    type: Array,
    required: false,
    default: () => []
  }
});

const isDropdownOpen = ref(false);

const dropdownIconName = computed(() => isDropdownOpen.value ? "chevron-up" : "chevron-down");

const getPlaylistUrl = computed(() => (playlistName) => {
  return "/songs?playlist=" + encodeURIComponent(playlistName);
});

function emitLogOut() {
  if (props.iconName !== "sign-out-alt") return;
  emit("logOut");
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>

<style lang="scss" scoped>
.cx-sidebar-link-li {
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
    border-radius: 0.75rem;
    padding-left: 1rem;
    white-space: nowrap;
    font-size: 1rem;

    &:hover {
      background: #1d2634;
    }

    .links_name {
      opacity: 1;
      pointer-events: auto;
    }
  }
}
  
.cx-sidebar-playlist-dropdown-li {
    cursor: pointer;
    min-height: 3.125rem;
    border-radius: 0.75rem;
    transition: all 0.4s ease;

    &:hover {
      background: #1d2634;
    }

    .cx-sidebar-dropdown-toggle {
      display: flex;
      height: 3.125rem;
      color: var(--f1_gray);
      gap: 1.5rem;
      align-items: center;
      padding-left: 1rem;
      white-space: nowrap;
      user-select: none;
      font-size: 1rem;
      position: relative;

      .cx-dropdown-chevron {
        position: absolute;
        top: 1.125rem;
        right: 1rem;
      }
    }

    .cx-sidebar-dropdown-list {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
      @include scrollbar;

      .cx-dropdown-list-item {
        width: 100%;

        a {
          text-decoration: none;
          color: var(--f1_gray);
          font-size: 0.875rem;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          padding: 0.5rem 0.5rem 0.5rem 3.5rem;
        }
        
        &:hover {
          background-color: var(--dark_blue_sidebar);
        }

        .active-playlist-link {
          text-decoration: underline;
          text-underline-offset: 0.3125rem;
        }
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