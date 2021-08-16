<template>
  <div class="sidebar" v-bind:class="isOpen ? 'active' : ''">
    <div class="logo_content">
      <div class="logo">
        <img src="./../../assets/music.png" alt="" />
        <div class="logo_name">Chodex</div>
      </div>
      <div @click="toggleSidebar">
        <i class="fas fa-bars" id="btn"></i>
      </div>
    </div>
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
        <router-link to="/songs" v-bind:class="{ 'active_item': $route.path == '/songs' }" >
          <font-awesome-icon id="ikona" icon="music"></font-awesome-icon>
          <span class="links_name">Songs</span>
          <span class="tooltip">Songs</span>
        </router-link>
      </li>
      <li>
        <router-link to="/favorites" v-bind:class="{ 'active_item': $route.path == '/favorites' }">
          <font-awesome-icon id="ikona" icon="heart"></font-awesome-icon>
          <span class="links_name">Favorites</span>
          <span class="tooltip">Favorites</span>
        </router-link>
      </li>
      <li>
        <router-link to="#" v-bind:class="{ 'active_item': $route.path == '/' }">
          <font-awesome-icon id="ikona" icon="user-alt"></font-awesome-icon>
          <span class="links_name">Artists</span>
          <span class="tooltip">Artists</span>
        </router-link>
      </li>
      <li>
        <router-link to="#" v-bind:class="{ 'active_item': $route.path == '/' }">
          <font-awesome-icon id="ikona" icon="guitar"></font-awesome-icon>
          <span class="links_name">Guitar Type</span>
          <span class="tooltip">Guitar Type</span>
          <!-- Neka ovo bude mali dropdown -->
        </router-link>
      </li>
      <li>
        <router-link to="#" v-bind:class="{ 'active_item': $route.path == '/' }" >
          <font-awesome-icon id="ikona" class="new_song"  icon="plus-square"></font-awesome-icon>
          <span class="links_name">Add New Song</span>
          <span class="tooltip">Add New Song</span>
        </router-link>
      </li>
      <li>
        <router-link to="#" v-bind:class="{ 'active_item': $route.path == '/' }">
          <font-awesome-icon id="ikona" icon="eye"></font-awesome-icon>
          <span class="links_name">Songs To Learn</span>
          <span class="tooltip">Songs To Learn</span>
        </router-link>
      </li>
      <li>
        <router-link to="#" v-bind:class="{ 'active_item': $route.path == '/' }">
          <font-awesome-icon id="ikona" icon="eye"></font-awesome-icon>
          <span class="links_name">My Songs</span>
          <span class="tooltip">My Songs</span>
        </router-link>
      </li>
    </ul>
    <div class="profile_content">
      <div class="profile">
        <div class="profile_details">
          <img src="./../../assets/music.png" alt="" />
          <div class="name">Kristian</div>
        </div>
        <font-awesome-icon id="logout" icon="sign-out-alt"></font-awesome-icon>
      </div>
    </div>
  </div>
</template>

<script>
import { dom } from "@fortawesome/fontawesome-svg-core";

export default {
  data() {
    return {
      searchText: "",
      isOpen: true,
    };
  },
  methods: {
    toggleSidebar(e) {
      if (e.target.type == "text") {
        return;
      }
      this.isOpen = !this.isOpen;
      this.$store.commit("toggleSidebar")
    },
  },
  created() {
    dom.watch();
  },
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 80px;
  background: #11101d;
  position: fixed;
  top: 0;
  left: 0;
  padding: 6px 14px;
  transition: all 0.5s ease;
  z-index: 15;
}

.active_item{
  /* background-color: #e73213; */
  background: rgb(194, 42, 42);
}
.new_song{
  color: #69B34C;
}

.sidebar.active {
  width: 240px;
}
.sidebar .logo_content .logo {
  display: flex;
  width: 100%;
  align-items: center;
  color: #fff;
  opacity: 0;
  pointer-events: none;
}

.sidebar.active .logo_content .logo {
  opacity: 1;
}
.logo_content .logo img {
  height: 100%;

  margin-right: 5px;
}

.logo .logo_name {
  font-size: 20px;
  font-weight: 400;
}

.sidebar #btn {
  color: #f1f1f1;
  position: absolute;
  left: 50%;
  top: 26px;
  font-size: 24px;
  text-align: center;
  transform: translateX(-50%);
  cursor: pointer;
  transition: 0.8s ease all;
}
.sidebar.active #btn {
  left: 90%;
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
  /* line-height: 50px; */
}
.sidebar ul li a {
  color: #f1f1f1;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 24px;
  transition: all 0.4s ease;
  border-radius: 12px;
  padding-left: 16px;
  white-space: nowrap;
}
.sidebar ul li a:hover {
  color: #11101d;
  background: #f1f1f1;
}
.sidebar ul li #ikona {
  height: 50px;
  text-align: center;
}

.sidebar.active .links_name {
  opacity: 1;
  pointer-events: auto;
}
.sidebar .links_name {
  opacity: 0;
  pointer-events: auto;
}
.sidebar input {
  opacity: 0;
}

.sidebar.active input {
  opacity: 1;
}

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

.sidebar ul li .tooltip {
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
}

.sidebar .profile_content {
  position: absolute;
  color: #f1f1f1;
  bottom: 0;
  left: 0;
  width: 100%;
}
.sidebar .profile_content .profile {
  position: relative;
  padding: 14px 6px;
  height: 70px;
  background-color: #1d1b31;
}

.sidebar.active .profile .profile_details {
  opacity: 1;
  pointer-events: auto;
}
.sidebar .profile .profile_details {
  opacity: 0;
  pointer-events: none;
}
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
.sidebar.active #logout {
  position: absolute;
  left: 80%;
  bottom: 16px;
  font-size: 24px;
  transform: rotate(180deg);
}

.sidebar #logout {
  position: absolute;
  left: 35%;
  bottom: 16px;
  font-size: 24px;
  transform: rotate(180deg);
  transition: all 0.3s ease-in;
}

#logout:hover {
  cursor: pointer;
  color: #d8323c;
}
</style>