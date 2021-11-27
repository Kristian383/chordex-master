export default {
    isDarkMode(state) {
        return state.darkMode;
    },
    getMusicKeys(state) {
        return state.musicKeys;
    },
    getSongDetailTitle(state) {
        return state.songDetailTitle;
    },
    sidebarIsActive(state) {
        return state.sidebarIsActive;
    },
    getAllSongs(state) {
        return state.songs;
    },
    getAllMySongs(state) {
        return state.mySongs;
    },
    // lazyLoadSongs(state) {

    //     return (type) => {

    //         if (type == "songs") {

    //             return state.songs.slice(0, state.songsLoaded)
    //         } else {
    //             return state.songs.slice(0, state.mySongsLoaded)

    //         }
    //     }

    // },

    filterSongs(state, getters) {
        return (filters, query = null, artist = null) => {

            if (artist) {
                return state.songs.filter(song => song.artist.toLowerCase() == artist.toLowerCase())
            }
            //in case of displaying all songs 
            if (!filters.length || filters == "all") {

                if (query) {
                    return state.mySongs
                } else {
                    return state.songs
                }
            }

            //in case when we need to filter songs 
            if (query) {
                return state.mySongs.filter(song => {
                    return getters.filterHelper(filters, song)
                })
            } else {
                return state.songs.filter(song => {
                    return getters.filterHelper(filters, song)
                })
            }
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

    getArtists(state) {
        return state.artists;
    },

    // resources
    getUserNotes(state) {
        return state.usefulResources.notes
    },
    getUserWebsitesLinks(state) {
        return state.usefulResources.websitesLinks
    },
    getTxtAreaHeight(state) {
        return state.usefulResources.txtAreaHeight
    }


}