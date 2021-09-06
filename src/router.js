import { createRouter, createWebHistory } from "vue-router";

import Songs from "./pages/Songs.vue"
import TheHome from "./pages/TheHome.vue"
import UserProfile from "./pages/UserProfile.vue"
import SongDetail from "./pages/SongDetail.vue"
import Artists from "./pages/Artists.vue"
import AddSong from "./pages/AddSong.vue"
import MySongs from "./pages/MySongs.vue"
import FindKey from "./pages/FindKey.vue"
import UserAuth from "./components/ui/auth/UserAuth.vue"
import NotFound from "./pages/NotFound.vue"

// const Favorites=()=>import("./pages/Favorites.vue")
// const Songs=()=>import("./pages/Songs.vue")

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: TheHome, name: "Home", meta: { title: "Home | Chordex" } },
        { path: "/songs", component: Songs, name: "Songs", meta: { title: "Songs | Chordex" } },
        {
            path: "/songs/:songId(\\d+)", component: SongDetail, name: "SongDetail", meta: { title: "Song Detail | Chordex" }, props: true,
            // children: [
            //     {path:"/edit",component:SongEdit}
            // ]
        },

        { path: "/auth", component: UserAuth, name: "Authentication", meta: { title: "Authentication | Chordex" } },
        { path: "/profile", component: UserProfile, name: "Account Settings", meta: { title: "My Profile | Chordex" } },
        { path: "/artists", component: Artists, name: "Artists", meta: { title: "Artists | Chordex" } },
        { path: "/artists/:name", component: Songs, name: "Artists Songs", meta: { title: "Artists Songs | Chordex" } },
        { path: "/new", component: AddSong, name: "Add Song", meta: { title: "Add Song | Chordex" } },
        { path: "/new/:songId(\\d+)", component: AddSong, name: "EditSong", meta: { title: "Edit Song | Chordex" } },
        { path: "/my-songs", component: MySongs, name: "My Songs", meta: { title: "MySongs | Chordex" } },
        { path: "/find-key", component: FindKey, name: "Music Keys", meta: { title: "Find Key | Chordex" } },
        { path: "/my-songs/:songId(\\d+)", component: SongDetail, name: "MySongDetail", meta: { title: "SongDetail | Chordex" }, props: true },
        { path: "/:notFound(.*)*", component: NotFound, meta: { title: "Not Found" } },
    ]
});


router.beforeEach((to, _, next) => {

    document.title = `${to.meta.title}` || "Quotex";
    next();

    //ruta add new song before its saved, ako nije ondapronpt
})



export default router