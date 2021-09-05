<template>
  <div class="home">
    <div class="sign-form info">
      <!-- <span><h2>Welcome!</h2></span> -->
      <user-auth></user-auth>
    </div>
    <div class="home-content">
      <div><h2>Keep track of your songs and store them at one place.</h2></div>
      <img src=".././assets/home.jpg" alt="" />
    </div>
    <!--  -->

    <!-- <div class="info"></div> -->
    <div class="home-content">
      <!-- <div><h2>Keep track of your songs and store them at one place.</h2></div> -->
      <div class="home-photo" id="songs">
        <img src=".././assets/Screenshot_2.png" alt="" />
      </div>
    </div>
    <div class="home-content">
      <h2>Write information about song:</h2>
      <ul>
        <li><h3>Key</h3></li>
        <li><h3>Chords</h3></li>
        <li><h3>BPM</h3></li>
        <li><h3>Chord Progression</h3></li>
        <li><h3>Youtube link</h3></li>
        <li><h3>...</h3></li>
      </ul>
    </div>
  </div>
</template>

<script>
import UserAuth from "./../components/ui/auth/UserAuth.vue";
export default {
  components: {
    UserAuth,
  },
};
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1700px;
  margin: 0 auto;
  height: 100%;
}
@media (min-width: 700px) {
  .home {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* sign form */
.sign-form {
  background-color: #fff;
  position: relative;
  min-height: 500px;
  padding: 0 24px;
}

/*  */
.home-content {
  text-align: center;
}
.home-content ul {
  list-style: none;
}
.home-content li {
  padding: 16px;
  display: block;
  width: 260px;
  text-align: start;
  margin: 0 auto;
}
.home-content h2 {
  padding: 32px 16px;
}
#songs{
  grid-column: 1 / 3;

}
.home-content img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
}
/* .home-photo {
}
@media (min-width: 700px) {
  .home-content {
  }
}
@media (min-width: 800px) {
  .home-content {
  }
}

@media (min-width: 700px) {
  .sign-form {
  }
}
@media (min-width: 800px) {
  .sign-form {
  }
} */
</style>