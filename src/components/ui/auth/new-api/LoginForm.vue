<template>
  <form>
    <div class="form-container">
      <h3>Log In</h3>
      <section>
        <div class="input-group">
          <span><font-awesome-icon icon="envelope"></font-awesome-icon></span>
          <input
            v-model.trim="userEmail"
            type="email"
            class="form-control"
            placeholder="Email address"
            required
            :class="{ 'error-msg': !formIsValid }"
            @focus="clearValidity"
          />
        </div>

        <div class="input-group">
          <span
            class="icon"
          ><font-awesome-icon
            :icon="lockType"
            @click="togglePassword"
          ></font-awesome-icon></span>
          <input
            v-model.trim="userPassword"
            :type="pswdType"
            required
            class="form-control"
            placeholder="Password"
            :class="{ 'error-msg': !formIsValid }"
            @focus="clearValidity"
          />
        </div>
        <div class="auth-btn-container">
          <google-btn @click="googleAuth"></google-btn>
        </div>
      </section>
      <p class="forgot" @click="openResetForm">Forgot password?</p>
      <p v-if="errorText" class="feedback-text" :class="{ valid: goodRequest }">
        {{ errorText }}
      </p>
    </div>
    <div class="form-footer">
      <button class="btn" :disabled="isLoading" @click.prevent="submitForm">
        Log In
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import GoogleBtn from "./GoogleBtn.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  components: {
    GoogleBtn,
  },
  props: ["requestIsLoading"],
  emits: ["openResetForm", "isLoading"],

  setup(props, { emit }) {
    const userEmail = ref("");
    const userPassword = ref("");
    const errorText = ref("");
    const goodRequest = ref(false);
    const formIsValid = ref(true);
    const { requestIsLoading } = toRefs(props);

    const isLoading = computed(() => {
      return requestIsLoading.value;
    });

    function openResetForm() {
      emit("openResetForm");
    }

    function clearValidity() {
      formIsValid.value = true;
      errorText.value = "";
    }

    const store = useStore();
    const router = useRouter();

    async function googleAuth() {
      emit("isLoading", true);

      const google_response = await store.dispatch("signInWithGoogle");
      if (!google_response.google_token) {
        errorText.value = google_response.msg;
        emit("isLoading", false);

        return;
      }
      let responseFromMyBackend = await store.dispatch(
        "firebaseBackendCall",
        google_response.google_token
      );

      if (responseFromMyBackend.success) {
        emit("isLoading", false);

        router.push("/songs");
        store.commit("activateSidebar");
      } else {
        errorText.value = responseFromMyBackend.message;
      }
    }

    function submitForm() {
      formIsValid.value = true;
      errorText.value = "";
      goodRequest.value = false;
      emit("isLoading", true);

      if (
        !userEmail.value ||
        !userPassword.value ||
        !userEmail.value.includes("@")
      ) {
        formIsValid.value = false;

        emit("isLoading", false);
        return;
      }

      const payload = {
        user: {
          email: userEmail.value,
          password: userPassword.value,
        },
        mode: "login",
      };

      store.dispatch("auth", payload).then((res) => {
        if (store.getters.token) {
          router.push("/songs");
          store.commit("activateSidebar");
        } else {
          formIsValid.value = false;
          errorText.value = res;
        }

        emit("isLoading", false);
      });
    }

    const showPswd = ref(false);
    function togglePassword() {
      showPswd.value = !showPswd.value;
    }
    const lockType = computed(() => {
      return showPswd.value ? "lock-open" : "lock";
    });
    const pswdType = computed(() => {
      return showPswd.value ? "text" : "password";
    });

    return {
      userEmail,
      userPassword,
      openResetForm,
      errorText,
      goodRequest,
      formIsValid,
      clearValidity,
      togglePassword,
      lockType,
      pswdType,
      googleAuth,
      submitForm,
      isLoading,
      // requestIsLoading,
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
  .forgot {
    text-align: right;
    margin-top: 12px;
    cursor: pointer;
    font-size: 14px;
    a {
      color: inherit;
      text-decoration: none;
    }
  }
  .feedback-text {
    @include feedback-text;
  }
  .feedback-text.valid {
    color: $green;
  }
}

form .loader {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50%;
}

.form-footer {
  @include form-footer;
}
</style>