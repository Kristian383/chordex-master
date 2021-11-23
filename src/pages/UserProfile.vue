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
            <h4 class="name">{{ getUserData.username }}</h4>
            <p class="mail">{{ getUserData.email }}</p>
            <!--  -->
            <div class="stats row">
              <div class="stat">
                <p class="number-stat">{{ numOfSongs }}</p>
                <p class="desc-stat">Songs</p>
              </div>
              <div class="stat">
                <p class="number-stat">{{ numOfArtists }}</p>
                <p class="desc-stat">Artists</p>
              </div>
              <div class="stat">
                <p class="number-stat">{{ numOfMySongs }}</p>
                <p class="desc-stat">My Songs</p>
              </div>
            </div>
            <!--  -->
            <!-- <p>Delete account?</p> -->
          </div>
          <div class="right">
            <div class="container">
              <!-- username -->
              <div>
                <label class="form-control-label" for="input-username"
                  >Username</label
                >
                <input
                  type="text"
                  id="input-username"
                  :value="getUserData.username"
                />
              </div>
              <!-- email -->
              <div>
                <label class="form-control-label" for="input-email"
                  >Email</label
                >
                <input
                  type="text"
                  id="input-email"
                  :value="getUserData.email"
                  disabled
                />
              </div>
              <div @click="togglePasswordChange" class="change-psw">
                Change password
              </div>
              <!-- password -->
              <transition name="fade">
                <div v-if="changePassword">
                  <label class="form-control-label" for="input-email"
                    >Old password</label
                  >
                  <input class="input-password" type="password" id="password" />
                </div>
              </transition>
              <transition name="fade">
                <div v-if="changePassword">
                  <label class="form-control-label" for="input-email"
                    >New password</label
                  >
                  <input
                    class="input-password"
                    type="password"
                    id="password-repeat"
                  />
                </div>
              </transition>
              <div class="save-pswd">
                <button-save
                  @click="saveChanges"
                  v-if="passwordChanged"
                ></button-save>
              </div>
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
      passwordChanged: true,
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
  computed: {
    getUserData() {
      return this.$store.getters.user;
    },
    numOfSongs() {
      return this.$store.getters.getAllSongs.length;
    },
    numOfMySongs() {
      return this.$store.getters.getAllMySongs.length;
    },
    numOfArtists() {
      return this.$store.getters.getArtists.length;
    },
  },
};
</script>

<style scoped>
header {
  background-image: url("https://images.pexels.com/photos/1731427/pexels-photo-1731427.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 150px;
}
section {
  font-size: 18px;
}
.row {
  display: grid;
  color: var(--font_black);
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
  align-items: center;
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
  border: 4px solid var(--white);
}
.name {
  margin-top: 20px;
  font-weight: 600;
  font-size: 18pt;
}
.mail {
  margin-bottom: 5px;
  font-size: 11pt;
  color: var(--mid_gray);
}
.stats {
  margin-top: 25px;
  text-align: center;
  display: flex;
  widows: 100%;
  gap: 20px;
  padding-bottom: 20px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--mid_gray);
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
  border-bottom: 1px solid var(--mid_gray);
}

/* irght */
.right {
  padding: 14px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container > div {
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
  padding: 12px;
  border-radius: 8px;
  outline: 0;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  color: RGB(16, 17, 20);
  font-size: inherit;
  margin-top: 14px;
  cursor: pointer;
  background-color: var(--form_gray);
}

.input-password {
  font-family: caption;
}
.change-psw {
  cursor: pointer;
  color: var(--burgundy);
}

.save-pswd{
  align-items: center !important;
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