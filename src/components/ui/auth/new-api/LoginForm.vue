<template>
  <form>
    <div class="form-container">
      <h3>Log In</h3>
      <section>
        <div class="input-group">
          <span><font-awesome-icon icon="envelope"></font-awesome-icon></span>
          <input
            type="email"
            class="form-control"
            placeholder="Email address"
            required
            v-model.trim="userEmail"
            :class="{ 'error-msg': !formIsValid }"
            @focus="clearValidity"
          />
        </div>

        <div class="input-group">
          <span class="icon"
            ><font-awesome-icon
              :icon="lockType"
              @click="togglePassword"
            ></font-awesome-icon
          ></span>
          <input
            :type="pswdType"
            required
            class="form-control"
            placeholder="Password"
            v-model.trim="userPassword"
            :class="{ 'error-msg': !formIsValid }"
            @focus="clearValidity"
          />
        </div>
        <div class="auth-btn-container">
          <google-btn @click="googleAuth"></google-btn>
        </div>
      </section>
      <p class="forgot" @click="openResetForm">Forgot password?</p>
      <p class="feedback-text" :class="{ valid: goodRequest }" v-if="errorText">
        {{ errorText }}
      </p>
    </div>
    <div class="form-footer">
      <button @click.prevent="submitForm" class="btn" :disabled="isLoading">
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

  setup(props, { emit }) {
    const userEmail = ref("");
    const userPassword = ref("");
    const errorText = ref("");
    const goodRequest = ref(false);
    const formIsValid = ref(true);
    // const requestIsPending = ref(false);
    const { requestIsLoading } = toRefs(props);

    const isLoading = computed(() => {
      return requestIsLoading.value;
    });

    function openResetForm() {
      emit("openResetForm");
    }

    function clearValidity() {
      formIsValid.value = true;
      errorText.value=""
    }

    const store = useStore();
    const router = useRouter();

    async function googleAuth() {
      const google_response = await store.dispatch("signInWithGoogle");

      if (!google_response.google_token) {
        console.log("nismo dobili", google_response.msg);
        errorText.value=responseFromMyBackend.message;

        return;
      }
      let responseFromMyBackend = await store.dispatch(
        "firebaseBackendCall",
        google_response.google_token
      );

      if(responseFromMyBackend.success){
         router.push("/songs")
         store.commit("activateSidebar")
      }else{
        errorText.value=responseFromMyBackend.message;
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
        // requestIsPending.value = false;
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
        // requestIsPending.value = false;
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

.form-footer {
  @include form-footer;
}
</style>