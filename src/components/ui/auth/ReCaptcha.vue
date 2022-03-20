<template>
  <VueRecaptcha
    :sitekey="siteKey"
    :load-recaptcha-script="true"
    @verify="handleSuccess"
    @error="handleError"
    class="captcha-container"
  ></VueRecaptcha>
</template>

<script >
import { computed } from "vue";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ReCaptcha",
  components: {
    VueRecaptcha,
  },
  emits: ["recaptchaCheck"],
  setup(_, { emit }) {
    const siteKey = computed(() => {
      return process.env.VUE_APP_RECAPTCHA;
    });

    const handleError = () => {
      // Do some validation
      emit("recaptchaCheck", false);
    };

    const handleSuccess = () => {
      // Do some validation
      emit("recaptchaCheck", true);
    };

    return {
      handleSuccess,
      handleError,
      siteKey,
    };
  },
};
</script>

<style lang="scss" scoped>
.captcha-container {
  display: flex;
  justify-content: center;
}
</style>

