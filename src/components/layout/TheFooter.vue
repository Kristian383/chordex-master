<template>
  <footer>
    <div class="container">
      <div class="logo"><img src="@/assets/guitar.svg" alt="Logo" /></div>
      <!-- <div>
        <ul class="footer-pages">
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div> -->
      <a href="https://ko-fi.com/I2I0JPDGB" target="_blank">
        <img
          height="36"
          style="border:0px;height:36px;"
          src="https://storage.ko-fi.com/cdn/kofi3.png?v=3"
          border="0"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
      <span>&copy; Kristian Nenadovic 2023</span>
      <div class="spotify-logo">
        <img src="./../../assets/spotify.png" alt="Logo" />
      </div>
      <a
        class="free-pick-link"
        target="_blank"
        href="https://www.freepik.com/vectors/banner"
      >
        Photos by Freepik
      </a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background-color: var(--f1_gray);
  margin-top: auto;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  padding: 1.25rem;
  max-width: 71.25rem;
  margin: 0 auto;

  .logo {
    width: 3.125rem;

    img {
      width: 100%;
    }
  }
  // .footer-pages {
  //   gap: 1rem;
  //   list-style: none;
  //   display: flex;

  //   li a {
  //     text-decoration: none;
  //     color: RGB(16, 17, 20);
  //     font-weight: 500;
  //     font-size: 18px;
  //   }

  .spotify-logo {
    width: 6rem;
    img {
      width: 100%;
    }
  }
  .free-pick-link {
    text-decoration: none;
    color: black;
    font-size: 0.75rem;
  }
}
</style>