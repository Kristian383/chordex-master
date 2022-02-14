<template>
  <form>
    <div class="form-container">
      <h3>Reset Password</h3>
      <div class="input-group">
        <span><font-awesome-icon icon="envelope"></font-awesome-icon></span>
        <input
          type="email"
          class="form-control"
          placeholder="Email Address"
          required
          v-model.trim="userEmail"
          :class="{ 'error-msg': !formIsValid }"
          @focus="clearValidity"
        />
      </div>
      <p class="forgot" @click="openLoginForm">Back to Log In</p>
      <p class="feedback-text" :class="{ valid: goodRequest }" v-if="errorText">
        {{ errorText }}
      </p>
    </div>

    <div class="form-footer">
      <button @click.prevent="submitForm" class="btn" :disabled="isLoading">
        Send
      </button>
    </div>
  </form>
</template>

<script>
import { ref, toRefs, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: ["requestIsLoading"],
  setup(props, { emit }) {
    const userEmail = ref("");
    // const requestIsPending = ref(false);
    const formIsValid = ref(true);
    const errorText = ref("");

    const goodRequest = ref(false);
    const { requestIsLoading } = toRefs(props);
    const isLoading = computed(() => {
      return requestIsLoading.value;
    });
    const store = useStore();

    function submitForm() {
      formIsValid.value = true;
      errorText.value = "";
      goodRequest.value = false;
      emit("isLoading", true);

      if (!userEmail.value || !userEmail.value.includes("@")) {
        formIsValid.value = false;
        // requestIsPending.value = false;
        emit("isLoading", false);

        return;
      } else {
        store.dispatch("forgotPassword", userEmail.value).then((res) => {
          if (res == true) {
            errorText.value =
              "We received your request. Please check your email (and spam folder).";
            goodRequest.value = true;
          } else if (!res) {
            errorText.value = "User with that email doesnt exist.";
          } else {
            errorText.value = "Something went wrong. Please let us know.";
          }
          // requestIsPending.value = false;
          emit("isLoading", false);

          userEmail.value = "";
        });
      }
    }

    function clearValidity() {
      formIsValid.value = true;
    }

    function openLoginForm() {
      emit("openLogin");
    }

    return {
      userEmail,
      clearValidity,
      errorText,
      formIsValid,
      openLoginForm,
      isLoading,
      submitForm,
      goodRequest,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/colors.scss";
@import "@/assets/styles/auth.scss";

.form-container {
  background: #fefefe;
  padding: 25px 30px 12px 30px;
  .input-group {
    @include input-group;
  }
  .feedback-text {
    @include feedback-text;
  }
  .feedback-text.valid {
    color: $green;
  }
  .forgot {
    text-align: right;
    margin-top: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 14px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
}

.form-footer {
  @include form-footer;
}
</style>