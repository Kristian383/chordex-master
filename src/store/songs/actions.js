export default {
    async loadAllSongs(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/songs/${user_email}`, process.env.VUE_APP_URL);

        context.commit("setLoader");
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },

                });
        } catch {
            // console.log("There was an error!");
            context.commit("removeLoader");
            return "There was an error!";
        }
        const responseData = await response.json();

        if (!response.ok) {
            // window.alert(responseData.message || 'Failed to load more songs.');
            context.commit("removeLoader");
            return false;
        }

        context.commit("setAllSongs", responseData.songs);
        context.commit("removeLoader");

    },
    async addNewSong(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        // let url = `${process.env.VUE_APP_URL}song/${username}`;
        let url = new URL(`/song/${user_email}`, process.env.VUE_APP_URL);

        const body = {
            // user_email,
            ...payload
        };
        let methodType = "POST";
        if (payload.songId) {
            methodType = "PUT";
        }
        let lastViewed = new Date().toLocaleString();
        body.lastViewed = lastViewed;

        let response;
        try {
            response = await fetch(url,
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
        } catch {
            return false;
        }
        const responseData = await response.json();
        if (!response.ok) {
            //  window.alert( 'Failed to add song.');
            return false;
        } else {
            if (payload.songId) {
                context.commit("updateSong", payload);
            } else {
                const resp_payload = responseData.song;
                resp_payload.artist = responseData.artist.name;
                context.commit("insertSong", resp_payload);
            }
        }
        // return true
        return responseData.song.songId;
    },
    async deleteSong(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/song/${user_email}`, process.env.VUE_APP_URL);

        const body = {
            // username,
            "songName": payload.songName,
            "artist": payload.artist
        };
        //console.log("delete body", body);
        let response;
        try {
            response = await fetch(url,
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
        } catch {
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to delete song.');
            return;
        }
        context.commit("deleteSong", payload.songId);
    },
    //MUSIC KEYS
    async loadMusicKeys(context) {
        let url = new URL(`/keys`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
        } catch {
            return;
        }
        const responseData = await response.json();

        if (!response.ok) {
            // window.alert(responseData.message || 'Failed to load more songs.');
            return;
        }
        context.commit("storeMusicKeys", responseData.musicKeys);
    },

    //ARTISTS
    async loadAllArtists(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/artists/${user_email}`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                });
        } catch {
            return;
        }
        const responseData = await response.json();

        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load more artists.');
            return;
        }
        context.commit("setAllArtists", responseData.artists);
    },

    //NOTES 
    async loadUsersNotes(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/notes/${user_email}`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },

                });
        } catch {
            return;
        }
        const responseData = await response.json();
        //console.log("userNotes", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load user notes.');
            return;
        }
        // console.log(responseData)
        context.commit("updateUserNotes", responseData.notes);
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight);

    },
    async updateUsersNotes(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/notes/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
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
        } catch {
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to update user notes.');
            return;
        }
        context.commit("updateUserNotes", responseData.notes);
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight);

    },
    //websites
    async addUserWebsite(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/website/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
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
        } catch {
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return;
        }
        context.commit("addUserWebsite", payload);
    },
    async deleteUserWebsite(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        // let url = `${process.env.VUE_APP_URL}website/${username}`;
        let url = new URL(`/website/${user_email}`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
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
        } catch {
            console.log("There was an error!");
            return;
        }
        const responseData = await response.json();
        // console.log("deleteUserWebsite", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to add user website.');
            return;
        }
        context.commit("deleteUserWebsite", name);
    },
    async loadUserWebsites(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/websites/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },

                });
        } catch {
            console.log("There was an error!");
            return;
        }
        const responseData = await response.json();
        if (!response.ok) {
            return;
        }
        context.commit("setUserWebsites", responseData.websites);
    },

    //SPOTIFY API
    async apiForSongInfo(_, payload) {
        let url = new URL("/spotifyacess", process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        payload
                    )
                });

        } catch {
            console.log("There was an error!");
            return false;
        }
        const responseData = await response.json();
        if (!response.ok) {
            return false;
        }
        return responseData;
    },
    async loadPlaylists(context) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/playlists/${user_email}`, process.env.VUE_APP_URL);

        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                });
        } catch(error) {
            console.error(error);
            return;
        }
        if (!response.ok) {
            console.log(response.message);
            return false;
        }
        const responseData = await response.json();
        context.commit("setPlaylists", responseData.playlists);
    },
    async fetchSongPlaylists(context, songId) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/song-playlists/${user_email}/${songId}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                });
        } catch(error) {
            return;
        }
        if (!response.ok) {
            console.log(response.message);
            return;
        }
        const responseData = await response.json();
        return responseData.playlists;
    },
    async deleteSongFromPlaylist(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/playlist/${user_email}/${payload.playlist_name}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({song_id: payload.song_id})
                });
        } catch(error) {
            console.error(error);
            return false;
        }
        return response.ok;
    },
    async addSongToPlaylist(context, payload) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/playlist/${user_email}/${payload.playlist_name}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({song_id: payload.song_id})
                });
        } catch(error) {
            // console.error(error);
            return false;
        }
        return response.ok;
    },
    async createPlaylist(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/playlists/${user_email}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({playlist_name: name})
                });
        } catch(error) {
            console.error(error);
            return;
        }
        if(!response.ok) return false;
        context.commit("addPlaylist", name);
        return true;
    },
    async fetchSongsForPlaylist(context, name) {
        let user_email = context.getters.user.email;
        let access_token = context.getters.token;
        let url = new URL(`/playlist/${user_email}/${name}`, process.env.VUE_APP_URL);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                });
        } catch(error) {
            console.error(error);
            return;
        }
        if(!response.ok) return false;

        const responseData = await response.json();
        context.commit("addSongsForPlaylist", responseData.songs);
    }
};