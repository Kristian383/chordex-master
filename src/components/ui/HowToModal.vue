<template>
    <div class="modal-wrapper open" id="modal" ref="modal">
      <div class="modal">
        <div class="modal-header">
          <h3>How to insert valid Youtube link</h3>
        </div>
        <div class="modal-body">
          <img src="@/assets/yt_link.png" alt="" />
        </div>
        <div class="modal-footer">
          <button id="closeModalBtn" @click="closeYtModal">Close</button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  emits: ["closeModal"],
  methods: {
    closeYtModal() {
      this.$emit("closeModal");
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}

.modal {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 380px;
  max-width: 95%;

}
.modal-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
}


@media (min-width: 768px) {
  .modal {
    width: 800px;
  }
}
.modal-header {
  background: var(--burgundy);
  color: #fff;
  padding: 15px 0;
}

.modal-header h3 {
  margin: 0;
}

.modal-body {
  padding: 15px 20px;
}

.modal-body img {
  width: 100%;
  height: 100%;
}

.modal-footer {
  background-color: #eee;
  padding: 15px 0;
}

button {
  background-color: var(--burgundy);
  border-radius: 50px;
  border: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  color: #fff;
  cursor: pointer;
  padding: 10px 25px;
  transition: all 0.1s ease-in-out;
}

button:active {
  opacity: 0.8;
}

button:focus {
  outline: none;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
</style>