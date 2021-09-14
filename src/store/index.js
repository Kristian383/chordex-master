import { createStore } from "vuex";
import getters from "./songs/getters.js"
// import router from './../router.js'
import authModule from './auth/index.js';

const store = createStore({
    modules: { auth: authModule },
    state() {
        return {
            sidebarIsActive: true,
            // isLogged: false,
            songDetailTitle: null,
            darkMode: false,
            
            musicKeys: [
                { key: "C", notes: ["C", "D", "E", "F", "G", "A", "B"] },
                { key: "G", notes: ["G", "A", "B", "C", "D", "E", "F#"] },
                { key: "D", notes: ["D", "E", "F#", "G", "A", "B", "C#"] },
                { key: "A", notes: ["A", "B", "C#", "D", "E", "F#", "G#"] },
                { key: "E", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
                { key: "B", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
                { key: "F#", notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
                { key: "C#", notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"] },
                { key: "F", notes: ["F", "G", "A", "Bb", "C", "D", "E"] },
                { key: "Bb", notes: ["Bb", "C", "D", "Eb", "F", "G", "A"] },
                { key: "Eb", notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"] },
                { key: "Ab", notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"] },
                { key: "Db", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] },
                { key: "Gb", notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"] },
                { key: "Cb", notes: ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"] }],

            artists: [{ name: "John Frusciante", order: 1, totalSongs: 1 },
            { name: "Ed Sheeran", order: 2, totalSongs: 4 },
            { name: "Nirvana", order: 3, totalSongs: 11 },
            { name: "RHCP", order: 4, totalSongs: 12 },
            { name: "Aerosmith", order: 5, totalSongs: 1 },
            { name: "Led Zeppelin", order: 6, totalSongs: 1 },
            ],

            songs: [{ artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4", secondProgression: "5 4 1", songText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F", acoustic: true, electric: false, capo: null, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "12", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "www.chords.com", tuning: "DADGAD", isMySong: false }, { artist: "Rhcp", song: "dani californi", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4", secondProgression: "5 4 1", songText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F", acoustic: true, electric: false, capo: 4, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "1", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "www.chords.com", tuning: "DADGAD", isMySong: true },





            { artist: "RHCP", song: "californication", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: true, capo: 1, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 71, difficulty: "easy", lastViewed: "2d ago", songId: "2", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "", tuning: null, isMySong: true },
            { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: false, electric: false, capo: null, isFavorite: true, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 84, difficulty: "hard", lastViewed: "2d ago", songId: "6", yt_link: "", chords_link: "", tuning: null, isMySong: true },
            { artist: "Nirvana", song: "Californication", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: true, capo: 2, isFavorite: false, imageUrl: "https://c0.wallpaperflare.com/preview/483/210/436/car-green-4x4-jeep.jpg", practicedPrcntg: 65, difficulty: "medium", lastViewed: "2d ago", songId: "3", yt_link: "", chords_link: "", tuning: null, isMySong: false },
            { artist: "RHCP", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: false, electric: true, capo: null, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 32, difficulty: "medium", lastViewed: "2d ago", songId: "4", yt_link: "", chords_link: "", tuning: null, isMySong: true },
            { artist: "Nirvana", song: "Smells like teen spirit", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "5", yt_link: "", chords_link: "", tuning: null, isMySong: false },


            { artist: "Nirvana", song: "Smells like teen spirit", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "52", yt_link: "", chords_link: "", tuning: null, isMySong: false }, { artist: "Nirvana", song: "Smells like teen spirit", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "15", yt_link: "", chords_link: "", tuning: null, isMySong: false },







            ],
            usefulResources: {
                notes: "",
                resourcesLinks: [{ text: "make the rgb(194, 42, 42)bed", id: 1 },
                { text: "play video games", id: 2, link: "https://www.youtube.com/watch?v=gmmrejxckWs" },],
                txtAreaHeight: 200
            }
        }
    },
    getters,

    mutations: {
        toggleSidebar(state) {
            state.sidebarIsActive = !state.sidebarIsActive;
        },
        removeSidebar(state) {
            state.sidebarIsActive = false;
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
            let index = state.songs.findIndex(song => song.songId == payload.songId);
            state.songs[index].isFavorite = !state.songs[index].isFavorite;

        },
        addSong(state, payload) {
            var today = new Date();
            var dateCreated = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            let songId;
            // console.log("prije",payload.songId);
            // console.log("nakon",songId);
            if (!payload.songId) {

                songId = Date.now();
            } else {

                songId = payload.songId;
            }
            const song = {
                ...payload,
                dateCreated,
                songId,
            }

            // if its new artist in app
            if (!state.artists.some(artist => artist.name.toLowerCase() == song.artist.toLowerCase())) {
                const newArtist = {
                    name: song.artist,
                    totalSongs: 1,
                    order: state.artists.length
                }
                state.artists.unshift(newArtist)
                // console.log(newArtist);
                // console.log(state.artists);
            } else {
                state.artists.forEach(artist => {
                    if (song.artist.toLowerCase() == artist.name.toLowerCase()) {
                        artist.totalSongs += 1
                    }
                });
            }

            //if song doesnt  exists
            if (!song.songId) {

                state.songs.unshift(song)
            } else {
                //songs exists so delete old data and refresh with new
                let index = state.songs.findIndex(song => song.songId == payload.songId);
                state.songs.splice(index, 1)
                state.songs.unshift(song);
            }
        },
        setSongDetailTitle(state, payload) {
            state.songDetailTitle = payload;
        },
        sortSongs(state, option) {
            // console.log("opcija", option);
            if (option == "A-Z") {
                state.songs.sort((a, b) => a.song.localeCompare(b.song))
            } else if (option == "Z-A") {
                state.songs.sort((a, b) => b.song.localeCompare(a.song))
            } else if (option == "Least learned") {
                state.songs.sort((a, b) => a.practicedPrcntg - b.practicedPrcntg)
            } else if (option == "Best learned") {
                state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
            }
            // else if (option == "Newest Added") {
            //     state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
            // }else{

            // }
            // console.log(state.songs);

        },
        sortArtists(state, option) {
            if (option == "A-Z") {
                state.artists.sort((a, b) => a.name.localeCompare(b.name))
            } else if (option == "Z-A") {
                state.artists.sort((a, b) => b.name.localeCompare(a.name))
            }
        },
        deleteSong(state, id) {
            let index = state.songs.findIndex(song => song.songId == id);
            state.songs.splice(index, 1)

            //delete artist if theres no songs
        },
        updateArtistsList(state, payload) {
            state.artists = payload
        },


        // resources
        updateUserNotes(state, payload) {
            state.usefulResources.notes = payload;

        },
        addUserResourcesList(state, payload) {
            state.usefulResources.resourcesLinks.unshift(payload)
        },
        deleteUserResourcesList(state, id) {
            let index = state.usefulResources.resourcesLinks.findIndex(link => link.id == id);
            state.usefulResources.resourcesLinks.splice(index, 1)
        },
        updateTxtAreaHeight(state, payload) {
            state.usefulResources.txtAreaHeight = payload;
        },

        load20MoreSongs(state) {



            for (let i = 0; i < 20; i++) {
                let song = { artist: "Nirvana", song: "Smells like teen spirit", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "15", yt_link: "", chords_link: "", tuning: null, isMySong: false }

                song.songId = Math.random().toString(36).substring(2);
                // console.log(song.songId);
                state.songs.unshift(song)
            }

        }


    },
    actions: {
        addNewSong(context, payload) {

            //http
            //pronaci image url

            context.commit("addSong", payload)
        },
        async apiForSongInfo(context, payload) {
            // const response = await fetch(`https://accounts.spotify.com/api/token`,{
            //     method:"GET",

            // });
            console.log("nebitno", context, payload);

            let creds = window.btoa(`${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`)
            console.log(creds);
            const response = await fetch("https://accounts.spotify.com/api/token", {
                method: "GET",
                headers: {
                    "Authorization": `Basic ${creds}`,
                    'Content-Type': 'application/x-www-form-urlencoded',

                },
                params: {
                    grant_type: 'client_credentials'
                },

            })
            console.log("response", response);
            const responseData = await response.json();
            console.log("response data", responseData);







            //     const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${process.env.VUE_APP_CLIENT_ID}&response_type=code&redirect_uri=http://localhost:8080/new&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`

            //     window.location.href = AUTH_URL


            //     const response = await fetch(`https://api.getsongbpm.com/song/?api_key=${process.env.VUE_APP_CLIENT_ID}&id=983pB`);
            //     const responseData = await response.json();

            //     if (!response.ok) {
            //         const error = new Error(responseData.message || "failed to fetch request")
            //         throw error;
            //     }
            //     console.log("paays", payload);
            //     console.log("responseData", responseData);
            //     context.commit("addApiData", responseData)
            // }
        }
        //https://accounts.spotify.com/api/

    }



})




export default store;