import { createStore } from "vuex";
import getters from "./songs/getters.js"
import actions from "./songs/actions"
import mutations from "./songs/mutations.js"
import authModule from './auth/index.js';

const store = createStore({
    modules: { auth: authModule },
    state() {
        return {
            sidebarIsActive: true,
            songDetailTitle: null,
            darkMode: false,
            numOfLoads: 1,
            numOfLoadingArtists: 1,
            musicKeys: [],
            // musicKeys: [
            //     { key: "C", relativeMinor: "A", notes: ["C", "D", "E", "F", "G", "A", "B"] },
            //     { key: "G", relativeMinor: "E", notes: ["G", "A", "B", "C", "D", "E", "F#"] },
            //     { key: "D", relativeMinor: "B", notes: ["D", "E", "F#", "G", "A", "B", "C#"] },
            //     { key: "A", relativeMinor: "F#", notes: ["A", "B", "C#", "D", "E", "F#", "G#"] },
            //     { key: "E", relativeMinor: "C#", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"] },
            //     { key: "B", relativeMinor: "G#", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"] },
            //     { key: "F#", relativeMinor: "D#", notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"] },
            //     { key: "C#", relativeMinor: "A#", notes: ["C#", "D#", "E#", "F#", "G#", "A#", "B#"] },
            //     { key: "F", relativeMinor: "D", notes: ["F", "G", "A", "Bb", "C", "D", "E"] },
            //     { key: "Bb", relativeMinor: "G", notes: ["Bb", "C", "D", "Eb", "F", "G", "A"] },
            //     { key: "Eb", relativeMinor: "C", notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"] },
            //     { key: "Ab", relativeMinor: "F", notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"] },
            //     { key: "Db", relativeMinor: "Bb", notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"] },
            //     { key: "Gb", relativeMinor: "Eb", notes: ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"] },
            //     { key: "Cb", relativeMinor: "Ab", notes: ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"] }],

            artists: [],

            songs: [
                //     { artist: "Nirvana", song: "Lithium", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4", secondProgression: "5 4 1", songText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F", acoustic: true, electric: false, capo: null, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "12", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "www.chords.com", tuning: "DADGAD", isMySong: false }, { artist: "Rhcp", song: "dani californi", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi 4", secondProgression: "5 4 1", songText: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, optio?", firstKeyNotes: "A B C# D# Eb G F", secondKeyNotes: "A B C# D# Eb G F", acoustic: true, electric: false, capo: 4, isFavorite: true, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 24, difficulty: "easy", lastViewed: "2d ago", songId: "1", yt_link: "https://www.youtube.com/embed/32GZ3suxRn4", chords_link: "www.chords.com", tuning: "DADGAD", isMySong: true },

            ],
            usefulResources: {
                notes: null,
                websitesLinks: [
                    // { name: "youtube",  link: "https://www.youtube.com/watch?v=gmmrejxckWs" },
                ],
                txtAreaHeight: 200
            }
        }
    },
    getters,
    mutations,


    // addSong(state, payload) {
    //     var today = new Date();
    //     var dateCreated = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    //     let songId;
    //     // console.log("prije",payload.songId);
    //     // console.log("nakon",songId);
    //     if (!payload.songId) {

    //         songId = Date.now();
    //     } else {

    //         songId = payload.songId;
    //     }
    //     const song = {
    //         ...payload,
    //         dateCreated,
    //         songId,
    //     }

    //     // if its new artist in app
    //     if (!state.artists.some(artist => artist.name.toLowerCase() == song.artist.toLowerCase())) {
    //         const newArtist = {
    //             name: song.artist,
    //             totalSongs: 1,
    //             order: state.artists.length
    //         }
    //         state.artists.unshift(newArtist)
    //         // console.log(newArtist);
    //         // console.log(state.artists);
    //     } else {
    //         state.artists.forEach(artist => {
    //             if (song.artist.toLowerCase() == artist.name.toLowerCase()) {
    //                 artist.totalSongs += 1
    //             }
    //         });
    //     }

    //     //if song doesnt  exists
    //     if (!song.songId) {

    //         state.songs.unshift(song)
    //     } else {
    //         //songs exists so delete old data and refresh with new
    //         let index = state.songs.findIndex(song => song.songId == payload.songId);
    //         state.songs.splice(index, 1)
    //         state.songs.unshift(song);
    //     }
    // },

    // sortSongs(state, option) {
    //     // console.log("opcija", option);
    //     if (option == "A-Z") {
    //         state.songs.sort((a, b) => a.songName.localeCompare(b.songName))
    //     } else if (option == "Z-A") {
    //         state.songs.sort((a, b) => b.songName.localeCompare(a.songName))
    //     } else if (option == "Least learned") {
    //         state.songs.sort((a, b) => a.practicedPrcntg - b.practicedPrcntg)
    //     } else if (option == "Best learned") {
    //         state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
    //     }
    // else if (option == "Newest Added") {
    //     state.songs.sort((a, b) => b.practicedPrcntg - a.practicedPrcntg)
    // }else{

    // }
    // console.log(state.songs);

    //},

    //loadMoreSongs(state, payload) {

    // for (let i = 0; i < payload.length; i++) {

    // state.songs.unshift(payload[i])
    //  state.songs.push(payload[i])
    // }

    // for (let i = 0; i < 10; i++) {
    //     let song = { artist: "Nirvana", song: "Smells like teen spirit", firstKey: "Am", secondKey: "D", bpm: 102, firstProgression: "I V vi ", secondProgression: "5 4 1", songText: "", firstKeyNotes: "", secondKeyNotes: "", acoustic: true, electric: false, capo: 3, isFavorite: false, imageUrl: "https://bit.ly/3gbwSnf", practicedPrcntg: 62, difficulty: "hard", lastViewed: "2d ago", songId: "15", yt_link: "", chords_link: "", tuning: null, isMySong: false }

    //     song.songId = Math.random().toString(36).substring(2);
    //     state.songs.push(song)
    // }

    // },
    // load20MoreArtists(state) {
    //     for (let i = 7; i < 20; i++) {
    //         let artist = { name: "John Frusciante", order: i, totalSongs: 12 };
    //         state.artists.push(artist)
    //     }
    // }



    actions



})




export default store;