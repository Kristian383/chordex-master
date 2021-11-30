import { createStore } from "vuex";
import getters from "./songs/getters.js"
import actions from "./songs/actions"
import mutations from "./songs/mutations.js"
import authModule from './auth/index.js';

const store = createStore({
    modules: { auth: authModule },
    state() {
        return {
            sidebarIsActive: false,
            songDetailTitle: null,
            darkMode: false,
            songsLoading:false,
            // songsLoaded: 2,
            // mySongsLoaded: 2,
            // artistsLoaded: 2,
            mobile:null,
            musicKeys: [],
            artists: [],
            mySongs: [],
            songs: [
                //     { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4", secondProgression: "5 4 1", songText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F", acoustic: true, electric: false, capo: null, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "12", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "www.chords.com", tuning: "DADGAD", isMySong: false },

            ],
            usefulResources: {
                notes: null,
                websitesLinks: [],
                txtAreaHeight: 600
            }
        }
    },
    getters,
    mutations,
    actions
})

export default store;