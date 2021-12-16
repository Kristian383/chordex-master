<template>
  <div class="hamburger" @click="toggleSidebar" v-if="isAuthenticated">
    <font-awesome-icon id="btn" icon="bars"></font-awesome-icon>
  </div>
  <transition name="fade">
    <div class="sidebar" v-if="sidebarIsActive" :class="{desktop:!isMobile}">
      <ul class="nav_list">
        <li>
          <router-link
            to="/profile"
            v-bind:class="{ active_item: $route.path == '/profile' }"
          >
            <font-awesome-icon id="ikona" icon="user-alt"></font-awesome-icon>
            <span class="links_name">Account</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/songs"
            v-bind:class="{
              active_item:
                $route.path == '/songs' && $route.query.isMySong != 'True',
            }"
          >
            <font-awesome-icon id="ikona" icon="music"></font-awesome-icon>
            <span class="links_name">Songs</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/artists"
            v-bind:class="{ active_item: $route.path == '/artists' }"
          >
            <img id="ikona" class="artist-icon" src="@/assets/mic.svg" alt="" />
            <span class="links_name">Artists</span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/new"
            v-bind:class="{ active_item: $route.path == '/new' }"
          >
            <font-awesome-icon
              id="ikona"
              class="new_song"
              icon="plus-square"
            ></font-awesome-icon>
            <span class="links_name">Add New Song</span>
          </router-link>
        </li>
        
        <li>
          <router-link
            to="/songs?isMySong=True"
            v-bind:class="{ active_item: $route.query.isMySong == 'True' }"
          >
            <font-awesome-icon
              id="ikona"
              icon="clipboard-list"
            ></font-awesome-icon>
            <span class="links_name">My Songs</span>
          </router-link>
        </li>
        
        <li>
          <router-link
            to="/find-key"
            v-bind:class="{ active_item: $route.path == '/find-key' }"
          >
            <font-awesome-icon
              id="ikona"
              icon="question-circle"
            ></font-awesome-icon>
            <span class="links_name">Find a key </span>
          </router-link>
        </li>

        <li>
          <router-link
            to="/resources"
            v-bind:class="{ active_item: $route.path == '/resources' }"
          >
            <font-awesome-icon
              id="ikona"
              icon="sticky-note"
            ></font-awesome-icon>
            <span class="links_name">Websites </span>
          </router-link>
        </li>

        <li @click="logOutUser">
          <router-link to="/home">
            <font-awesome-icon
              id="ikona"
              icon="sign-out-alt"
            ></font-awesome-icon>
            <span class="links_name">Logout </span>
          </router-link>
        </li>

        <!-- <li>
          <div class="toggle-mode">
            <input
              type="checkbox"
              @click="toggleDarkMode"
              class="checkbox"
              id="chk"
            />
            <label class="label" for="chk">
              <font-awesome-icon icon="moon"></font-awesome-icon>
              <font-awesome-icon icon="sun"></font-awesome-icon>
              <div class="ball"></div>
            </label>
          </div>
        </li> -->

      </ul>

      <div class="profile_content">
        <div class="profile">
          <div class="profile_details">
            <img src="@/assets/guitar.svg" alt="" />
            <div class="name">{{ getUserData.username }}</div>
          </div>
          <font-awesome-icon
            id="logout"
            icon="sign-out-alt"
            @click="closeSidebar"
          ></font-awesome-icon>
        </div>
      </div>

    </div>
  </transition>
</template>

<script>
import { dom } from "@fortawesome/fontawesome-svg-core";

export default {
  data() {
    return {};
  },
  methods: {
    toggleSidebar() {
      this.$store.commit("toggleSidebar");
    },
    toggleDarkMode() {
      console.log("toggleDarkMode");
      this.$store.commit("toggleDarkMode");
    },
    closeSidebar() {
      this.$store.commit("removeSidebar");
    },
    logOutUser() {
      this.$store.dispatch("logout");
        this.$store.commit("removeSidebar");
      // if (this.sidebarIsActive) {
      // }
    },
  },
  created() {
    dom.watch();
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.token;
    },
    sidebarIsActive() {
      return this.$store.getters.sidebarIsActive;
    },
    getUserData() {
      return this.$store.getters.user;
    },
    isMobile(){
      return this.$store.getters.isMobile;
    }
  },
};
</script>

<style scoped>
.favorite {
  color: var(--burgundy);
}
.sidebar {
  height: 100%;
  width: 240px;
  background-color: var(--dark_blue_sidebar);
  /* position: fixed; */
  position: absolute;

  top: 0;
  left: 0;
  padding: 90px 14px;
  transition: all 0.3s ease;
  z-index: 50;
}

.sidebar.desktop{
   position: fixed;
}
.hamburger {
  position: fixed;
  top: 24px;
  left: 24px;
  font-size: 24px;
  z-index: 102;
  cursor: pointer;
}
.hamburger:hover {
  color: #333;
}

/*  */
.active_item {
  background: var(--burgundy);
}
.active_item svg {
  color: #f1f1f1;
}
.new_song {
  color: var(--green);
}

.logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}

.sidebar #btn {
  color: var(--f1_gray);
  position: absolute;
  left: 90%;
  top: 26px;
  font-size: 24px;
  text-align: center;
  transform: translateX(-50%);
  cursor: pointer;
  transition: 0.8s ease all;
}

.sidebar ul {
  margin-top: 20px;
}
.sidebar ul li {
  list-style: none;
  height: 50px;
  position: relative;
  width: 100%;
  margin: 5px 0;
}

.sidebar ul li a {
  color: var(--f1_gray);

  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 24px;
  transition: all 0.4s ease;
  border-radius: 12px;
  padding-left: 16px;
  white-space: nowrap;

  font-size: 16px;
}
/* dark mode */

.sidebar ul li .toggle-mode {
  transition: all 0.3s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  position: absolute;
  left: 25px;
}

.sidebar ul li .toggle-mode .checkbox {
  opacity: 0;
  position: absolute;
}

.sidebar ul li .toggle-mode .label {
  background-color: var(--dark_gray_chips);
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  position: relative;
  height: 24px;
  width: 48px;
  transform: scale(1.5);
}

.sidebar ul li .toggle-mode .label .ball {
  background-color: var(--white);

  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  height: 20px;
  width: 20px;
  transform: translateX(0px);
  transition: transform 0.2s linear;
}
.sidebar ul li .toggle-mode svg {
  font-size: 14px;
}
.sidebar ul li .toggle-mode .checkbox:checked + .label .ball {
  transform: translateX(24px);
}

.fa-moon {
  color: #f1c40f;
}

.fa-sun {
  color: #f39c12;
}

/*  */
.sidebar ul li a:hover {
  color: #11101d;
  background: #f1f1f1;
}
.sidebar ul li #ikona {
  height: 50px;
  text-align: center;
}

.sidebar .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar input {
  opacity: 1;
}

.sidebar ul li .search {
  position: absolute;
  z-index: 99;
  transition: all 0.5s ease;
  color: var(--f1_gray);
  margin-left: 16px;
}
.sidebar ul li input:hover,
.sidebar ul li #ikona:hover {
  cursor: pointer;
}

.sidebar .profile_content {
  position: absolute;
  color: var(--f1_gray);
  left: 0;
  bottom: 0;
  width: 100%;
}
.sidebar .profile_content .profile {
  position: relative;
  padding: 14px 6px;
  height: 70px;
  background-color: #131920;
}

.sidebar .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}

.profile_details {
  display: flex;
  align-items: center;
}

.artist-icon {
  width: 21px;
  height: 21px;
}

.profile_details img {
  height: 45px;
}
.profile_details .name {
  font-weight: 400;
}
.sidebar #logout {
  position: absolute;
  left: 80%;
  bottom: 16px;
  font-size: 24px;
  transform: rotate(180deg);
  color: var(--white);
}

/* .sidebar #logout {
  position: absolute;
  left: 35%;
  bottom: 16px;
  font-size: 24px;
  transform: rotate(180deg);
  transition: all 0.3s ease-in;
} */

#logout:hover {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
  transform: translateX(-100%);
}
.fade-leave-to,
.fade-enter-from {
  opacity: 0;
}
</style>