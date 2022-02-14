<template>
  <form>
    <div class="form-container">
      <h3>Sign Up</h3>
      <div class="input-group">
        <span><font-awesome-icon icon="user-alt"></font-awesome-icon></span>
        <input
          type="text"
          class="form-control"
          placeholder="User Name"
          required
          v-model.trim="userName"
          :class="{ 'error-msg': !formIsValid }"
          @focus="clearValidity"
        />
      </div>

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

      <div class="input-group">
        <span class="icon"
          ><font-awesome-icon
            :icon="lockType"
            @click="togglePassword"
          ></font-awesome-icon
        ></span>
        <input
          :type="pswdType"
          class="form-control"
          placeholder="Set Password"
          required
          v-model.trim="userPassword"
          :class="{ 'error-msg': !formIsValid }"
          @focus="clearValidity"
        />
      </div>
      <p class="feedback-text" v-if="errorText" :class="{ valid: goodRequest }">
        {{ errorText }}
      </p>
    </div>
    <div class="form-footer">
      <button @click.prevent="submitForm" :disabled="isLoading" class="btn">
        Sign Up
      </button>
    </div>
  </form>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {

  props: ["requestIsLoading"],
  setup(props, { emit }) {
    const userEmail = ref("");
    const userName = ref("");
    const userPassword = ref("");
    const errorText = ref("");
    const goodRequest = ref(false);
    const formIsValid = ref(true);

    const { requestIsLoading } = toRefs(props);
    
    const isLoading = computed(() => {
      return requestIsLoading.value;
    });

    function clearValidity() {
      formIsValid.value = true;
    }

    const store = useStore();
    const router = useRouter();

    function submitForm() {
      formIsValid.value = true;
      errorText.value = "";
      goodRequest.value = false;
      emit("isLoading", true);

      if (
        !userEmail.value ||
        !userName.value ||
        !userPassword.value ||
        !userEmail.value.includes("@")
      ) {
        formIsValid.value = false;
        // requestIsPending.value = false;
        emit("isLoading", false);
        errorText.value = "Please check your input.";
        return;
      }

      if (userName.value.length < 3) {
        formIsValid.value = false;
        // requestIsPending.value = false;
        emit("isLoading", false);
        errorText.value = "Username must have atleast 3 characters.";
        return;
      }
      if (userPassword.value.length < 6) {
        formIsValid.value = false;
        // requestIsPending.value = false;
        emit("isLoading", false);
        errorText.value = "Password must have atleast 6 characters.";
        return;
      }

      const payload = {
        user: {
          email: userEmail.value,
          password: userPassword.value,
          username: userName.value,
        },
        mode: "signup",
      };

      store.dispatch("auth", payload).then((res) => {
        if (store.getters.token) {
          router.push("/songs");
          store.commit("activateSidebar");
          errorText.value = "Successfully registered.";
          goodRequest.value = true;
        } else {
          userName.value = "";
          userEmail.value = "";
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
      userName,
      userPassword,
      errorText,
      goodRequest,
      formIsValid,
      clearValidity,
      //   requestIsLoading,
      isLoading,
      submitForm,
      lockType,
      togglePassword,
      pswdType,
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
}

.form-footer {
  @include form-footer;
}
</style>