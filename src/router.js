import { createRouter, createWebHistory } from "vue-router";

import Songs from "./pages/Songs.vue"
import Favorites from "./pages/Favorites.vue"
import SongDetail from "./pages/SongDetail.vue"

// const Favorites=()=>import("./pages/Favorites.vue")
// const Songs=()=>import("./pages/Songs.vue")

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "/songs" },
        { path: "/songs", component: Songs, name: "Songs", meta: { title: "Songs | Chordex" } },
        {
            path: "/songs/:songId", component: SongDetail, name: "SongDetail", meta: { title: "Song Detail | Chordex" }, props: true,
            // children: [
            //     {path:"/edit",component:SongEdit}
            // ]
        },

        { path: "/favorites", component: Favorites, name: "Favorites", meta: { title: "Favorites | Chordex" } },

    ]
});



router.beforeEach((to, _, next) => {
    document.title = `${to.meta.title} | Quotex`;
    next();
})



export default router