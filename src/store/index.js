import { createStore } from "vuex";
import getters from "./songs/getters"
// import router from './../router.js'

const store = createStore({
    state() {
        return {
            sidebarActive: true, firstKey: null, secondKey: null, songDetailTitle: null, apiData: null,
            darkMode: false,
            // sortSongsOption: "newest",
            mySongs:[],
            songs: [{ artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4", secondProgression: "5 4 1", songText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F", acoustic: true, electric: false, capo: 4, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "1", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "www.chords.com", tuning: "DADGAD", mySong: true },





            { artist: "RHCP", song: "californication", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: true, capo: 1, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 71, difficulty: "easy", lastViewed: "2d ago", songId: "2", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "", tuning: null, mySong: true },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: false, electric: false, capo: null, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 84, difficulty: "hard", lastViewed: "2d ago", songId: "6", yt_link: "", chords_link: "", tuning: null, mySong: false },
            { artist: "Nirvana", song: "Californication", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: true, capo: 2, isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 65, difficulty: "medium", lastViewed: "2d ago", songId: "3", yt_link: "", chords_link: "", tuning: null, mySong: false },
            { artist: "RHCP", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: false, electric: true, capo: null, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 32, difficulty: "medium", lastViewed: "2d ago", songId: "4", yt_link: "", chords_link: "", tuning: null, mySong: true },
            { artist: "Nirvana", song: "Smells like teen spirit", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "5", yt_link: "", chords_link: "", tuning: null, mySong: false }]
        }
    },
    getters,

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
            //ubaciti notes in keys i napraviti provjeru jeli second key null

            if(song.isMySong){
                state.mySongs.unshift(song)
            }else
            state.songs.unshift(song)
        },
        // setActiveFilters(state, payload) {
        //     state.activeFilters = payload;
        // },
        setSongDetailTitle(state, payload) {
            state.songDetailTitle = payload;
        },
        // sortSongsOption(state,option)
        // {
        //     state.sortSongsOption=option;
        // }
        sortSongs(state, option) {
            console.log("opcija", option);
            if (option == "A-Z") {
                state.songs.sort((a, b) => a.song.localeCompare(b.song))
            } else if (option == "Z-A") {
                state.songs.sort((a, b) => b.song.localeCompare(a.song))
            } else if (option == "least") {
                state.songs.sort((a, b) => a.practicedPrcntg - b.practicedPrcntg)
            } else if (option == "best") {
                state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
            }
            // else if (option == "oldest") {
            //     state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
            // }else{

            // }
            // console.log(state.songs);

        },


    },
    actions: {
        addNewSong(context, payload) {

            //http
            //pronaci image url

            context.commit("addSong", payload)
        },
        async apiForSongInfo(context, payload) {
            // const response = await fetch(`https://accounts.spotify.com/api/token`,{
            //     method:"GET",

            // });
            console.log(process.env.VUE_APP_CLIENT_ID);

            const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:8080/new&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

            window.location.href = AUTH_URL

            // router.push(AUTH_URL)

            const response = await fetch(`https://api.getsongbpm.com/song/?api_key=${process.env.VUE_APP_CLIENT_ID}&id=983pB`);
            const responseData = await response.json();

            if (!response.ok) {
                const error = new Error(responseData.message || "failed to fetch request")
                throw error;
            }
            console.log("paays", payload);
            console.log("responseData", responseData);
            context.commit("addApiData", responseData)
        }

        //https://accounts.spotify.com/api/

    }



})




export default store;