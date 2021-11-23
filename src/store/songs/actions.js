export default {
    async loadAllSongs(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/songs/${username}`;

        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },

            });

        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more songs.');
            return
        }

        console.log(responseData);
        
        //get songImageUrl from spotify
        context.commit("setAllSongs", responseData.songs)

    },
    async addNewSong(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/song/${username}`;
        //http
        //pronaci image url
        const body = {
            username,
            ...payload
        }

        let methodType = "POST";
        if (payload.songId) {
            methodType = "PUT"
        }
        let lastViewed = new Date().toLocaleString();
        body.lastViewed = lastViewed;

        const response = await fetch(url,
            {
                method: methodType,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                body: JSON.stringify(
                    body
                )
            });

        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add song.');
            return false
        }

        if (payload.songId) {

            context.commit("updateSong", payload)
        }
        // else{
        //     context.commit("insertSongAndArtist", payload)

        // }
        return true
    },
    async deleteSong(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/song/${username}`;
        const body = {
            "songName": payload.songName,
            username,
            "artist": payload.artist
        }
        //console.log("delete body", body);
        const response = await fetch(url,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                body: JSON.stringify(
                    body
                )
            });

        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more songs.');
            return
        }

        //console.log(responseData);
        context.commit("deleteSong", payload.songId)
    },

    //
    //
    //
    async loadMusicKeys(context) {
        let url = `http://127.0.0.1:5000/keys`;

        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more songs.');
            return
        }
        context.commit("storeMusicKeys", responseData.musicKeys)
    },

    //ARTISTS
    async loadAllArtists(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/artists/${username}`;

        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
            });

        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more songs.');
            return
        }

        console.log(responseData);
       
        context.commit("setAllArtists", responseData.artists)
    },

    //NOTES 
    async loadUsersNotes(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/notes/${username}`;

        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },

            });

        const responseData = await response.json();
        //console.log("userNotes", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load user notes.');
            return
        }
        context.commit("updateUserNotes", responseData.notes)
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight)

    },
    async updateUsersNotes(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/notes/${username}`;
        const response = await fetch(url,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                body: JSON.stringify(
                    payload
                )

            });

        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to update user notes.');
            return
        }
        context.commit("updateUserNotes", responseData.notes)
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight)

    },
     //websites
    async addUserWebsite(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/website/${username}`;
        console.log(JSON.stringify(
            payload
        ));
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                body: JSON.stringify(
                    payload
                )

            });

        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return
        }
        context.commit("addUserWebsite", payload)
    },
    async deleteUserWebsite(context, name) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/website/${username}`;

        const response = await fetch(url,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },
                body: JSON.stringify(
                    { name }
                )

            });

        const responseData = await response.json();
        console.log("deleteUserWebsite", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return
        }
        context.commit("deleteUserWebsite", name)
    },
    async loadUserWebsites(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/websites/${username}`;

        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                },

            });

        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load user notes.');
            return
        }
        context.commit("setUserWebsites", responseData.websites)
    },

    //SPOTIFY API
    async apiForSongInfo() { //OVO SE MORA NA BACKENDU

        //console.log(context, payload);
        // var client_id = '85e8304fb2904dd2b138193b78217377'; // Your client id
        // var client_secret = 'ca0aea62d5094911b2cce94d0b7a2e96'; // Your secret

        // const response = await fetch("https://accounts.spotify.com/api/token", {
        //     method: "POST",
        //     headers: {
        //         "Authorization": 'Basic ' + window.btoa(client_id + ':' + client_secret),
        //         "Content-Type": "application/json",

        //     },
        //     body: {
        //         "grant_type": 'client_credentials'
        //     },

        // })
    }
}