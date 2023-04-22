<template>
  <div class="form-wrapper">
    <div class="form-header">
      <h2>Change password</h2>
    </div>
    <!--  -->
    <form class="tab-content">
      <div class="form-container">
        <div class="input-group">
          <span>
            <font-awesome-icon
              :icon="eyeIconType"
              @click="showPswd"
            ></font-awesome-icon>
          </span>
          <input
            v-model="newPswd"
            :type="pswdType"
            class="form-control"
            placeholder="New password"
            required
            :class="{ 'error-msg': !formIsValid }"
            @focus="clearValidity"
          />
        </div>

        <div class="input-group">
          <span><font-awesome-icon icon="lock"></font-awesome-icon> </span>
          <input
            v-model="confirm"
            type="password"
            class="form-control"
            placeholder="Confirm password"
            required
            :class="{ 'error-msg': !formIsValid }"
            @focus="clearValidity"
          />
        </div>
        <p v-if="errorText" class="error-text" :class="{ valid: goodRequest }">
          {{ errorText }} <br /><br />
          <router-link to="/home">Go to home</router-link>
        </p>
      </div>
      <!--  -->
      <div class="form-footer">
        <button
          :disabled="requestIsPending"
          class="btn"
          @click.prevent="submitReset"
        >
          Send
        </button>
      </div>
      <div class="loader">
        <the-loader v-if="requestIsPending"></the-loader>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPswd: "",
      confirm: "",
      formIsValid: true,
      show: false,
      errorText: null,
      requestIsPending: false,
      goodRequest: false,
      token: "",
      email: "",
    };
  },

  computed: {
    pswdType() {
      return this.show ? "text" : "password";
    },
    eyeIconType() {
      return this.show ? "eye-slash" : "eye";
    },
  },
  mounted() {
    this.token = this.$route.query.token;
    this.email = this.$route.query.email;

    if (!this.token || !this.email) {
      this.$router.push("/home");
    }
    this.$store.commit("removeSidebar");
  },
  methods: {
    showPswd() {
      this.show = !this.show;
    },
    clearValidity() {
      this.formIsValid = true;
    },
    async submitReset() {
      this.goodRequest = false;

      this.formIsValid = true;
      this.requestIsPending = true;
      if (!this.newPswd || this.newPswd !== this.confirm || !this.confirm) {
        this.formIsValid = false;
        this.requestIsPending = false;
        this.errorText = "Passwords doesnt match!";
        return;
      } else if (this.newPswd.length < 6) {
        this.formIsValid = false;
        this.requestIsPending = false;
        this.errorText =
          "Password too short. Please enter longer than 6 chars.";
        return;
      } else if (this.newPswd.length > 45) {
        this.formIsValid = false;
        this.requestIsPending = false;
        this.errorText =
          "Password too long. Please enter shorter than 45 chars.";
        return;
      }

      //api call

      this.$store
        .dispatch("resetPassword", {
          token: this.token,
          new: this.newPswd,
          email: this.email,
        })
        .then((res) => {
          if (res === "expired") {
            this.errorText = "Link has expired. Type your email again.";
          } else if (res === "Done") {
            this.errorText =
              "Password successfuly changed. Please log in again with new password.";
            this.goodRequest = true;
          } else {
            this.errorText = "You can only use link once.";
          }

          this.requestIsPending = false;
          setTimeout(() => {
            this.$router.push("/home");
          }, 3000);
        });
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  width: 100%;
  font-size: 16px;
  max-width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  color: var(--font_black);
  padding: 8px 16px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 8px 8px 0 0;
}
@media (min-width: 1000px) {
  .form-wrapper {
    font-size: 18px;
  }
}
.form-wrapper .form-header {
  background: var(--dark_blue_sidebar);
  border-radius: 8px 8px 0 0;
  padding: 10px 17px;
}

.form-header h2 {
  color: #fff;
  text-align: center;
}

.form-wrapper .form-container {
  background: #fefefe;
  padding: 25px 30px 12px 30px;
}
/*  */

.input-group {
  height: 45px;
  margin: 20px 0 20px 0;
  position: relative;
}
.input-group span svg {
  position: absolute;
  top: 33%;
  left: 10px;
  cursor: pointer;
}

.input-group input {
  font-size: 18px;
  padding: 8px 12px 8px 36px;
  outline: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #252934;
  border-radius: 4px;
}

.form-control:focus {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.icon {
  cursor: pointer;
}

/*  */

.form-footer {
  background: var(--f1_gray);
  border-radius: 0 0 8px 8px;
  padding: 15px;
  text-align: center;
  width: 100%;
}

.form-footer button {
  display: inline-block;
  background: var(--dark_blue_sidebar);
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  color: var(--white);
  font-size: inherit;
  cursor: pointer;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4),
    0 5px 10px -1px rgba(51, 51, 51, 0.3);
  transition: 0.5s ease;
}
.form-footer button:hover {
  background: #b62730;
  color: #ffffff;
  text-decoration: none;
}
/*  */
.error-text {
  color: var(--burgundy);
  font-size: 12px;
}
.error-text a {
  text-decoration: none;
  color: #000;
  font-weight: 600;
  font-size: 14px;
}
.error-text a:hover {
  color: var(--dark_gray_font);
}
.error-text.valid {
  color: var(--green);
}
/* loader */
.tab-content {
  position: relative;
}

.loader {
  position: absolute;
  left: 0;
  right: 0;
  /* bottom: 15%; */
  bottom: 40%;
}
</style>