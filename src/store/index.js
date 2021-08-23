import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            sidebarActive: true,
            darkMode: false,
            allFilters: ["all", "acoustic", "electric", "easy", "medium", "hard"],
            songs: [{ artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "easy", lastViewed: "2d ago", songId: "1" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 1, difficulty: "easy", lastViewed: "2d ago", songId: "2" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 4, difficulty: "hard", lastViewed: "2d ago", songId: "6" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 5, difficulty: "medium", lastViewed: "2d ago", songId: "3" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago", songId: "4" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "hard", lastViewed: "2d ago", songId: "5" },
            { artist: "RHCP", songName: "Californication", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "easy", lastViewed: "2d ago" },
            { artist: "RHCP", songName: "Californication", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "easy", lastViewed: "2d ago" },
            { artist: "RHCP", songName: "Zephyr Song", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "easy", lastViewed: "2d ago" },
            { artist: "Nirvana", songName: "Smells like teen spirit", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "easy", lastViewed: "2d ago" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" }, { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" },]
        }
    },
    getters: {
        sidebarIsActive(state) {
            return state.sidebarActive;
        },
        getAllSongs(state) {
            return state.songs;
        },
        getAllFilters(state) {
            return state.allFilters;
        },
        isDarkMode(state) {
            return state.darkMode;
        },
        getFavoriteSongs(state) {

            const favorites = state.songs.filter(song => song.isFavorite);
            return favorites;
        },



    },

    mutations: {
        toggleSidebar(state) {
            state.sidebarActive = !state.sidebarActive;
        },
        // loadMoreSongs(state,payload){
        //     //dohvatiti podatke carda i pushati u songs array
        //posto imamo u songs computed za getAllSongs mozda netreba nista dalje
        //     //to dohvacat preko gettersa i indexa odakle dokle dohvatiti -slice?
        //     //poslati kao prop
        // }
        toggleDarkMode(state) {
            state.darkMode = !state.darkMode;
        },
        toggleFavorite(state, payload) {
            const index = state.songs.findIndex(song => song.songId == payload);
            console.log(index);
            state.songs[index].isFavorite = !state.songs[index].isFavorite;
        }

    }



    //to do
    //song id preko date

})




export default store;