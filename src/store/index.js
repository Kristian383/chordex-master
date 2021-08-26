import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            sidebarActive: true, firstKey: null, secondKey: null,songDetailTitle:null,
            darkMode: false,
            allFilters: ["all", "acoustic", "electric", "easy", "medium", "hard"],
            activeFilters:{all:true},
            songs: [{ artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4",secondProgression:"5 4 1",songText:"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F",acoustic:true,electric:false, capo: 4, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "1",yt_link:"https://www.youtube.com/embed/32GZ3suxRn4",chords_link:"www.chords.com",tuning:"DADGAD" },





            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:true, capo: 1, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 71, difficulty: "easy", lastViewed: "2d ago", songId: "2",yt_link:"https://www.youtube.com/embed/32GZ3suxRn4",chords_link:"",tuning:null },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:false,electric:false, capo: null, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 84, difficulty: "hard", lastViewed: "2d ago", songId: "6",yt_link:"",chords_link:"",tuning:null },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:true, capo: 2, isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 65, difficulty: "medium", lastViewed: "2d ago", songId: "3",yt_link:"",chords_link:"",tuning:null },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:false,electric:true, capo: null, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 32, difficulty: "medium", lastViewed: "2d ago", songId: "4",yt_link:"",chords_link:"",tuning:null },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ",secondProgression:"5 4 1",songText:"", firstKeyNotes: "", secondKeyNotes: "",acoustic:true,electric:false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "5",yt_link:"",chords_link:"",tuning:null }]
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
        
        getActiveFilters(state){
            
            return state.activeFilters;
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
        },
        getSongDetailTitle(state){
            return state.songDetailTitle;
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
        },
        setActiveFilters(state,payload)
        {
            state.activeFilters=payload;
        },setSongDetailTitle(state,payload)
        {
            state.songDetailTitle=payload;
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