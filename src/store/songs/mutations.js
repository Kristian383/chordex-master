export default {
    toggleSidebar(state) {
        state.sidebarIsActive = !state.sidebarIsActive;
    },
    removeSidebar(state) {
        state.sidebarIsActive = false;
    },
    // toggleDarkMode(state) {
    //     state.darkMode = !state.darkMode;
    // },
    toggleFavorite(state, payload) {
        let index = state.songs.findIndex(song => song.songId == payload.songId);
        state.songs[index].isFavorite = !state.songs[index].isFavorite;
    },
    setSongDetailTitle(state, payload) {
        state.songDetailTitle = payload;
    },
    sortSongs(state, option) {
        if (option == "A-Z") {
            state.songs.sort((a, b) => a.songName.localeCompare(b.songName))
        } else if (option == "Z-A") {
            state.songs.sort((a, b) => b.songName.localeCompare(a.songName))
        } else if (option == "Least learned") {
            state.songs.sort((a, b) => a.practicedPrcntg - b.practicedPrcntg)
        } else if (option == "Best learned") {
            state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
        }
        else if (option == "Last viewed") {
            state.songs.sort((a, b) => {
                return new Date(b.lastViewed) - new Date(a.lastViewed)
            })
        }
        else {
            state.songs.sort((a, b) => {
                return new Date(a.lastViewed) - new Date(b.lastViewed)
            })
        }
        // console.log(state.songs);
    },
    deleteSong(state, id) {
        let index = state.songs.findIndex(song => song.songId == id);
        state.songs.splice(index, 1)
    },
    updateSong(state, payload) {
        let index = state.songs.findIndex(song => song.songId == payload.songId);
        state.songs[index] = payload
    },
    // insertSongAndArtist(state, payload) {
    //     state.songs.unshift(payload)
    // },
    setAllSongs(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            // state.songs.unshift(payload[i])
            if (payload[i].isMySong) {
                state.mySongs.push(payload[i])

            } else {

                state.songs.push(payload[i])
            }
        }
    },

    //artists
    setAllArtists(state, payload) {
        for (let i = 0; i < payload.length; i++) {
            // state.songs.unshift(payload[i])
            if(payload[i].name==state.auth.user.username){
                continue
            }
            state.artists.push(payload[i])
        }

        for (let i = 0; i < state.artists.length; i++) {
            state.artists[i].order = i + 1
        }

    },
    sortArtists(state, option) {
        if (option == "A-Z") {
            state.artists.sort((a, b) => a.name.localeCompare(b.name))
        } else if (option == "Z-A") {
            state.artists.sort((a, b) => b.name.localeCompare(a.name))
        }
    },
    // updateArtistsList(state, payload) {
    //     state.artists = payload
    // },

    // resources
    storeMusicKeys(state, payload) {
        state.musicKeys = payload
    },
    updateUserNotes(state, payload) {
        state.usefulResources.notes = payload;
    },
    addUserWebsite(state, payload) {
        state.usefulResources.websitesLinks.unshift(payload)
    },
    deleteUserWebsite(state, name) {
        let index = state.usefulResources.websitesLinks.findIndex(link => link.name == name);
        state.usefulResources.websitesLinks.splice(index, 1)
    },
    updateTxtAreaHeight(state, payload) {
        state.usefulResources.txtAreaHeight = payload;
    },
    setUserWebsites(state, payload) {
        state.usefulResources.websitesLinks = payload
    },

    clearVuex(state) {
        state.songsLoaded = 2;
        state.mySongsLoaded = 2;
        state.artistsLoaded = 2;
        state.musicKeys = [];
        state.artists = [];
        state.mySongs = [];
        state.songs = [];
        state.songDetailTitle = null;

        state.usefulResources = {
            notes: null,
            websitesLinks: [],
            txtAreaHeight: 400
        };
    }

}