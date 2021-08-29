<template>
  <base-card>
    <header>user profile slika background</header>

    <main>
      <div class="row">
      <div class="user-info">
        <div class="photo">
          <img class="profile-photo" src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"/>
        </div>
        <h4 class="name">Jane Doe</h4>
        <p class="mail">jane.doe@gmail.com</p>
        <div class="stats row">
          <div class="stat">
            <p class="number-stat">70</p>
            <p class="desc-stat">Songs</p>
          </div>
          <div class="stat">
            <p class="number-stat">42</p>
            <p class="desc-stat">Artists</p>
          </div>
          <div class="stat">
            <p class="number-stat">38</p>
            <p class="desc-stat">My Songs</p>
          </div> 
        </div>
        <p class="desc">Settings</p>
        
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
          <label class="form-control-label" for="input-username">Username</label>
          <input
            class="input-field"
            type="text"
            id="input-username"
            placeholder="John"
          />
          <label class="form-control-label" for="input-email">Email</label>
          <input
            class="input-field"
            type="text"
            id="input-email"
            placeholder="John"
          />
          <div>Change password</div>
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
header {
  background: #eee;
  background-image: url("https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: red;
  
  height: 150px;
}

@media (min-width:800px) {
  header {
    height: 250px;
  } 
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
}

.profile-photo {
  width: 200px;
  height: 200px;
  margin-top: -120px;
  border-radius: 100px;
  border: 4px solid #fff;
}
.name {
  margin-top: 20px;
  font-weight: 600;
  font-size: 18pt;
}
.mail {
  margin-bottom: 5px;
  font-size: 11pt;
  color: #aaa;
}
.stats {
  margin-top: 25px;
  text-align: center;
  display: flex;
  widows: 100%;
 gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
}
.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  color: #aaa;
}
.desc-stat {
  color: #bbb;
}
.desc{
   padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
}

</style>