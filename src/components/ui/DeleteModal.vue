<template>
  <div class="delete-modal-wrapper" @click.self="closeDeleteModal">
    <div class="delete-modal">
      <div class="modal-header">
        <span><font-awesome-icon icon="trash-alt" class="trash-icon" /></span>
        <h3>Delete account?</h3>
      </div>
      <div class="modal-body">
        <p>
          You'll <b>permanently</b> lose all your data and there is no way
          back.
        </p>
        <p>
          We will send you <b>link</b> on your email to make sure its really
          you.
        </p>
      </div>
      <div class="modal-footer">
        <button class="btn cancel-btn" @click="closeDeleteModal">
          Cancel
        </button>
        <button class="btn delete-btn" @click="sendDeleteEmail">
          Send delete email
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["closeModal", "send-delete"],
  methods: {
    closeDeleteModal() {
      this.$emit("closeModal");
    },
    sendDeleteEmail() {
      this.$emit("send-delete");
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-modal-wrapper {
  @include modal-wrapper;

  .delete-modal {
    @include center-inner-modal;
    max-width: 28.125rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border-top: 0.375rem solid var(--burgundy);
    color: var(--dark_gray_font);
    border-radius: 0.25rem;
    gap: 1.125rem;

    .modal-header {
      display: flex;
      flex-direction: column;
      position: relative;
      padding-top: 0.5rem;

      span {
        width: 3.125rem;
        height: 3.125rem;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: -1.25rem;
        transform: translate(-50%, -50%);
        padding: 0.25rem;
        background-color: var(--burgundy);

        .trash-icon {
          font-size: 1.75rem;
          color: #fff;
          margin-top: 6px;
          margin-left: 1px;
        }
      }
    }

    .modal-body p {
      font-size: 1rem;
      margin-bottom: 1.125rem;
    }

    .modal-footer {
      display: flex;
      gap: 0.5rem;
      .btn {
        padding: 0.75rem 0.5rem;
        border-radius: 0.5rem;
        width: 100%;
        outline: none;
        background-color: #f8f8f8;
        border: none;
        cursor: pointer;
        font-size: inherit;
        font-weight: 600;
        transition: 0.2s all ease-in;
      }

      .btn.delete-btn {
        background-color: var(--burgundy);
        color: #fff;

        &:hover {
          background-color: var(--levi_red);
        }
      }

      .btn.cancel-btn {
        border: 1px solid var(--chips_gray);

        &:hover {
          background-color: var(--chips_gray);
        }
      }
    }
  }
}
</style>