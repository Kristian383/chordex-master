<template>
  <div
    class="hamburger"
    @click="toggleSidebar"
  >
    <!-- v-bind:style="{ color: activeColor }"
  gore     -->
    <font-awesome-icon id="btn" icon="bars"></font-awesome-icon>
  </div>
  <transition name="fade">
    <div class="sidebar" v-if="!isOpen">
      <ul class="nav_list">
        <!-- <li @click="toggleSidebar">
        <font-awesome-icon
          id="ikona"
          class="search"
          icon="search"
        ></font-awesome-icon>

        <input type="text" placeholder="Search..." v-model="searchText" />
        <span class="tooltip">Search</span>
      </li>-->
        <li>
          <router-link
            to="/profile"
            v-bind:class="{ active_item: $route.path == '/profile' }"
          >
            <font-awesome-icon id="ikona" icon="user-alt"></font-awesome-icon>
            <span class="links_name">Account</span>
            <!-- <span class="tooltip">My Profile</span> -->
          </router-link>
        </li>
        <li>
          <router-link
            to="/songs"
            v-bind:class="{ active_item: $route.path == '/songs' }"
          >
            <font-awesome-icon id="ikona" icon="music"></font-awesome-icon>
            <span class="links_name">Songs</span>
            <!-- <span class="tooltip">Songs</span> -->
          </router-link>
        </li>
        <!-- <li>
        <router-link
          to="/favorites"
          v-bind:class="{ active_item: $route.path == '/favorites' }"
        >
          <font-awesome-icon class="favorite" id="ikona" icon="heart"></font-awesome-icon>
          <span class="links_name">Favorites</span>
          <span class="tooltip">Favorites</span>
        </router-link>
      </li> -->
        <li>
          <router-link
            to="/artists"
            v-bind:class="{ active_item: $route.path == '/artists' }"
          >
            <font-awesome-icon id="ikona" icon="user-alt"></font-awesome-icon>
            <span class="links_name">Artists</span>
            <!-- <span class="tooltip">Artists</span> -->
          </router-link>
        </li>
        <!-- <li>
        <router-link to="/" v-bind:class="{ active_item: $route.path == '/' }">
          <font-awesome-icon id="ikona" icon="guitar"></font-awesome-icon>
          <span class="links_name">Guitar Type</span>
          <span class="tooltip">Guitar Type</span>
         
        </router-link>
      </li> -->
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
            <!-- <span class="tooltip">Add New Song</span> -->
          </router-link>
        </li>
        <!-- <li>
        <router-link to="#" v-bind:class="{ active_item: $route.path == '/' }">
          <font-awesome-icon id="ikona" icon="thumbtack"></font-awesome-icon>
          <span class="links_name">Songs To Learn</span>
          <span class="tooltip">Songs To Learn</span>
        </router-link>
      </li> -->
        <li>
          <router-link
            to="/my-songs"
            v-bind:class="{ active_item: $route.path == '/my-songs' }"
          >
            <font-awesome-icon
              id="ikona"
              icon="clipboard-list"
            ></font-awesome-icon>
            <span class="links_name">My Songs</span>
            <!-- <span class="tooltip">My Songs</span> -->
          </router-link>
        </li>
        <li>
          <router-link
            to="#"
            v-bind:class="{ active_item: $route.path == '/' }"
          >
            <font-awesome-icon id="ikona" icon="headphones"></font-awesome-icon>
            <span class="links_name">Backing tracks</span>
            <!-- <span class="tooltip">Backing tracks</span> -->
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
            <!-- <span class="tooltip">Find a key</span> -->
          </router-link>
        </li>
        <li @click="logOutUser">
          <router-link to="/auth">
            <!-- v-bind:class="{ active_item: $route.path == '/' }" -->
            <font-awesome-icon
              id="ikona"
              icon="sign-out-alt"
            ></font-awesome-icon>
            <span class="links_name">Logout </span>
            <!-- <span class="tooltip">Find a key</span> -->
          </router-link>
        </li>
        <li>
          <div class="toggle-mode">
            <input
              type="checkbox"
              @click="toggleMode"
              class="checkbox"
              id="chk"
            />
            <label class="label" for="chk">
              <font-awesome-icon icon="moon"></font-awesome-icon>
              <font-awesome-icon icon="sun"></font-awesome-icon>
              <div class="ball"></div>
            </label>
          </div>
        </li>
      </ul>
      <div class="profile_content">
        <div class="profile">
          <div class="profile_details">
            <img src="./../../assets/music.png" alt="" />
            <div class="name">Kristian</div>
          </div>
          <font-awesome-icon
            @click="logOutUser"
            id="logout"
            icon="sign-out-alt"
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
    return {
      searchText: "",
      isOpen: true,
      // mobile: true,
      // mobileNav: null,
      // windowWidth: null,
    };
  },
  methods: {
    toggleSidebar(e) {
      if (e.target.type == "text") {
        return;
      }
      this.isOpen = !this.isOpen;
      // this.mobile = !this.mobile;
      this.$store.commit("toggleSidebar");
    },
    toggleMode() {
      this.$store.commit("toggleDarkMode");
    },
    logOutUser() {
      console.log("udje");
    },
  },
  created() {
    dom.watch();
   
  },
  computed: {
    appWidth() {
      return "100%";
    },
    // activeColor() {
    //   if (this.mobile) {
    //     console.log("object", this.mobile);
    //     return "black";
    //   } else {
    //     return "black";
    //   }
    // },
  },
  // computed: {
  //   isDarkMode() {
  //     return this.$store.isDarkMode;
  //   }
  // },
};
</script>

<style scoped>
.favorite {
  color: #c22a2a;
}
.sidebar {
  height: 100%;
  width: 240px;
  /* width: 80px;
  background: #11101d;
  background: #161b22; */
  background: #0d1117; /*tamnija*/
  position: fixed;
  top: 0;
  left: 0;
  padding: 90px 14px;
  transition: all 0.3s ease;
  z-index: 33;
  /* visibility: hidden; */
}
/* .sidebar.active {
  width: 240px;
} */

.hamburger {
  position: fixed;
  top: 24px;
  left: 24px;
  font-size: 24px;
  z-index: 102;
  cursor: pointer;
}
.hamburger:hover{
  color: #333;
}

/*  */
.active_item {
  /* background-color: #e73213; */
  background: rgb(194, 42, 42);
}
.active_item svg {
  color: #f1f1f1;
}
.new_song {
  color: #69b34c;
}

/* .sidebar .logo_content .logo {
  display: flex;
  width: 100%;
  align-items: center;
  color: #fff;
  opacity: 0;
  pointer-events: none;
} */
/* .sidebar.active .logo_content .logo  */
/* .sidebar .logo_content .logo {
  opacity: 1;
}
.logo_content .logo img {
  height: 100%;

  margin-right: 5px;
} */

.logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}

.sidebar #btn {
  color: #f1f1f1;
  position: absolute;
  /* left: 50%; */
  left: 90%;
  top: 26px;
  font-size: 24px;
  text-align: center;
  transform: translateX(-50%);
  cursor: pointer;
  transition: 0.8s ease all;
}
/* .sidebar.active #btn {
  left: 90%;
} */

.sidebar ul {
  margin-top: 20px;
}
.sidebar ul li {
  list-style: none;
  height: 50px;
  position: relative;
  width: 100%;
  margin: 5px 0;
  /* line-height: 50px; */
}

.sidebar ul li a {
  color: #f1f1f1;

  /* color: #c9d1d9; */
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
  background-color: #292c35;
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
  background-color: #fff;

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
/* .sidebar .links_name {
  opacity: 0;
  pointer-events: auto;
} */
.sidebar input {
  opacity: 1;
}

/* .sidebar.active input {
  opacity: 1;
} */

.sidebar ul li input {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 12px;
  outline: none;
  border: none;
  background: #1d1b31;
  padding-left: 40px;
  font-size: 18px;
  color: #f1f1f1;
}

.sidebar ul li .search {
  position: absolute;
  z-index: 99;
  transition: all 0.5s ease;
  color: #f1f1f1;
  margin-left: 16px;
}
.sidebar ul li input:hover,
.sidebar ul li #ikona:hover {
  /* background: #f1f1f1; */
  cursor: pointer;
  /* color: #11101d; */
}

/* .sidebar ul li .tooltip {
  position: absolute;
  height: 35px;
  width: 122px;
  left: 122px;
  top: 0;
  transform: translate(-45%, -50%);
  border-radius: 6px;
  background: #f1f1f1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  color: #11101d;
  line-height: 35px;
  text-align: center;
  transition: 0s;
  opacity: 0;
  pointer-events: none;
}

.sidebar.active ul li .tooltip {
  display: none;
} 
.sidebar ul li:hover .tooltip {
  top: 50%;
  opacity: 1;
  transition: all 0.5s ease;
} */

.sidebar .profile_content {
  position: absolute;
  color: #f1f1f1;
  left: 0;
  bottom: 0;
  width: 100%;
}
.sidebar .profile_content .profile {
  position: relative;
  padding: 14px 6px;
  height: 70px;
  background-color: #161b22;
}

.sidebar .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}
/* .sidebar .profile .profile_details {
  opacity: 0;
  pointer-events: none;
} */
.profile_details {
  display: flex;
  align-items: center;
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
  color: #d8323c;
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