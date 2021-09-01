import router from './../../router.js'
export default {
    sidebarIsActive(state) {
        return state.sidebarActive;
    },
    getAllSongs(state) {
        return state.songs;
        // .filter(song=>song.mySong==false)
    },
    // getAllFilters(state) {
    //     return state.allFilters;
    // },

    // getActiveFilters(state) {

    //     return state.activeFilters;
    // },
    isDarkMode(state) {
        return state.darkMode;
    },
    // getFavoriteSongs(state) {
    //     console.log(state.songs);
    //     return state.songs.filter(song => song.isFavorite);

    // },

    selectedKeys(state) {
        const selected = {
            first: state.firstKey,
            second: state.secondKey
        }
        return selected
    },
    getSongDetailTitle(state) {
        return state.songDetailTitle;
    },
    filterSongs(state) {
        return (filters) => {

            if (!filters.length || filters == "all") {
                // console.log("prazno udje, vracam sve pjesme");
                return state.songs.filter(song => {
                    if (song.isMySong && router.currentRoute._rawValue.path == "/my-songs") {
                        return true
                    } else if (song.isMySong && router.currentRoute._rawValue.path != "/my-songs") {
                        return false
                    } else if(!song.isMySong && router.currentRoute._rawValue.path == "/songs"){
                        return true

                    }
                })
            }
            // console.log(router.currentRoute._rawValue.path);

            const songs = state.songs.filter(song => {

                if (song.isMySong && router.currentRoute._rawValue.path != "/my-songs") return false;
                if (!song.isMySong && router.currentRoute._rawValue.path == "/my-songs") return false;

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
            // console.log("hei", songs);
            return songs
        }

    },
    getAllMySongs(state) {
        return state.songs.filter(song => song.isMySong);
    },
    getArtists(state) {
        return state.artists;
    }


}