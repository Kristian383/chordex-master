<template>
  <div class="quote-card" @click="Ispis">
    <div class="icons">
      <div class="icon" @click="editQuote">
        <font-awesome-icon icon="edit" class="edit"></font-awesome-icon>
      </div>
      <div class="icon" @click="removeQuote">
        <font-awesome-icon icon="heart" class="favorite"></font-awesome-icon>
      </div>
    </div>
    <img src="" alt="Quote photo" />
    <div class="info">
      <h4>{{ songArtist }}NirvanaNirvana Nirvana</h4>
      <h6>
        {{ songName }}Smells like teen
        spiritspiritspiritspiritspiritspiritspiritspirit
      </h6>
      <!-- <div class="stars"><stars></stars></div> -->
      <!-- <router-link to="/" class="link">
        View Song
        <font-awesome-icon icon="eye" id="ikona"></font-awesome-icon>
      </router-link> -->
    </div>
  </div>
</template>

<script>
// import Stars from "./../ui/Stars.vue"
export default {
    name:"SongCard"
    ,components:{
        // Stars
    },
    methods:{
      Ispis(e){
        if(e.target.className=="icon")
        {
          console.log("nemoj");
          return
        }
      }
    }
}
</script>

<style scoped>
.quote-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: white;
  max-height: 220px;
  transition: 0.5s ease all;
  max-width: 200px;
}
.quote-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 15px;
  gap: 8px;
  z-index: 15;
}
.icons .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: white;
  transition: 0.5s ease all;
}
.icons .icon:hover {
  background-color: #303030;
  color: white;
}
.favorite,
.edit {
  pointer-events: none;
  height: 15px;
  width: auto;
}
.info {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 16px 16px;
  z-index: 3;
}
.info h4 {
  padding-bottom: 6px;
  font-size: 22px;
  font-weight: 400;

  overflow-wrap: break-word;
}
.info h6 {
  font-weight: 500;
  font-size: 16px;
  padding-bottom: 6px;
  overflow-wrap: break-word;
}
.link {
  display: inline-flex;
  align-items: center;
  margin-top: auto; /*  gura skroz na dno */
  font-weight: 500;
  padding-top: 18px;
  padding-bottom: 4px;
  gap: 8px;
  transition: 0.2s ease-in all;
  text-transform: uppercase;
  font-size: 12px;
  text-decoration: none;
  color: #da3f3f;
}
.link:hover {
  color: #00afea;
}
#ikona {
  width: 14px;
}
.quote-card img {
  display: block;
  z-index: 1;
  width: 100%;
  min-height: 80px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  background-color: black;
}
</style>