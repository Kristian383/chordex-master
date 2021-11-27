<template>
  <div class="contact">
    <h1>Contact me</h1>
    <form>
      <div class="form-group">
        <label for="email">Email address*</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          v-model.trim="email.val"
          class="form-element"
          placeholder="user@gmail.com"
          :class="{ 'error-msg': !email.isValid }"
          @focus="clearValidity('email')"
        />
      </div>
      <div class="form-group full">
        <label for="message">Message:</label>
        <textarea
          name="message"
          id="message"
          v-model.trim="message.val"
          class="form-element"
          placeholder="Write me"
          rows="10"
          @focus="clearValidity('message')"
          :class="{ 'error-msg': !message.isValid }"
        ></textarea>
      </div>
      <!--  -->
      <!--  -->
      <button @click.prevent="submitForm" :disabled="isSending" class="btn">
        Send
      </button>
      <!-- -->
      <p class="error-text" :class="{ valid: goodRequest }">{{ infoMsg }}</p>
      <!--  -->
      <div class="loader">
        <the-loader v-if="isSending"></the-loader>
      </div>
    </form>
  </div>
</template>

<script>
import TheLoader from "./../TheLoader.vue";

export default {
  components: {
    TheLoader,
  },
  data() {
    return {
      email: {
        val: "",
        isValid: true,
      },
      message: {
        val: "",
        isValid: true,
      },
      infoMsg: "",
      isSending: false,
      goodRequest: false,
    };
  },
  methods: {
    async submitForm() {
      this.goodRequest = false;
      //
      if (!this.email.val.includes("@")) {
        this.infoMsg = "Please insert valid email.";
        this.email.isValid = false;
        return;
      } else if (this.message.val.length > 900) {
        this.infoMsg = "Please insert shorter (900) message.";
        this.message.isValid = false;

        return;
      } else if (!this.message.val) {
        this.infoMsg = "Please insert message.";
        this.message.isValid = false;
        return;
      } else if (this.message.val.length < 30) {
        this.infoMsg = "Sorry, your message seems too small.";
        this.message.isValid = false;
        return;
      } else {
        //dispatch form data
        this.isSending = true;
        this.infoMsg = "Sending...";
        this.$store
          .dispatch("contactMe", {
            email: this.email.val,
            message: this.message.val,
          })
          .then((res) => {
            this.isSending = false;
            if (res) {
              this.infoMsg = "Your message has been sent.";
              this.email.val = "";
              this.message.val = "";
              this.goodRequest = true;
            } else {
              this.infoMsg = "Something went wrong.";
            }
          });
      }
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
    
  },
};
</script>

<style scoped>
.contact {
  max-width: 1280px;
  width: 100%;

  margin: 0 auto;
  padding: 18px;
}

.contact h1 {
  margin-bottom: 16px;
  margin-left: 30px;
}

.contact form {
  display: -ms-grid;
  display: grid;
  position: relative;
  -ms-grid-columns: 1fr;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  background-color: #fff;
  padding: 32px;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
@media (min-width: 768px) {
  .contact form {
    -ms-grid-columns: (1fr);
    grid-template-columns: repeat(2, 1fr);
  }
}
.contact form .form-group.full {
  grid-column: 1 / -1;
}
.contact form .form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--font_black);
}
.contact form .form-group .form-element {
  outline: none;
  border: none;
  display: block;
  width: 100%;
  border-radius: 4px;
  padding: 12px 16px;
  background-color: var(--form_gray);
  -webkit-transition: 0.4s;
  transition: 0.4s;
  font-size: inherit;
}
.form-group .form-element:focus {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: #fff;
}
.contact form .form-group textarea {
  resize: none;
  min-height: 100px;
  font-size: inherit;
}

.btn {
  display: inline-block;
  background: var(--dark_gray_font);
  border-radius: 4px;
  padding: 10px 20px;
  border: none;
  color: var(--white);
  font-size: inherit;
  cursor: pointer;
  width: 80px;
  height: 40px;
  outline: none;
  align-self: center;
  justify-self: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4),
    0 5px 10px -1px rgba(51, 51, 51, 0.3);
  transition: 0.5s ease;
}
.btn:hover {
  background: #59e4a8;
  color: #ffffff;
  text-decoration: none;
}

.loader {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
}

.error-text {
  color: var(--burgundy);
  font-size: 14px;
  /* margin-bottom: 32px; */
}

.error-text.valid {
  color: var(--green);
}
</style>