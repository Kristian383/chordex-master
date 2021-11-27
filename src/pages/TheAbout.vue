<template>
  <div class="about">
    <div class="about-picture">
      <img src="@/assets/green.jpg" alt="" />
    </div>
    <div class="about-text">
      <h2>Why should I use this website?</h2>
      <p>
        What a better way of keeping the information about the songs than having
        it <u>all in one place</u> just with couple of clicks. Chordex is
        imagined to be a virtual songbook where you can write your own
        information about songs that you learn. Not only can you easily refresh
        your memory, but also speed up the learning process and have more songs
        under your repertoire. <br />
        <br />
        Having insight of key and chord progressions of each song will
        eventually help you grasp concepts of writing a song. Keep all the main
        information at one place and learn much quicker!
      </p>
    </div>
    <!-- <div class="contact">
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
        <div class="submit-group">
          <button @click.prevent="submitForm" :disabled="isSending" class="btn">Send</button>
        </div>
        <p>{{ infoMsg }}</p>
        <div class="loader">
          <the-loader v-if="isSending"></the-loader>
        </div>
      </form>
    </div> -->
    <contact-me></contact-me>
  </div>
</template>

<script>
// import TheLoader from "./../components/ui/TheLoader.vue";
import ContactMe from "./../components/ui/auth/ContactMe.vue";

export default {
  components: {
    // TheLoader,
    ContactMe
  },
  mounted() {
    if (this.$route.path == "/about") {
      this.$store.commit("removeSidebar");
    }
  },
  // data() {
  //   return {
  //     email: {
  //       val: "",
  //       isValid: true,
  //     },
  //     message: {
  //       val: "",
  //       isValid: true,
  //     },
  //     infoMsg: "",
  //     isSending: false,
  //   };
  // },
  // methods: {
  //   async submitForm() {
  //     if (!this.email.val.includes("@")) {
  //       this.infoMsg = "Please insert valid email.";
  //       this.email.isValid = false;
  //       return;
  //     } else if (this.message.val.length > 900) {
  //       this.infoMsg = "Please insert shorter (900) message.";
  //       this.message.isValid = false;

  //       return;
  //     } else if (!this.message.val) {
  //       this.infoMsg = "Please insert message.";
  //       this.message.isValid = false;
  //       return;
  //     } else if (this.message.val.length < 30) {
  //       this.infoMsg = "Sorry, your message seems too small.";
  //       this.message.isValid = false;
  //       return;
  //     } else {
  //       //dispatch form data
  //       this.isSending = true;
  //       this.infoMsg = "Sending...";
  //       this.$store
  //         .dispatch("contactMe", {
  //           email: this.email.val,
  //           message: this.message.val,
  //         })
  //         .then((res) => {
  //           this.isSending = false;
  //           if (res) {
  //             this.infoMsg = "Your message has been sent.";
  //             this.email.val = "";
  //             this.message.val = "";
  //           } else {
  //             this.infoMsg = "Something went wrong.";
  //           }
  //         });
  //     }
  //   },
  //   clearValidity(input) {
  //     this[input].isValid = true;
  //   },
  // },
};
</script>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1600px;
  margin: 0 auto;
  justify-items: center;
  align-items: center;
}
@media (min-width: 1000px) {
  .about {
    grid-template-columns: repeat(2, 1fr);
  }
}

.about-picture {
  max-width: 600px;
  max-height: 600px;
}
.about-picture img {
  width: 100%;
  height: 100%;
}

.about-text {
  width: 100%;
  line-height: 31px;
  text-align: justify;
  border-top: 6px solid #59e4a8;
  padding: 16px;
}
.about-text h2 {
  text-align: center;
}

.about-text div {
  width: 100%;
}

.about-text p {
  max-width: 550px;
  font-size: 18px;
  margin: 0 auto;
  padding: 18px;
}
@media (min-width: 1000px) {
  .about-text h2 {
    text-align: start;
  }
  .about-text p {
    margin-left: 0;
    padding-left: 0;
  }
  .about-text {
    border-left: 6px solid #59e4a8;
    border-top: 0;
  }
}

/* contact */
/* 
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
.contact p {
  color: var(--dark_gray_font);
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 32px;
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
.contact form .submit-group {
  grid-column: 1 / -1;
  text-align: right;
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
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4),
    0 5px 10px -1px rgba(51, 51, 51, 0.3);
  transition: 0.5s ease;
}
.btn:hover {
  background: #59e4a8;
  color: #ffffff;
  text-decoration: none;
}

.loader{
  position: absolute; 
  left: 0; 
  right: 0; 
  bottom: 10%;

} */

/* .confirmation{
  border: #59e4a8 solid 2px !important;

} */
</style>