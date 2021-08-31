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
            
            if (!filters.length || filters=="all") {
                // console.log("prazno udje, vracam sve pjesme");
                return state.songs
            }

            const songs = state.songs.filter(song => {

                let songIsValid=true;

                filters.forEach(el => {
                    if(el=="favorites"){
                        songIsValid=songIsValid && song.isFavorite
                    }
                    if(el=="easy"){
                        songIsValid=songIsValid && song.difficulty == "easy" ? true:false;
                    }else if(el=="medium"){
                        songIsValid=songIsValid && song.difficulty == "medium" ? true:false;
                    }else if(el =="hard"){
                        songIsValid=songIsValid && song.difficulty == "hard" ? true:false;
                    }
                    if(el=="acoustic"){
                        songIsValid=songIsValid && song.acoustic
                    }
                    if(el=="electric"){
                        songIsValid=songIsValid && song.electric
                    }
                    
                });
                return songIsValid
            })
            // console.log("hei", songs);
            return songs
        }

    },
    getAllMySongs(state){
        return state.songs.filter(song=>song.isMySong);
    },
    getArtists(state){
        return state.artists;
    }


}