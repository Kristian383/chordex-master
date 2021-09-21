<template>
  <footer>
    <div class="container footer">
      <div class="logo"><img src="./../../assets/guitar.svg" alt="Logo" /></div>
      <div>
        <ul>
          <li><router-link to="/home">Home</router-link></li>
          <li><router-link to="/songs">App</router-link></li>
          <li><router-link to="/about">About</router-link></li>
        </ul>
      </div>
      <!--  -->
      <p>&copy; Ttianmaar Ind. 2021</p>
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

  /* margin: 0 auto; */
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
</style>