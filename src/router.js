import { createRouter, createWebHistory } from "vue-router";

import Songs from "./pages/Songs.vue"
import TheHome from "./pages/TheHome.vue"
import UserProfile from "./pages/UserProfile.vue"
import SongDetail from "./pages/SongDetail.vue"
import Artists from "./pages/Artists.vue"
import AddSong from "./pages/AddSong.vue"
import MySongs from "./pages/MySongs.vue"
import FindKey from "./pages/FindKey.vue"
import TheAbout from "./pages/TheAbout.vue"
// import UserAuth from "./components/ui/auth/UserAuth.vue"
import ResourcesList from "./components/ui/ResourcesList.vue"
import NotFound from "./pages/NotFound.vue"
import store from "./store/index";

// const Favorites=()=>import("./pages/Favorites.vue")
// const Songs=()=>import("./pages/Songs.vue")

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: TheHome, name: "Home", meta: { title: "Home | Chordex", requiresUnauth: true } },
    { path: "/about", component: TheAbout, name: "About", meta: { title: "About | Chordex", requiresUnauth: true } },
    { path: "/songs", component: Songs, name: "Songs", meta: { title: "Songs | Chordex", requiresAuth: true } },
    { path: "/songs/:songId", component: SongDetail, name: "SongDetail", meta: { title: "Song Detail | Chordex", requiresAuth: true }, props: true, },

    // { path: "/auth", component: UserAuth, name: "Authentication", meta: { title: "Authentication | Chordex" } },
    { path: "/profile", component: UserProfile, name: "Account Settings", meta: { title: "My Profile | Chordex", requiresAuth: true } },
    { path: "/artists", component: Artists, name: "Artists", meta: { title: "Artists | Chordex", requiresAuth: true } },
    { path: "/artists/:name", component: Songs, name: "Artists Songs", meta: { title: "Artists Songs | Chordex", requiresAuth: true } },
    { path: "/new", component: AddSong, name: "Add Song", meta: { title: "Add Song | Chordex", requiresAuth: true } },
    { path: "/new/:songId", component: AddSong, name: "EditSong", meta: { title: "Edit Song | Chordex", requiresAuth: true } },
    { path: "/my-songs", component: MySongs, name: "My Songs", meta: { title: "MySongs | Chordex", requiresAuth: true } },
    { path: "/find-key", component: FindKey, name: "Music Keys", meta: { title: "Find Key | Chordex", requiresAuth: true } },
    { path: "/resources", component: ResourcesList, name: "Notes", meta: { title: "Resources | Chordex", requiresAuth: true } },
    { path: "/my-songs/:songId", component: SongDetail, name: "MySongDetail", meta: { title: "SongDetail | Chordex", requiresAuth: true }, props: true },
    { path: "/:notFound(.*)*", component: NotFound, meta: { title: "Not Found" } },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { left: 0, top: 0, behavior: "smooth" }
    }
  },
  // beforeRouteLeave(_, _2, next) {
  //   console.log(window.innerWidth);
  //   if(window.innerWidth<400){
  //     this.$store.commit("removeSidebar")
  //   }
  //   next();
  // },

});


router.beforeEach((to, _, next) => {

  document.title = `${to.meta.title}` || "Quotex";

  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/home");
  }
  // else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
  //   next("/home")
  // }
  else {
    next()
  }


  //ruta add new song before its saved, ako nije ondapronpt
})



export default router