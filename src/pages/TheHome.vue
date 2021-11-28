<template>
  <div class="home">
    <!-- auth -->
    <div class="form" v-if="!isLogged">
      <!-- <span><h2>Welcome!</h2></span> -->
      <user-auth></user-auth>
    </div>
    <div class="home-content third" :class="{ logged: isLogged }">
      <div>
        <h2>
          Keep track of your songs and store them at one place with ChordEx.
        </h2>
      </div>
      <div class="photo-div">
        <img src="@/assets/home.jpg" alt="logo" />
      </div>
    </div>
    <!--  -->
    <div class="home-content" id="songs">
      <img src="@/assets/home_cards.png" alt="logo" />
    </div>
    <div class="smaller">
      <h2>Write information about songs:</h2>
      <ul>
        <li><h3>Key</h3></li>
        <li><h3>Chords</h3></li>
        <li><h3>BPM</h3></li>
        <li><h3>Chord Progression</h3></li>
        <li><h3>Youtube link</h3></li>
        <li><h3>...</h3></li>
      </ul>
    </div>
    <!-- <div class="home-content">
      <div class="" id="songs">
        <img src="@/assets/home_chordex.png" alt="logo" />
      </div>
    </div> -->
    <!--  -->
  </div>
</template>

<script>
import UserAuth from "./../components/ui/auth/UserAuth.vue";
export default {
  components: {
    UserAuth,
  },
  mounted() {
    if (this.$route.path == "/home") {
      this.$store.commit("removeSidebar");
    }
  },
  computed: {
    isLogged() {
      return !!this.$store.getters.token;
    },
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
@media (min-width: 1000px) {
  .home {
    grid-template-columns: repeat(3, 1fr);
    row-gap: 56px;

    padding: 0 32px 32px 32px;
  }

  .third {
    grid-column: 2/4;
    padding-top: 26px;
  }

  .third.logged {
    grid-column: 1/4;
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
/* za produljivati slike */
/* .home-wrapper {
  display: flex;
  flex-direction: column;
}
.home-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 4;
  order: 2;
}

@media (min-width: 700px) {
  .home-wrapper {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  .home-content {
    order: 1;
  }
  .home-content div {
    padding: 0 24px;
  }
}

@media (min-width: 800px) {
  .home-content {
    flex: 3;
  }
}

.home-content div {
  max-width: 375px;
  padding: 72px 24px;
}

.home-photo {
  order: 1;
  flex: 3;
}
.home-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
@media (min-width: 700px) {
  .home-content {
    flex: 3;
  }
  .home-photo {
    order: 2;
  }
}

.home-wrapper:nth-child(even) .home-content {
  order: 2;
}
.home-wrapper:nth-child(even) .home-photo {
  order: 1;
} */
</style>