<template>
  <section
    class="home-section"
    :class="{ expand_home_section: !sidebarIsActive }"
  >
    <nav>
      <slot></slot>
      <div class="search-box">
        <input type="text" placeholder="Search..." />
        <font-awesome-icon icon="search" id="search"> </font-awesome-icon>
      </div>
    </nav>
    <div class="home-content">
      <div class="song-cards">
        <slot name="song_cards"></slot>
      </div>
    </div>
  </section>
</template>

<script>
// import SongCard from "../../components/song/SongCard.vue"
export default {
  computed: {
    sidebarIsActive() {
      // console.log("otvoreno", this.$store.getters.sidebarIsActive);
      return this.$store.getters.sidebarIsActive;
    },
  },
  // components:{
  //   SongCard
  // }
};
</script>

<style scoped>
.home-section {
  position: relative;
  background: #f5f5f5;
  min-height: 100vh;
  transition: all 0.5s ease;
  width: calc(100% - 240px);
  left: 240px;
}

.expand_home_section {
  width: calc(100% - 80px);
  left: 80px;
}

.home-section nav {
  display: flex;
  justify-content: space-between;
  height: 80px;
  background: #fff;
  align-items: center;
  position: fixed;
  width: calc(100% - 240px);
  left: 240px;
  z-index: 100;
  padding: 0 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease;
}
.expand_home_section nav {
  width: calc(100% - 80px);
  left: 80px;
}

.home-section nav .search-box {
  position: relative;
  height: 50px;
  max-width: 350px;
  /* min-width: 200px; */
  width: 100%;
  margin: 0 20px;
}
nav .search-box input {
  height: 100%;
  width: 100%;
  outline: none;
  background: #f5f6fa;
  border: 2px solid #efeef1;
  border-radius: 6px;
  font-size: 18px;
  padding: 0 15px;
}
nav .search-box #search {
  position: absolute;
  height: 40px;
  padding: 6px;
  width: 40px;
  
  background: rgb(194, 42, 42);
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 4px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  transition: all 0.4 ease;
}
nav .search-box #search:hover {
  cursor: pointer;
}
/* Content under header */
.home-section .home-content {
  position: relative;
  padding-top: 104px;
}

.home-section .song-cards {
  display: grid;
  /* grid-template: ; */
}
</style>