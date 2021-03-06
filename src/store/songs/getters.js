export default {
    isDarkMode(state) {
        return state.darkMode;
    },
    songsLoading(state) {
        return state.songsLoading
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
    indexOfCurrentSong(state) {
        return (payload) => {
            if (payload.query) {
                return state.mySongs.findIndex(song => song.songId == payload.id)
            } else
                return state.songs.findIndex(song => {
                    return song.songId == payload.id
                })
        }
    }
    ,
    getAllSongs(state) {
        return state.songs;
    },
    getAllSongsLen(state) {
        return state.songs.length;
    },
    getAllMySongsLen(state) {
        return state.mySongs.length;
    },
    getAllMySongs(state) {
        return state.mySongs;
    },
    findSong(state) {
        return songId => {
            let foundSong = state.songs.find(song => song.songId == songId)
            if (!foundSong) {
                foundSong = state.mySongs.find(song => song.songId == songId)
            }
            return foundSong
        }
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
        return (filters, query = null) => {

            //  in case of displaying all  songs from artist
            if (!filters.length && query.artist) {
                return state.songs.filter(song => song.artist.toLowerCase() == query.artist.toLowerCase())
            }
            //in case of displaying all songs 
            if (!filters.length || filters == "all") {

                if (query.isMySong) {
                    return state.mySongs
                } else {
                    return state.songs
                }
            }

            //in case when we need to filter songs
            if (query.isMySong) {
                // console.log("imamo query");
                return state.mySongs.filter(song => {
                    return getters.filterHelper(filters, song)
                })
            } else if (query.artist) {
                return state.songs.filter(song => song.artist.toLowerCase() == query.artist.toLowerCase()).filter(song => {
                    return getters.filterHelper(filters, song)
                })
                // return state.songs.filter(song => {
                //     return getters.filterHelper(filters, song)
                // })
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

    getSongsByKey(state) {
        const keys = state.musicKeys;
        const sortedSongs = {}
        const songs = state.songs;
        if (!keys.length) return

        songs.forEach(song => {
            if (!song.firstKey) return;

            let [key, quality] = song.firstKey.toLowerCase().split(" ");
            const songData = { songId: song.songId, songName: song.songName, artist: song.artist, songKey: song.firstKey, imgUrl: song.imgUrl };

            if (quality === "minor") {
                let relativeMajor = keys.filter(item => {
                    return item.relativeMinor.toLowerCase() === key
                })[0].key.toLowerCase();

                if (sortedSongs[relativeMajor]) sortedSongs[relativeMajor].push(songData)
                else sortedSongs[relativeMajor] = [songData]

            } else {
                if (sortedSongs[key]) sortedSongs[key].push(songData)
                else sortedSongs[key] = [songData]
            }
        })
        return sortedSongs
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
    },
    isMobile(state) {
        return state.mobile
    }


}