// import router from './../../router.js'

export default {
    sidebarIsActive(state) {
        return state.sidebarIsActive;
    },
    getAllSongs(state) {
        return state.songs;
        // .filter(song=>song.mySong==false)
    },
    getAllMySongs(state) {
        return state.mySongs;
    },
    lazyLoadSongs(state) {

        return (type) => {

            if (type == "songs") {

                return state.songs.slice(0, state.songsLoaded)
            }else{
                return state.songs.slice(0, state.mySongsLoaded)

            }
        }

    },
    isDarkMode(state) {
        return state.darkMode;
    },
    getMusicKeys(state) {
        // if(state.musicKeys)
        return state.musicKeys;
        // else return []
    },
    getSongDetailTitle(state) {
        return state.songDetailTitle;
    },

    filterSongs(state, getters) {
        return (filters, query = null, artist = null) => {

            if (artist) {
                return getters.lazyLoadSongs("songs").filter(song => song.artist.toLowerCase() == artist.toLowerCase())
            }

            //in case of displaying all songs 
            if (!filters.length || filters == "all") {
                // console.log("prazno udje, vracam sve pjesme");

                if (query) {
                    return state.mySongs
                } else {
                    return getters.lazyLoadSongs("songs")
                }
                // return getters.lazyLoadSongs("songs").filter(song => {
                //     if (song.isMySong && query) {
                //         return true
                //     }
                //      else if (song.isMySong && !query) {
                //         return false
                //     } else if (!song.isMySong && !query) {
                //         return true

                //     }
                // })
            }

            //in case when we need to filter songs 
            if (query) {
                return state.mySongs.filter(song => {
                    return getters.filterHelper(filters, song)
                })
            } else {
                return getters.lazyLoadSongs("songs").filter(song => {
                    return getters.filterHelper(filters, song)
                })
            }

            // const songs = state.songs.filter(song => {

            //     if (song.isMySong && !query) return false;
            //     if (!song.isMySong && query) return false;

            //     let songIsValid = true;

            //     filters.forEach(el => {
            //         if (el == "favorites") {
            //             songIsValid = songIsValid && song.isFavorite
            //         }
            //         if (el == "easy") {
            //             songIsValid = songIsValid && song.difficulty == "easy" ? true : false;
            //         } else if (el == "medium") {
            //             songIsValid = songIsValid && song.difficulty == "medium" ? true : false;
            //         } else if (el == "hard") {
            //             songIsValid = songIsValid && song.difficulty == "hard" ? true : false;
            //         }
            //         if (el == "acoustic") {
            //             songIsValid = songIsValid && song.acoustic
            //         }
            //         if (el == "electric") {
            //             songIsValid = songIsValid && song.electric
            //         }

            //     });
            //     return songIsValid
            // })
            // return songs
        }

    },
    filterHelper() {

        return (filters, song) => {
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
        }
    },

    // getAllMySongs(state) {
    //     return state.songs.filter(song => song.isMySong);
    // },
    getArtists(state) {
        // console.log("hey");
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