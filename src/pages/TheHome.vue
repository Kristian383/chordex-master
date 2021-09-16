<template>
  <div class="home">
    <div class="form">
      <!-- <span><h2>Welcome!</h2></span> -->
      <user-auth></user-auth>
    </div>
    <div class="home-content third">
      <div><h2>Keep track of your songs and store them at one place.</h2></div>
      <div class="photo-div">
        <img src=".././assets/home.jpg" alt="logo" />
      </div>
    </div>
    <!--  -->
    <div class="home-content" id="songs">
      <img src=".././assets/Screenshot_2.png" alt="logo" />
    </div>
    <div class="smaller">
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
    <!-- <n-back-top :right="100" :bottom="500" :visibility-height="100"  /> -->
    <div class="quote-cards">
      
    </div>
  </div>

  <!-- <the-footer></the-footer> -->
</template>

<script>

import UserAuth from "./../components/ui/auth/UserAuth.vue";
// import TheFooter from "./../components/layout/TheFooter.vue";
export default {
  components: {
    UserAuth,
    // TheFooter,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (this.$route.path == "/home") {
      this.$store.commit("removeSidebar");
    }
  },
  computed: {},
};
</script>

<style scoped>
.quote-cards {
  /* grid-column: 1/4; */
  padding: 22px;
}

@media (min-width: 1000px) {
  .quote-cards {
    grid-column: 1/4;
    padding: 72px;
  }
}
.home {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1700px;
  margin: 0 auto;
  height: 100%;
  row-gap: 56px;
}
@media (min-width: 1000px) {
  .home {
    grid-template-columns: repeat(3, 1fr);

    padding: 0 32px 32px 32px;
  }
  .third {
    grid-column: 2/4;
    padding-top: 26px;
  }
  #songs {
    grid-column: 1 / 3;
  }
}

/* sign form */
.form {
  background-color: var(--white);
  position: relative;
  min-height: 500px;
  padding: 0 24px;
}

/*  */
.home-content {
  text-align: center;
}
.home-content h2 {
  font-size: 26px;
  padding: 0 16px;
}

.home-content img {
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
}

.smaller {
  border-top: 6px solid #ff4f5a;
}
@media (min-width: 1000px) {
  .smaller {
    border-left: 6px solid #ff4f5a;
    border-top: 0;
  }
  .home-content h2 {
    font-size: 30px;
  }
}
.smaller li {
  padding: 16px;
  display: block;
  width: 260px;
  margin: 0 auto;
}

.smaller h2 {
  padding: 32px 16px;
  text-align: center;
}
</style>