<template>
  <div class="home">
    <div class="sign-form info">
      <!-- <span><h2>Welcome!</h2></span> -->
      <user-auth></user-auth>
    </div>
    <div class="home-content">
      <div><h2>Keep track of your songs and store them at one place.</h2></div>
      <div class="home-photo">
        <img src=".././assets/home.jpg" alt="" />
      </div>
    </div>
    <!--  -->
    
    <!-- <div class="info"></div> -->
    <div class="home-content">
      <div><h2>Keep track of your songs and store them at one place.</h2></div>
      <div class="home-photo">
        <img src=".././assets/home.jpg" alt="" />
      </div>
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
}
@media (min-width: 700px) {
  .home {
    min-height: 655px;
    max-height: 655px;
    grid-template-columns: repeat(2,1fr);
    /* flex-direction: row; */
  }
}

/* sign form */
.sign-form {
  order: 1;
  background-color: #fff;
  position: relative;
  min-height: 500px;
  flex: 4;
  padding: 0 24px;
}

@media (min-width: 700px) {
  .sign-form {
    order: 1;
  }
}
@media (min-width: 800px) {
  .sign-form {
    flex: 3;
  }
}
/*  */
.home-content {
  order: 1;
  flex: 3;
  text-align: center;
}
.home-content h2 {
  padding: 32px 16px;
}
.home-content img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 500px;
  object-fit: contain;
}
@media (min-width: 700px) {
  .home-content {
    order: 2;
  }
}
@media (min-width: 800px) {
  .home-content {
    flex: 4;
  }
}
</style>