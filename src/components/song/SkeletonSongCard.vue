<template>
  <div class="skeleton-card">
    <div class="card-header">
      <div class="image skeleton"></div>
      <!-- <div class="icons">
        <div class="icon skeleton"></div>
        <div class="icon skeleton"></div>
      </div> -->
    </div>

    <div class="card-body">
      <div class="tags">
        <span class="tag skeleton"></span>
        <span class="tag skeleton"></span>
      </div>
      <span class="artist skeleton"></span>
      <span class="song_name skeleton"></span>
      <div class="bottom">
        <div class="history-info skeleton"></div>
        <div class="learned skeleton"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.skeleton-card {
  width: 180px;
  position: relative;
  height: 260px;
  background-color: #fff;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  cursor: pointer;
}

.image {
  width: 100%;
  height: 100px;
  /*  */
  position: relative;
  overflow: hidden;
  background: #d9d9d9;
}
.icons {
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: space-between;
  padding: 4px;
  /* z-index: 14; */
}
.icons .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #fff;
  /*  */
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 4px 15px 15px 15px;
  gap: 10px;
}

.tags {
  display: flex;
  gap: 4px;
}
.tag {
  background: #d9d9d9;
  border-radius: 50px;
  height: 20px;
  width: 40px;
  /* font-size: 12px; */
  margin: 5px 0;
  padding: 4px 10px;
}

.artist,
.song_name {
  display: block;
  background: #d9d9d9;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}
.artist {
  height: 20px;
  width: 100px;
}
.song_name {
  height: 20px;
  width: 150px;
}

.bottom {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px;
}
.history-info,
.learned {
  height: 15px;
  width: 50px;
  background: #d9d9d9;
  border-radius: 4px;
}

.skeleton {
  /* opacity: .7; */
   animation: skeleton-loading 1.25s linear infinite ;
  background-image: linear-gradient(to right, #d9d9d9 0%, rgba(0,0,0,0.05) 20%, #d9d9d9 40%, #d9d9d9 100%);
  background-repeat: no-repeat;
   background-size: 450px 400px; 

    /* animation: fade 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; */
}
/* @keyframes fade {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
} */

@keyframes skeleton-loading {
  0%{
    background-position: -450px 0;
  }
  100%{
    background-position: 450px 0;
  }
}
</style>