import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";

// const Songs = () => import('./pages/Songs.vue');
import Songs from "./pages/Songs.vue";
const TheHome = () => import('./pages/TheHome.vue');
const UserProfile = () => import('./pages/UserProfile.vue');
const SongDetail = () => import('./pages/SongDetail.vue');
const ArtistsView = () => import('./pages/ArtistsView.vue');
const AddSong = () => import('./pages/AddSong.vue');
const ResetPassword = () => import('./pages/ResetPassword.vue');
const DeleteAccount = () => import('./pages/DeleteAccount.vue');
const FindKey = () => import('./pages/FindKey.vue');
const TheAbout = () => import('./pages/TheAbout.vue');
const ResourcesList = () => import('./components/ui/ResourcesList.vue');
const NotFound = () => import('./pages/NotFound.vue');
const MetronomeView = () => import('./pages/MetronomeView.vue');
const SongKeysAccordion = () => import('./pages/SongKeysAccordion.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      component: TheHome,
      name: "Home",
      meta: { title: "Home | Chordex", requiresUnauth: true },
    },
    {
      path: "/about",
      component: TheAbout,
      name: "About",
      meta: { title: "About | Chordex", requiresUnauth: true },
    },
    {
      path: "/songs",
      component: Songs,
      name: "All Songs",
      meta: { title: "Songs | Chordex", requiresAuth: true },
    },
    {
      path: "/songs/:songId",
      component: SongDetail,
      name: "SongDetail",
      meta: { title: "Song Detail | Chordex", requiresAuth: true },
      props: true,
    },

    {
      path: "/profile",
      component: UserProfile,
      name: "Account Settings",
      meta: { title: "My Profile | Chordex", requiresAuth: true },
    },
    {
      path: "/artists",
      component: ArtistsView,
      name: "All Artists",
      meta: { title: "Artists | Chordex", requiresAuth: true },
    },
    {
      path: "/new",
      component: AddSong,
      name: "Add Song",
      meta: { title: "Add Song | Chordex", requiresAuth: true },
    },
    {
      path: "/new/:songId",
      component: AddSong,
      name: "Edit Song",
      meta: { title: "Edit Song | Chordex", requiresAuth: true },
    },
    {
      path: "/find-key",
      component: FindKey,
      name: "Music Keys",
      meta: { title: "Find Key | Chordex", requiresAuth: true },
    },
    {
      path: "/song-keys",
      component: SongKeysAccordion,
      name: "Songs by Keys",
      meta: { title: "Song Keys | Chordex", requiresAuth: true },
    },
    {
      path: "/resources",
      component: ResourcesList,
      name: "Useful websites",
      meta: { title: "Websites | Chordex", requiresAuth: true },
    },
    {
      path: "/metronome",
      component: MetronomeView,
      name: "Metronome and Tap Tempo / Beats Per Minute",
      meta: { title: "Metronome | Chordex" },
    },
    {
      path: "/resetpswd",
      component: ResetPassword,
      name: "Reset Password",
      meta: { title: "Reset Password | Chordex", resetPassword: false },
    },
    {
      path: "/delete-acc",
      component: DeleteAccount,
      name: "Delete Account",
      meta: { title: "Delete Account | Chordex" },
    },
    {
      path: "/:notFound(.*)*",
      component: NotFound,
      meta: { title: "Not Found" },
    },
  ],
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0, behavior: "smooth" };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}` || "Quotex";
  to.meta.previousRoute = from;

  if (to.meta.requiresAuth && !store.getters.token) {
    next("/home");
  } else if (store.getters.isMobile) {
    store.commit("removeSidebar");
    next();
  } else {
    next();
  }
});

export default router;
