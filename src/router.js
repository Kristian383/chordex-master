import { createRouter, createWebHistory } from "vue-router";

import Songs from "./pages/Songs.vue"
import UserProfile from "./pages/UserProfile.vue"
import SongDetail from "./pages/SongDetail.vue"
import Artists from "./pages/Artists.vue"
import AddSong from "./pages/AddSong.vue"
import NotFound from "./pages/NotFound.vue"

// const Favorites=()=>import("./pages/Favorites.vue")
// const Songs=()=>import("./pages/Songs.vue")

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/songs" },
        { path: "/songs", component: Songs, name: "Songs", meta: { title: "Songs | Chordex" } },
        {
            path: "/songs/:songId(\\d+)", component: SongDetail, name: "SongDetail", meta: { title: "Song Detail | Chordex" }, props: true,
            // children: [
            //     {path:"/edit",component:SongEdit}
            // ]
        },

        { path: "/profile", component: UserProfile, name: "MyProfile", meta: { title: "My Profile | Chordex" } },
        { path: "/artists", component: Artists, name: "Artists", meta: { title: "Artists | Chordex" } },
        { path: "/new", component: AddSong, name: "AddSong", meta: { title: "AddSong | Chordex" } },
        { path: "/:notFound(.*)*", component: NotFound, meta: { title: "Not Found" } },
    ]
});


router.beforeEach((to, _, next) => {

    document.title = `${to.meta.title} | Quotex`;
    next();

    //ruta add new song before its saved, ako nije ondapronpt
})



export default router