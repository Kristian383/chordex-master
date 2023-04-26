export default {
    // isDarkMode(state) {
    //     return state.darkMode;
    // },
    songsLoading(state) {
        return state.songsLoading;
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
                return state.mySongs.findIndex(song => song.songId == payload.id);
            } else
                return state.songs.findIndex(song => {
                    return song.songId == payload.id;
                });
        };
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
            let foundSong = state.songs.find(song => song.songId == songId);
            if (!foundSong) {
                foundSong = state.mySongs.find(song => song.songId == songId);
            }
            return foundSong;
        };
    },
    filterSongs(state, getters) {
        return (filters, query = null) => {
            // in case of displaying all songs from artist
            if (filters[0] === "all" && query.artist) {
                return state.songs.filter(song => song.artist.toLowerCase() == query.artist.toLowerCase());
            }
            // in case of displaying all songs 
            if (filters[0] === "all") {
                if (query.isMySong) return state.mySongs;
                return state.songs;
            }
            // in case when we need to filter songs when filter option is !== "all"
            if (query.isMySong) {
                return state.mySongs.filter(song => getters.shouldFilterSong(filters, song));
            } else if (query.artist) {
                return state.songs.filter(song => song.artist.toLowerCase() === query.artist.toLowerCase()).filter(song => {
                    return getters.shouldFilterSong(filters, song);
                });
            } else {
                return state.songs.filter(song => {
                    return getters.shouldFilterSong(filters, song);
                });
            }
        };
    },
    shouldFilterSong() {
        return (filters, song) => {
            return filters.every(filterOption => {
                if (filterOption === "favorites") {
                  return song.isFavorite;
                }
                if (filterOption === "acoustic") {
                  return song.acoustic;
                }
                if (filterOption === "electric") {
                  return song.electric;
                }
                return song.difficulty === filterOption;
              });
        };
    },
    getSongsFromPlaylist(state, getters) {
        return (filters) => {
            const activePlaylistSongs = state.activePlaylistSongs;
            if (filters[0] === "all") return state.songs.filter(song => activePlaylistSongs.includes(song.songId));
            return state.songs.filter(song =>  activePlaylistSongs.includes(song.songId) && getters.shouldFilterSong(filters, song));
        };
    },
    getActiveFilters(state) {
        return state.activeFilters;
    },
    getSongsByKey(state) {
        const keys = state.musicKeys;
        const sortedSongs = {};
        const songs = state.songs;
        if (!keys.length) return;

        songs.forEach(song => {
            if (!song.firstKey) return;

            let [key, quality] = song.firstKey.toLowerCase().split(" ");
            const songData = { songId: song.songId, songName: song.songName, artist: song.artist, songKey: song.firstKey, imgUrl: song.imgUrl };

            if (quality === "minor") {
                let relativeMajor = keys.filter(item => {
                    return item.relativeMinor.toLowerCase() === key;
                })[0].key.toLowerCase();

                if (sortedSongs[relativeMajor]) sortedSongs[relativeMajor].push(songData);
                else sortedSongs[relativeMajor] = [songData];

            } else {
                if (sortedSongs[key]) sortedSongs[key].push(songData);
                else sortedSongs[key] = [songData];
            }
        });
        return sortedSongs;
    },

    getArtists(state) {
        return state.artists;
    },
    getPlaylists(state) {
        return state.playlists;
    },
    getActivePlaylistSongsLength(state) {
        return state.activePlaylistSongs.length;
    },
    // resources
    getUserNotes(state) {
        return state.usefulResources.notes;
    },
    getUserWebsitesLinks(state) {
        return state.usefulResources.websitesLinks;
    },
    getTxtAreaHeight(state) {
        return state.usefulResources.txtAreaHeight;
    },
    isMobile(state) {
        return state.mobile;
    }
};