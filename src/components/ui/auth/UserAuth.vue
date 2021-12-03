<template>
  <div class="form-wrapper">
    <div class="form-header">
      <ul class="tab-group">
        <li class="tab" @click.prevent="toggleForm" :class="{ active: login }">
          <a href="">Log In</a>
        </li>
        <li class="tab" @click.prevent="toggleForm" :class="{ active: !login }">
          <a href="">Sign Up</a>
        </li>
      </ul>
    </div>
    <div class="tab-content">
      <transition name="fade" tag="section" mode="out-in">
        <!-- login -->
        <div id="login" key="login" v-if="login">
          <form >
            <div class="form-container">
              <h3>{{ formTitle }}</h3>
              <section v-if="!resetPswd">
                <div class="input-group">
                  <span
                    ><font-awesome-icon icon="envelope"></font-awesome-icon
                  ></span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email address"
                    required
                    v-model.trim="user.email"
                    :class="{ 'error-msg': !formIsValid }"
                    @focus="clearValidity"
                  />
                </div>

                <div class="input-group">
                  <span class="icon"
                    ><font-awesome-icon :icon="lockType" @click="togglePassword"></font-awesome-icon
                  ></span>
                  <input
                    :type="pswdType"
                    required
                    class="form-control"
                    placeholder="Password"
                    v-model.trim="user.password"
                    :class="{ 'error-msg': !formIsValid }"
                    @focus="clearValidity"
                  />
                </div>
              </section>
              <!-- forgot email form -->
              <section v-else>
                <div class="input-group">
                  <span
                    ><font-awesome-icon icon="envelope"></font-awesome-icon
                  ></span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Email Address"
                    required
                    v-model.trim="user.email"
                    :class="{ 'error-msg': !formIsValid }"
                    @focus="clearValidity"
                  />
                </div>
              </section>
              <p class="forgot" @click="toggleResetPswdForm">
                {{ forgotPswdTitle }}
              </p>
              <p
                class="error-text"
                :class="{ valid: goodRequest }"
                v-if="errorText"
              >
                {{ errorText }}
              </p>
            </div>
            <div class="form-footer">
              <button
                v-if="!this.resetPswd"
                @click.prevent="submitForm"
                class="btn"
                :disabled="requestIsPending"
              >
                Log In
              </button>
              <button
                v-else
                @click.prevent="submitForm"
                class="btn"
                :disabled="requestIsPending"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <!-- ="!login" -->
        <div id="signup" key="signup" v-else>
          <form>
            <div class="form-container">
              <h3>Sign Up</h3>
              <div class="input-group">
                <span
                  ><font-awesome-icon icon="user-alt"></font-awesome-icon
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="User Name"
                  required
                  v-model.trim="user.username"
                  :class="{ 'error-msg': !formIsValid }"
                  @focus="clearValidity"
                />
              </div>

              <div class="input-group">
                <span
                  ><font-awesome-icon icon="envelope"></font-awesome-icon
                ></span>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email Address"
                  required
                  v-model.trim="user.email"
                  :class="{ 'error-msg': !formIsValid }"
                  @focus="clearValidity"
                />
              </div>

              <div class="input-group">
                <span class="icon"><font-awesome-icon :icon="lockType" @click="togglePassword"></font-awesome-icon></span>
                <input
                  :type="pswdType"
                  class="form-control"
                  placeholder="Set Password"
                  required
                  v-model.trim="user.password"
                  :class="{ 'error-msg': !formIsValid }"
                  @focus="clearValidity"
                />
              </div>
              <p class="error-text" v-if="errorText" :class="{ valid: goodRequest }">{{ errorText }}</p>
            </div>
            <div class="form-footer">
              <button
                @click.prevent="submitForm"
                :disabled="requestIsPending"
                class="btn"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </transition>
      <div class="loader">
        <the-loader v-if="requestIsPending"></the-loader>
      </div>
    </div>
  </div>
</template>

<script>
import TheLoader from "./../TheLoader.vue";

export default {
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      login: true,
      resetPswd: false,
      formIsValid: true,
      errorText: null,
      requestIsPending: false,
      goodRequest: false,
      showPswd:false
    };
  },
  components: {
    TheLoader,
  },
  methods: {
    toggleForm() {
      this.login = !this.login;

      this.formIsValid = true;
      this.errorText = null;
    },
    toggleResetPswdForm() {
      this.resetPswd = !this.resetPswd;
      this.formIsValid = true;
      this.errorText = null;
      this.user.email = null;
      this.user.password = null;
    },
    clearValidity() {
      this.formIsValid = true;
      this.errorText = null;
    },
    async submitForm() {
      this.formIsValid = true;
      this.requestIsPending = true;
      this.errorText = null;
      this.goodRequest = false;

      if (this.resetPswd) {
        //send user email with new password
        if (!this.user.email || !this.user.email.includes("@")) {
          this.formIsValid = false;
          this.requestIsPending = false;
          return;
        }

        this.$store.dispatch("forgotPassword", this.user.email).then((res) => {
          // console.log(this.errorText);
          if (res==true) {
            this.errorText =
              "We received your request. Please check your email.";
            this.goodRequest = true;
          } else if(!res){
            this.errorText = "User with that email doesnt exist.";
          }else{
            this.errorText = "Something went wrong.";
          }
          this.requestIsPending = false;
          this.user.email = "";
        });
        //
      } else if (this.login) {
        if (
          !this.user.email ||
          !this.user.password ||
          !this.user.email.includes("@")
        ) {
          this.formIsValid = false;
          this.requestIsPending = false;
          return;
        }

        const payload = {
          user: this.user,
          mode: "login",
        };

        this.$store.dispatch("auth", payload).then((res) => {
          if (this.$store.getters.token) {
            this.$router.push("/songs");
            this.$store.commit("activateSidebar")
          } else {
            this.formIsValid = false;
            // this.errorText = "Invalid credentials.";
             this.errorText = res;
          }
            this.requestIsPending = false;
        });
      } else {
        //registering user
        if (
          !this.user.email ||
          !this.user.password ||
          !this.user.email.includes("@") ||
          !this.user.username
        ) {
          this.formIsValid = false;
          this.requestIsPending = false;
          return;
        }

        if (this.user.username.length < 3) {
          this.formIsValid = false;
          this.errorText = "Username must have atleast 3 characters.";
          this.requestIsPending = false;
          return;
        }

        if (this.user.password.length < 6) {
          this.errorText = "Password must have atleast 6 characters.";
          this.formIsValid = false;
          this.requestIsPending = false;
          return;
        }

        const payload = {
          user: this.user,
          mode: "signup",
        };

        this.$store.dispatch("auth", payload).then((res) => {
          if (this.$store.getters.token) {
            this.$router.push("/songs");
            this.$store.commit("activateSidebar")
             this.errorText = "Successfully registered.";
              this.goodRequest=true
          }else{
            this.user.username=""
             this.errorText = res;
          }
            this.requestIsPending = false;
        });
      }
    },
    togglePassword() {
      this.showPswd = !this.showPswd;
    },
  },
  computed: {
    formTitle() {
      if (this.resetPswd) {
        return "Reset Password";
      }
      return "Log In";
    },
    buttonName() {
      if (this.resetPswd) {
        return "Send";
      }
      return "Log In";
    },
    forgotPswdTitle() {
      if (this.resetPswd) {
        return "Back to Log in";
      }
      return "Forgot Password?";
    },
    authUser() {
      return this.$store.getters.user;
    },
    lockType(){
      return this.showPswd ? "lock-open" : "lock"
    },
    pswdType(){
      return this.showPswd ? "text" : "password";
    }
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

.form-wrapper .form-container {
  background: #fefefe;
  padding: 25px 30px 12px 30px;
}
.tab-group {
  list-style: none;
  /* padding: 0; */
  margin: 20px 5px;
}
.tab-group:after {
  content: "";
  display: table;
  clear: both;
}
.tab-group li a {
  display: block;
  text-decoration: none;
  padding: 15px;
  background: rgba(160, 179, 176, 0.25);

  color: var(--white);
  float: left;
  width: 50%;
  text-align: center;
  cursor: pointer;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}
.tab-group li a:hover {
  background: #b62730;
}
.tab-group .active a {
  background: var(--burgundy);
}

.input-group {
  height: 45px;
  margin: 20px 0 20px 0;
  position: relative;
}
.input-group span svg {
  position: absolute;
  top: 33%;
  left: 10px;
}

.input-group input {
  font-size: 18px;
  padding: 8px 12px 8px 32px;
  outline: 0;
  width: 100%;
  height: 100%;

  border: 1px solid #252934;
  border-radius: 4px;
}

.form-control:focus {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.form-control {
  transition: 0.4s;
}

.icon {
  cursor: pointer;
}
.forgot {
  text-align: right;
  cursor: pointer;
}
.forgot a {
  color: inherit;
  text-decoration: none;
}

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
  transition: all 0.3s ease;
}

/* show error  */

/* .error-msg {
  border: var(--burgundy) solid 2px !important;
  -webkit-animation: shake 0.2s ease-in-out 0s 2;
  animation: shake 0.2s ease-in-out 0s 2;
} */
.error-text {
  color: var(--burgundy);
  font-size: 12px;
}
.error-text.valid {
  color: var(--green);
}
/* 
@-webkit-keyframes shake {
  0% {
    margin-left: 0;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0;
  }
}

@keyframes shake {
  0% {
    margin-left: 0;
  }
  25% {
    margin-left: 0.5rem;
  }
  75% {
    margin-left: -0.5rem;
  }
  100% {
    margin-left: 0;
  }
} */

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