import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            sidebarActive: true, firstKey: null, secondKey: null,
            darkMode: false,
            allFilters: ["all", "acoustic", "electric", "easy", "medium", "hard"],
            songs: [{ artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:false, capo: null, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 2, difficulty: "easy", lastViewed: "2d ago", songId: "1",yt_link:"",chords_link:"" },





            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:true, capo: 1, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 1, difficulty: "easy", lastViewed: "2d ago", songId: "2",yt_link:"",chords_link:"" },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:false,electric:false, capo: null, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 4, difficulty: "hard", lastViewed: "2d ago", songId: "6",yt_link:"",chords_link:"" },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:true, capo: 2, isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 5, difficulty: "medium", lastViewed: "2d ago", songId: "3",yt_link:"",chords_link:"" },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:false,electric:true, capo: null, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 2, difficulty: "medium", lastViewed: "2d ago", songId: "4",yt_link:"",chords_link:"" },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 2, difficulty: "hard", lastViewed: "2d ago", songId: "5",yt_link:"",chords_link:"" }]
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

        selectedKeys(state) {
            const selected = {
                first: state.firstKey,
                second: state.secondKey
            }
            return selected
        }

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
            state.songs[index].isFavorite = !state.songs[index].isFavorite;
        },
        selectKey(state, payload) {
            // console.log("tu",payload);
            if (payload.name == "firstKey") {
                state.firstKey = payload.key;
            } else {
                state.secondKey = payload.key;
            }
        }, removeSecondKey(state) {
            state.secondKey = null;
        },
        addSong(state, payload) {
            var today = new Date();
            var dateCreated = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            const songId = Date.now();

            const song = {
                ...payload,
                dateCreated,
                songId,
            }
            state.songs.unshift(song)
        }

    },
    actions: {
        addNewSong(context, payload) {

            //http
            //pronaci image url

            context.commit("addSong", payload)
        }
    }



    //to do
    //song id preko date

})




export default store;