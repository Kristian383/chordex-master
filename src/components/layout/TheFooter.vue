<template>
  <footer>
    <div class="container footer">
      <div class="logo"><img src="./../../assets/guitar.svg" alt="Logo" /></div>
      <div>
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
      <!--  -->
      <p>&copy; Kristian Nenadovic 2022</p>
      <div class="spotify-logo">
        <img src="./../../assets/spotify.png" alt="Logo" />
      </div>
      <a class="contribution" target="_blank" href="https://www.freepik.com/vectors/banner">Photos by Freepik</a>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  background-color: var(--f1_gray);
  margin-top: auto;
}
.container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  padding: 20px;
  max-width: 1140px;
  margin: 0 auto;
}

.logo {
  width: 50px;
}
.logo img {
  width: 100%;
}

.container ul {
  gap: 16px;
  list-style: none;
  display: flex;
}
.container ul li a {
  text-decoration: none;
  color: RGB(16, 17, 20);
  font-weight: 500;
  font-size: 18px;
}


.spotify-logo {
  width: 95px;
}
.contribution{
  text-decoration: none;
  color: black;
  font-size: 12px;

}

.spotify-logo img {
  width: 100%;
}
</style>