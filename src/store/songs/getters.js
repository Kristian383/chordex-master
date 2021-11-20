// import router from './../../router.js'

export default {
    sidebarIsActive(state) {
        return state.sidebarIsActive;
    },
    getAllSongs(state) {
        return state.songs;
        // .filter(song=>song.mySong==false)
    },
    isDarkMode(state) {
        return state.darkMode;
    },
    getMusicKeys(state) {
        // if(state.musicKeys)
        return state.musicKeys;
        // else return []
    },
    // getKeyNotes(state, payload) {
    //     if (state.musicKeys) {
    //         let notes = state.musicKeys;
    //         console.log("notes",notes);

    //         if (payload.quality == "major") {
    //             notes = notes.filter(key => key.key == payload.selectedKey)[0].notes
    //         } else {
    //             notes = notes.filter(key => key.relativeMinor == payload.selectedKey)[0].notes
    //         }
    //         return notes
    //     } else {
    //         return
    //     }
    // },
    getSongDetailTitle(state) {
        return state.songDetailTitle;
    },
    // filterSongs22(state,payload){
    //     console.log(state,payload);
    // }
    // ,
    filterSongs(state) {
        return (filters,query=null, artist = null) => {

            if (artist) {
                return state.songs.filter(song => song.artist.toLowerCase() == artist.toLowerCase())
            }
            //console.log(query);

            if (!filters.length || filters == "all") {
                // console.log("prazno udje, vracam sve pjesme");
                return state.songs.filter(song => {
                    if (song.isMySong && query) {
                        return true
                    } else if (song.isMySong && !query) {
                        return false
                    } else if (!song.isMySong && !query) {
                        return true

                    }
                })
            }
            // console.log(router.currentRoute._rawValue.path);

            const songs = state.songs.filter(song => {

                if (song.isMySong && !query) return false;
                if (!song.isMySong && query) return false;

                // let mySong=song.isMySong && router.currentRoute._rawValue.path == "/my-songs";
                // console.log(mySong);

                let songIsValid = true;

                filters.forEach(el => {
                    if (el == "favorites") {
                        songIsValid = songIsValid && song.isFavorite
                    }
                    if (el == "easy") {
                        songIsValid = songIsValid && song.difficulty == "easy" ? true : false;
                    } else if (el == "medium") {
                        songIsValid = songIsValid && song.difficulty == "medium" ? true : false;
                    } else if (el == "hard") {
                        songIsValid = songIsValid && song.difficulty == "hard" ? true : false;
                    }
                    if (el == "acoustic") {
                        songIsValid = songIsValid && song.acoustic
                    }
                    if (el == "electric") {
                        songIsValid = songIsValid && song.electric
                    }

                });
                return songIsValid
            })
            return songs
        }

    },
    getAllMySongs(state) {
        return state.songs.filter(song => song.isMySong);
    },
    getArtists(state) {
        return state.artists;
    },


    // resources
    getUserNotes(state) {
        return state.usefulResources.notes
    },
    // getUserNotesHeight(state) {
    //     return state.usefulResources.txtAreaHeight
    // },
    getUserWebsitesLinks(state) {
        return state.usefulResources.websitesLinks
    },
    getTxtAreaHeight(state) {
        return state.usefulResources.txtAreaHeight
    }


}