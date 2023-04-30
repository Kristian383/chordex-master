import { createStore } from "vuex";
import getters from "./songs/getters.js";
import actions from "./songs/actions";
import mutations from "./songs/mutations.js";
import authModule from './auth/index.js';

const store = createStore({
    modules: { auth: authModule },
    state() {
        return {
            sidebarIsActive: false,
            songDetailTitle: null,
            // darkMode: false,
            songsLoading: false,
            mobile:null,
            musicKeys: [],
            artists: [],
            mySongs: [],
            songs: [],
            playlists: [],
            activePlaylistSongs: [],
            activeFilters: ["all"],
            usefulResources: {
                notes: null,
                websitesLinks: [],
                txtAreaHeight: 600
            }
        };
    },
    getters,
    mutations,
    actions
});

export default store;