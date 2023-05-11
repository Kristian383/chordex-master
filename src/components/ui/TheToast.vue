<template>
  <div class="toast">
    <div class="toast-content">
      <font-awesome-icon
        class="status-icon"
        :icon="getStatusIcon"
        :class="status"
      />
      <div class="text-container">
        <span class="status-text">{{ getStatusText }}</span>
        <span class="toast-message">{{ message }}</span>
      </div>
    </div>
    <font-awesome-icon
      v-if="showCloseButton"
      class="close-icon"
      :icon="['far', 'times-circle']"
      @click="closeToast" 
    />
    <div class="progress" :class="status" />
  </div>
</template>
  
<script setup>
import { defineEmits, defineProps, onBeforeMount, onMounted, onUnmounted, computed } from 'vue';
  
const props = defineProps({
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  showCloseButton: {
    type: Boolean,
    required: false,
    default: true
  }
});

const getStatusIcon = computed(() => {
  if (props.status === "Error") return 'exclamation-circle';
  else if (props.status === "Add") return 'check-circle';
  else if (props.status === "Unsuccessful") return 'search-minus';
  return 'minus';
});

const getStatusText = computed(() => {
  if (props.status === "Error") return "Error";
  else if (props.status === "Add") return "Success";
  else if (props.status === "Unsuccessful") return "Unsuccessful";
  return "Deleted";
});
  
const emits = defineEmits(['close']);
  
const closeToast = () => {
  emits('close');
};


onBeforeMount(() => document.body.style.overflowX = 'hidden');
onMounted(() => {
  const timer = setTimeout(() => {
    closeToast();
  }, 3000);
  
  onUnmounted(() => {
    clearTimeout(timer);
    document.body.style.overflowX = 'visible';
  });
});
</script>
  
<style lang="scss" scoped>
  .toast {
    position: relative;
    border-radius: 0.625rem;
    background: #fff;
    padding: 0.875rem;
    box-shadow: 0 6px 20px -5px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    z-index: 1000;
    animation: show_toast 0.5s ease forwards;
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .toast-content {
			display: flex;
			align-items: center;
      gap: 1rem;
      
      .status-icon {
        font-size: 1.325rem;

        &.Add {
          color: var(--green);
        }
        &.Delete {
          color: var(--dark_gray_chips);
        }
        &.Error {
          color: var(--burgundy);
        }
      }

      .text-container {
				display: flex;
				flex-direction: column;
        gap: 0.125rem;
        .status-text {
          font-weight: 600;
          font-size: 1rem;
        }
        .toast-message {
          color: var(--text_gray);
          max-width: 14.5rem;
          font-size: 0.875rem;
        }
      }
      .close {
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        font-size: 1rem;

        &:hover {
          opacity: 1;
        }
      }
    }

    .close-icon {
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text_gray);
      margin-left: auto;

      &:hover {
        color: var(--dark_gray_font);
      }
    }
  }
  
  @keyframes show_toast {
    from {
        transform: translateX(100%);
    }
    to {
				transform: translateX(0);
    }
  }
  
  .toast .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 0.1875rem;
    width: 100%;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      animation: progress 3s linear forwards;
    }

    &.Add:before {
      background-color: var(--green);
    }
    &.Error:before {
      background-color: var(--burgundy);
    }
    &.Delete:before {
      background-color: var(--text_gray);
    }

    @keyframes progress {
      100% {
        right: 100%;
      }
    }
  }
  
  
</style>