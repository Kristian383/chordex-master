import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            sidebarActive: true,
            allFilters:["all","favorites","acoustic","electric","easy","medium","hard"],
            songs: [{ artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "easy", lastViewed: "2d ago",songId:"1" },
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 1, difficulty: "easy", lastViewed: "2d ago" }, 
            { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 4, difficulty: "hard", lastViewed: "2d ago" },
             { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 5, difficulty: "medium", lastViewed: "2d ago" },
              { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "medium", lastViewed: "2d ago" },
               { artist: "Nirvana", songName: "Lithium", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "hard", lastViewed: "2d ago" }, 
               { artist: "RHCP", songName: "Californication", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practiced: 2, difficulty: "easy", lastViewed: "2d ago" }, 
               { artist: "Nirvana", songName: "Smells like teen spirit", key: "Am", bpm: 102, progression: "I V vi ", notes: "", capo: "", isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practiced: 2, difficulty: "easy", lastViewed: "2d ago" }]
        }
    },
    getters: {
        sidebarIsActive(state) {
            return state.sidebarActive;
        },
        getAllSongs(state) {
            return state.songs;
        },
        getAllFilters(state){
            return state.allFilters;
        },


    },

    mutations: {
        toggleSidebar(state) {
            state.sidebarActive = !state.sidebarActive;
        },
        setActiveFilters(state,payload){
            console.log(state,payload);
            //napraviti logiku da ako je payload "all" treba isprazniti listu active filtera 
        }
    }



    //to do
    //song id preko date

})




export default store;