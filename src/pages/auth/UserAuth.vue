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
        <div id="login" key="login" v-if="login">
          <form>
            <div class="form-container">
              <h3>Sign In</h3>
              <div class="input-group">
                <span class="icon"
                  ><font-awesome-icon icon="user-alt"></font-awesome-icon>
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="User Name"
                  required
                />
              </div>

              <div class="input-group">
                <span class="icon"
                  ><font-awesome-icon icon="lock"></font-awesome-icon
                ></span>
                <input
                  type="password"
                  required
                  class="form-control"
                  placeholder="User Password"
                />
              </div>
              <p class="forgot"><a href="#">Forgot Password?</a></p>
            </div>
            <div class="form-footer">
              <button type="submit" class="btn">Log In</button>
            </div>
          </form>
        </div>
        <!-- </transition> -->

        <!-- <transition name="fade"  > -->
          <!-- ="!login" -->
        <div id="signup" key="signup" v-else>
          <form action="/" method="post">
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
                />
              </div>

              <div class="input-group">
                <span><font-awesome-icon icon="lock"></font-awesome-icon></span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Set Password"
                  required
                />
              </div>
            </div>
            <div class="form-footer">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: !true,
    };
  },
  methods: {
    toggleForm() {
      this.login = !this.login;
    },
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.6);
   /* transform: translateX(-60px);  */
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
  /* transform: translateX(0);  */
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}


.form-wrapper {
  padding: 16px;
  width: 100%;
  max-width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #424242;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.form-wrapper .form-header {
  background: #252934;
  border-radius: 8px 8px 0px 0px;
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
  font-size: 20px;
  color: #fff;
  float: left;
  width: 50%;
  text-align: center;
  cursor: pointer;
  -webkit-transition: 0.5s ease;
  transition: 0.5s ease;
}
.tab-group li a:hover {
  background: #b62730;
}
.tab-group .active a {
  background: #d8323c;
}

.input-group {
  height: 45px;
  margin: 20px 0 20px 0;
  position: relative;
}
.input-group svg {
  position: absolute;
  top: 27%;
  left: 10px;
}

.input-group input {
  font-size: inherit;
  padding: 8px 12px 8px 32px;
  outline: 0;
  width: 100%;
  height: 100%;

  border: 1px solid #252934;
  border-radius: 4px;
}

.icon {
  cursor: pointer;
}
.forgot {
  text-align: right;
}
.forgot a {
  color: inherit;
  text-decoration: none;
}
.form-footer {
  background: #f4f4f4;
  border-radius: 0px 0px 8px 8px;
  padding: 15px;
  text-align: center;
  width: 100%;
}

.form-footer button {
  display: inline-block;
  background: #252934;
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  color: #fff;
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

@-webkit-keyframes bounceInDown {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-2000px);
  }
  60% {
    opacity: 1;
    -webkit-transform: translateY(30px);
  }
  80% {
    -webkit-transform: translateY(-10px);
  }
  100% {
    -webkit-transform: translateY(0);
  }
}

@-moz-keyframes bounceInDown {
  0% {
    opacity: 0;
    -moz-transform: translateY(-2000px);
  }
  60% {
    opacity: 1;
    -moz-transform: translateY(30px);
  }
  80% {
    -moz-transform: translateY(-10px);
  }
  100% {
    -moz-transform: translateY(0);
  }
}

@-o-keyframes bounceInDown {
  0% {
    opacity: 0;
    -o-transform: translateY(-2000px);
  }
  60% {
    opacity: 1;
    -o-transform: translateY(30px);
  }
  80% {
    -o-transform: translateY(-10px);
  }
  100% {
    -o-transform: translateY(0);
  }
}

@keyframes bounceInDown {
  0% {
    opacity: 0;
    transform: translateY(-2000px);
  }
  60% {
    opacity: 1;
    transform: translateY(30px);
  }
  80% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.bounceInDown {
  -webkit-animation-name: bounceInDown;
  -moz-animation-name: bounceInDown;
  -o-animation-name: bounceInDown;
  animation-name: bounceInDown;
  list-style: none;
}
</style>