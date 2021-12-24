<template>
  <section>
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
        <div>
          <img src="@/assets/home.jpg" alt="logo" />
        </div>
      </div>
      <!--  -->
      <div class="home-content" id="songs">
        <img src="@/assets/home_cards.png" alt="logo" class="home-image" />
      </div>
      <div class="smaller">
        <h4>Do you play piano, guitar or any other instrument?</h4>
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
    </div>
    <!-- items -->
    <div class="mid-section">
      <h2>Simple virtual songbook for any musician</h2>
      <div class="items">
        <div class="item">
          <h4>YouTube video integration</h4>
          <img src="@/assets/yt.png" alt="" />
          <p>
            Paste YouTube link of a song or a lesson and have it displayed
            together with other song details such as chords, tempo etc.
          </p>
        </div>
        <div class="item">
          <h4>Metronome</h4>
          <img src="@/assets/metro.png" alt="" />
          <p>
            After inserting tempo (BPM) of each song, you get a feature to play
            metronome and practice at the same time.
          </p>
        </div>
        <div class="item">
          <h4>Virtual Songbook</h4>
          <img src="@/assets/book.png" alt="" />
          <p>
            Instead of having a book and carrying it all around, you can write
            it all here.
          </p>
        </div>
        <div class="item">
          <h4>Faster learning</h4>
          <img src="@/assets/thinking.png" alt="" />
          <p>
            You can keep track of learned songs and easily recall all of them.
          </p>
        </div>
      </div>
    </div>
    <!-- products -->
    <div class="products-wrapper-bckg">
      <div class="products">
        <div class="product">
          <div class="product-image">
            <img src="@/assets/full.png" alt="logo" />
          </div>
          <div class="product-info">
            <p>Built in features:</p>
            <ul>
              <li>Immediately get a song key and BPM</li>
              <li>Insert and watch YouTube video of a song/lesson</li>
              <li>Write and analyze chord progressions</li>
              <li>Built in metronome</li>
              <li>Store often used websites in a list</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  -->
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
    /* padding: 0 32px 32px 32px; */
  }

  .third {
    grid-column: 2/4;
    padding-top: 90px;
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
  padding: 0px 8px;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
}

.smaller {
  border-top: 6px solid #ff4f5a;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: var(--light_gray);
}
@media (min-width: 1000px) {
  .smaller {
    border-left: 6px solid #ff4f5a;
    margin-left: 25px;
    border-top: 0;
    /* border-radius: 0px 8px 8px 0px; */
    border-top-right-radius: 50px;
  }
  .home-content h2 {
    font-size: 40px;
  }
}
.smaller ul {
  color: var(--dark_gray_font);
}
.smaller li {
  padding: 12px;
  display: block;
  width: 260px;
  margin: 0 auto;
  display: list-item;
}

.smaller h4 {
  text-align: center;
  padding: 10px 26px;
  font-size: 21px;
}
.smaller h3 {
  font-weight: 500;
}
.smaller h2 {
  padding: 10px 16px;
  font-size: 21px;
  font-weight: 500;
  text-align: center;
}
@media (min-width: 1000px) {
  .smaller h4 {
    margin: 24px 0px;
  }
}
/* items */
.mid-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  /* align-items: center; */
  background-color: #f8f8f8;
  margin-top: 24px;
  padding: 28px 8px;
  gap: 24px;
  text-align: center;
}

.items {
  padding: 8px;
  display: grid;
  max-width: 1700px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 34px;
}
.items .item {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  gap: 18px;
  transition: 0.3s ease-in all;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  /* border-bottom: 4px solid #ff4f5a; */
  cursor: pointer;
  padding: 14px;
}
.items .item:hover {
  transform: rotateZ(-1deg) scale(1.04);
}
.items .item p {
  text-align: center;
  color: var(--dark_gray_font);
  line-height: 24px;
}
@media (min-width: 720px) {
  .items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1350px) {
  .items {
    grid-template-columns: repeat(4, 1fr);
  }
}
/*  */
.products-wrapper-bckg {
  height: 100%;
  padding-bottom: 18px;
}
.products {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 1700px;
  margin: 0 auto;
}

.product {
  display: grid;
  height: 800px;
  grid-template-columns: 1fr;
  align-items: center;
  justify-items: center;
}
.product-image {
  order: 2;
}
.product-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 0px 8px;
}
.product-info {
  background-color: #fff;
  display: flex;
  color: var(--dark_gray_font);

  flex-direction: column;
  /* align-items: center; */
  padding: 24px;
  border-radius: 8px;
  font-size: 20px;
  line-height: 28px;
  gap: 44px;
  order: 1;
  /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */
  max-width: 600px;
}
.product-info p {
  font-weight: 600;
  max-width: 500px;
}

.product-info ul {
  list-style: none;
}
.product-info ul li {
  padding-top: 8px;
}
.product-info ul li:before {
  /* content: "\2713\0020"; */
  /* content:"\2611\0020";  */
  content: "\2714\0020";
  color: var(--green);
}
@media (min-width: 1000px) {
  .product {
    grid-template-columns: 1fr 1fr;
  }
}
</style>