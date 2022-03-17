<template>
  <div class="form-wrapper">
    <div class="form-header">
      <ul class="tab-group">
        <li
          class="tab"
          @click.prevent="openLoginForm"
          :class="{ active: showLogin }"
        >
          <p>ChordEx</p>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <transition name="fade" tag="section" mode="out-in">
        <!-- login -->
        <div id="login" key="login" v-if="showLogin">
          <login-form
            @open-reset-form="openResetForm"
            @is-loading="setRequestLoading"
            :request-is-loading="reqIsLoading"
          ></login-form>
        </div>
        <!-- reset -->
        <div id="reset" key="reset" v-else-if="showReset">
          <forgot-form
            @open-login="openLoginForm"
            @is-loading="setRequestLoading"
            :request-is-loading="reqIsLoading"
          ></forgot-form>
        </div>
        <!-- ="signup" -->
        <!-- <div id="signup" key="signup" v-else>
          <register-form
            @is-loading="setRequestLoading"
            :request-is-loading="reqIsLoading"
          ></register-form>
        </div> -->
      </transition>
      <div class="loader" v-if="reqIsLoading">
        <the-loader></the-loader>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoader from "./../../TheLoader.vue";
import ForgotForm from "./ForgotForm.vue";
import LoginForm from "./LoginForm.vue";

import { ref } from "vue";
export default {
  components: {
    TheLoader,
    ForgotForm,
    LoginForm,
  },
  setup() {
    const showLogin = ref(true);
    const showReset = ref(false);
    const reqIsLoading = ref(false);

    function openLoginForm() {
      showLogin.value = true;
      showReset.value = false;
    }
    function openResetForm() {
      showLogin.value = false;
      showReset.value = true;
    }
    function setRequestLoading(data) {
      reqIsLoading.value = data;
    }

    return {
      showLogin,
      showReset,
      setRequestLoading,
      openResetForm,
      openLoginForm,
      reqIsLoading,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixins.scss";
@import "@/assets/styles/colors.scss";
@import "@/assets/styles/auth.scss";

.form-wrapper {
  @include form-wrapper;
  .form-header {
    background: $dark_blue_sidebar;
    border-radius: 8px 8px 0 0;
    padding: 10px 17px;

    .tab-group {
      list-style: none;
      margin: 20px 5px;
      &:after {
        content: "";
        display: table;
        clear: both;
      }
      li p {
        display: block;
        text-decoration: none;
        padding: 15px;
        background: $burgundy;

        color: $white;
        // float: left;
        // width: 50%;
        text-align: center;
        // cursor: pointer;
        // -webkit-transition: 0.3s ease;
        // transition: 0.3s ease;
        // // &:hover {
        //   background: #b62730;
        // }
      }
      .active a {
        background: $burgundy;
      }
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

/* loader */
.tab-content {
  position: relative;
}

.loader {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 50%;
}
</style>