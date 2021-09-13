<template>
  <base-card>
    <section>
      <header></header>
      <main>
        <div class="row">
          <div class="user-info">
            <div class="photo">
              <img
                class="profile-photo"
                src="https://images.pexels.com/photos/1804796/pexels-photo-1804796.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              />
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
            <!-- <p class="desc">Settings</p> -->
            <button-save @click="saveChanges"></button-save>
          </div>
          <div class="right">
            <!-- <ul class="nav">
          <li>Gallery</li>
          <li>Collections</li>
          <li>Groups</li>
          <li>About</li>
        </ul> -->
            <!-- <span class="edit">Toggle edit </span> -->
            <div class="container">
              <div>
                <label class="form-control-label" for="input-username"
                  >Username</label
                >
                <input
                  class="input-field"
                  type="text"
                  id="input-username"
                  placeholder="John"
                />
              </div>
              <div>
                <label class="form-control-label" for="input-email"
                  >Email</label
                >
                <input
                  class="input-field"
                  type="text"
                  id="input-email"
                  placeholder="John"
                />
              </div>
              <div @click="togglePasswordChange" class="change-psw">
                Change password
              </div>
              <!-- password -->
              <transition name="fade">
                <div v-if="changePassword">
                  <label class="form-control-label" for="input-email"
                    >Password</label
                  >
                  <input
                    class="input-field"
                    type="password"
                    id="password"
                    placeholder="John"
                  />
                </div>
              </transition>
              <transition name="fade">
                <div v-if="changePassword">
                  <label class="form-control-label" for="input-email"
                    >New Password</label
                  >
                  <input
                    class="input-field"
                    type="password"
                    id="password-repeat"
                    placeholder="John"
                  />
                </div>
              </transition>
              <!--  -->
            </div>
          </div>
        </div>
      </main>
    </section>
  </base-card>
</template>

<script>
import BaseCard from "./../components/ui/BaseCard.vue";
import ButtonSave from "./../components/ui/ButtonSave.vue";
export default {
  components: {
    BaseCard,
    ButtonSave,
  },
  data() {
    return {
      changePassword: false,
    };
  },
  methods: {
    togglePasswordChange() {
      this.changePassword = !this.changePassword;
    },
    saveChanges(event) {
      event.target.classList.toggle("loading");

      setTimeout(() => {
        event.target.classList.remove("loading");
        // api call
        event.target.classList.add("success");
      }, 1000);

      setTimeout(() => {
        event.target.classList.remove("success");
      }, 2500);
    },
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  height: 150px;
}
section {
  font-size: 18px;
  /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}
.row {
  display: grid;
  color: RGB(16, 17, 20);
}

@media (min-width: 800px) {
  header {
    height: 250px;
  }
}
@media (min-width: 1000px) {
  header {
    height: 250px;
  }
  .row {
    grid-template-columns: 1fr 1fr;
  }
}

.user-info {
  display: flex;
  color: RGB(16, 17, 20);
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  max-width: 500px;
  padding: 8px;
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
  color: #888888;
}
.stats {
  margin-top: 25px;
  text-align: center;
  display: flex;
  widows: 100%;
  gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 8px;
  border-bottom: 1px solid #ededed;
}
.number-stat {
  padding: 0px;
  font-size: 14pt;
  font-weight: bold;
  color: #aaa;
  color: RGB(16, 17, 20);
}
.desc-stat {
  color: #888888;
}
.desc {
  padding-bottom: 25px;
  border-bottom: 1px solid #ededed;
}

/* irght */
.right {
  padding: 14px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  /* background-color: #ededed; */
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* font-size: 18px; */
  /* grid-template-columns: 1fr;
 justify-content: center;
 align-items: center; */
}
.container > div {
  /* width: 100%; */
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 400px;
  width: 100%;
}
.container > div input {
  border: 0;
  padding: 16px;
  border-radius: 8px;
  outline: 0;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: RGB(16, 17, 20);
  font-size: inherit;
  margin-top: 14px;
  cursor: pointer;
  background-color: #ededed;
}
.change-psw {
  cursor: pointer;
  color: rgb(194, 42, 42);
}
.change-psw:hover {
  color: rgb(163, 24, 24);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>