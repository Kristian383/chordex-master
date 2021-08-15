import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            sidebarActive: true,
            songs: [{ artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "easy", lastViewed: "2d ago" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "easy", lastViewed: "2d ago" }, 
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "hard", lastViewed: "2d ago" },
             { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "medium", lastViewed: "2d ago" },
              { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "medium", lastViewed: "2d ago" },
               { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "hard", lastViewed: "2d ago" }, 
               { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "easy", lastViewed: "2d ago" }, 
               { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "easy", lastViewed: "2d ago" }]
        }
    },
    getters: {
        sidebarIsActive(state) {
            return state.sidebarActive;
        },
        getAllSongs(state) {
            return state.songs;
        }
    },

    mutations: {
        toggleSidebar(state) {
            state.sidebarActive = !state.sidebarActive;
        }
    }

})




export default store;