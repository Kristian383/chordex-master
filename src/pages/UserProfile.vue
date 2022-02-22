<template>
  <base-card>
    <section>
      <header></header>
      <main>
        <div class="row">
          <div class="user-info">
            <div class="photo">
              <img class="profile-photo" src="@/assets/home.jpg" />
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
                  disabled
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
              <!-- delete acc -->
              <div class="container">
                <p class="delete" @click="openDeleteModal">Delete my account</p>
                <div class="loader">
                  <the-loader v-if="requestIsPending"></the-loader>
                </div>
                <p>
                  {{ respondMsg }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- delete-modal -->
        <transition name="fade">
          <delete-modal
            v-if="showDeleteModal"
            @close-modal="closeDeleteModal"
            @send-delete="submitDeleteRequest"
          ></delete-modal>
        </transition>
      </main>
    </section>
  </base-card>
</template>

<script>
import BaseCard from "./../components/ui/BaseCard.vue";
import TheLoader from "../components/ui/TheLoader.vue";
import DeleteModal from "../components/ui/DeleteModal.vue";

import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TheLoader,
    BaseCard,
    DeleteModal,
  },
  setup() {
    const requestIsPending = ref(false);
    const respondMsg = ref("");
    const respondMsgSuccess = ref(false);

    const showDeleteModal = ref(false);

    const store = useStore();

    function closeDeleteModal() {
      showDeleteModal.value = false;
    }

    function openDeleteModal() {
      showDeleteModal.value = true;
    }

    function submitDeleteRequest() {
      requestIsPending.value = true;
      showDeleteModal.value = false;

      store
        .dispatch("requestDeleteAccount", {
          email: getUserData.value.email,
        })
        .then((res) => {
          requestIsPending.value = false;
          if (res == true) {
            respondMsg.value =
              "An email for deleting your account has been sent to you.";
            respondMsgSuccess.value = true;
          } else {
            respondMsg.value =
              "Looks like something went wrong on our side. Please report to admin.";
            respondMsgSuccess.value = false;
          }
        });
    }

    const getUserData = computed(() => {
      return store.getters.user;
    });

    const numOfSongs = computed(() => {
      return store.getters.getAllSongs.length;
    });

    const numOfMySongs = computed(() => {
      return store.getters.getAllMySongs.length;
    });

    const numOfArtists = computed(() => {
      return store.getters.getArtists.length;
    });

    return {
      requestIsPending,
      respondMsg,
      getUserData,
      numOfSongs,
      numOfMySongs,
      numOfArtists,
      submitDeleteRequest,
      respondMsgSuccess,
      closeDeleteModal,
      openDeleteModal,
      showDeleteModal,
    };
  },
};
</script>

<style scoped>
header {
  background-image: url("../assets/skycover.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 150px;
}

.row {
  display: grid;
  color: var(--font_black);
  font-size: 18px;
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
  object-fit: cover;
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

/* username, email, pswd */
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
  transition: 0.4s;
  background-color: var(--form_gray);
}

.delete {
  color: red;
  font-size: 14px;
  cursor: pointer;
}
/* 
.delete-acc {
  align-items: center !important;
  gap: 4px;
  font-size: 14px;
}
.delete-acc p {
  color: var(--green);
}
.red-text {
  color: var(--burgundy);
} */
/* .delete-btn {
  background-color: var(--burgundy);
  padding: 8px;
  color: #fff;
  cursor: pointer;
  border-radius: 8px;
} */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>