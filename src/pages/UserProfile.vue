<template>
  <base-card>
    <header>user profile slika background</header>

    <main>
      <div class="row">
      <div class="left">
        <div class="photo">
          <!-- <img class="profile-photo" src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/> -->
          <div class="active"></div>
        </div>
        <h4 class="name">Jane Doe</h4>
        <p class="info">UI/UX Designer</p>
        <p class="info">jane.doe@gmail.com</p>
        <div class="stats row">
          <div class="stat col-xs-4" style="padding-right: 50px;">
            <p class="number-stat">3,619</p>
            <p class="desc-stat">Followers</p>
          </div>
          <div class="stat col-xs-4">
            <p class="number-stat">42</p>
            <p class="desc-stat">Following</p>
          </div>
          <div class="stat col-xs-4" style="padding-left: 50px;">
            <p class="number-stat">38</p>
            <p class="desc-stat">Uploads</p>
          </div>
        </div>
        <p class="desc">Hi ! My name is Jane Doe. I'm a UI/UX Designer from Paris, in France. I really enjoy photography and mountains.</p>
        
      </div>
      <div class="right">
        <!-- <ul class="nav">
          <li>Gallery</li>
          <li>Collections</li>
          <li>Groups</li>
          <li>About</li>
        </ul> -->
        <span class="edit">Toggle edit ikona</span>
        <div class="container grid-2">
          <input
            class="input-field"
            type="text"
            id="input-username"
            placeholder="John"
          />
          <input
            class="input-field"
            type="text"
            id="input-username"
            placeholder="John"
          />
          <div>Password</div>
          <div>New Password (v-if)</div>
          <!-- <div class="col-md-4">
             <img src="https://images.pexels.com/photos/1036371/pexels-photo-1036371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
          <div class="col-md-4">
            <img src="https://images.pexels.com/photos/861034/pexels-photo-861034.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
          <div class="col-md-4">
             <img src="https://images.pexels.com/photos/113338/pexels-photo-113338.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
          <div class="col-md-4">
             <img src="https://images.pexels.com/photos/5049/forest-trees-fog-foggy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
          <div class="col-md-4">
            <img src="https://images.pexels.com/photos/428431/pexels-photo-428431.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div>
          <div class="col-md-4">
            <img src="https://images.pexels.com/photos/50859/pexels-photo-50859.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
          </div> -->


        </div>
      </div>
       </div>
    </main>
  
  </base-card>
</template>

<script>
import BaseCard from "./../components/ui/BaseCard.vue";
export default {
  components: {
    BaseCard,
  },
};
</script>

<style scoped>
</style>