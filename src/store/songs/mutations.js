export default {
    toggleSidebar(state) {
        state.sidebarActive = !state.sidebarActive;
    },
    // loadMoreSongs(state,payload){
    //     //dohvatiti podatke carda i pushati u songs array
    //posto imamo u songs computed za getAllSongs mozda netreba nista dalje
    //     //to dohvacat preko gettersa i indexa odakle dokle dohvatiti -slice?
    //     //poslati kao prop
    // }
    toggleDarkMode(state) {
        state.darkMode = !state.darkMode;
    },
    toggleFavorite(state, payload) {
        const index = state.songs.findIndex(song => song.songId == payload);
        state.songs[index].isFavorite = !state.songs[index].isFavorite;
    },
    selectKey(state, payload) {
        // console.log("tu",payload);
        if (payload.name == "firstKey") {
            state.firstKey = payload.key;
        } else {
            state.secondKey = payload.key;
        }
    }, removeSecondKey(state) {
        state.secondKey = null;
    },
    addSong(state, payload) {
        var today = new Date();
        var dateCreated = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const songId = Date.now();

        const song = {
            ...payload,
            dateCreated,
            songId,
        }
        //ubaciti notes in keys i napraviti provjeru jeli second key null
        state.songs.unshift(song)
    },
    setActiveFilters(state, payload) {
        state.activeFilters = payload;
    }, setSongDetailTitle(state, payload) {
        state.songDetailTitle = payload;
    },
    // sortSongsOption(state,option)
    // {
    //     state.sortSongsOption=option;
    // }
    sortSongs(state, option) {
        console.log("opcija", option);
        if (option == "A-Z") {
            state.songs.sort((a, b) => a.song.localeCompare(b.song))
        } else if (option == "Z-A") {
            state.songs.sort((a, b) => b.song.localeCompare(a.song))
        } else if (option == "least") {
            state.songs.sort((a, b) => a.practicedPrcntg - b.practicedPrcntg)
        } else if (option == "best") {
            state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
        }
        // else if (option == "oldest") {
        //     state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
        // }else{

        // }


    },
     
}