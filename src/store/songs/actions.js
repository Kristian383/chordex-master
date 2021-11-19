export default {
    async loadMoreSongs(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let numOfLoads = context.state.numOfLoads
        let url = `http://127.0.0.1:5000/songs/${username}?numOfLoads=${numOfLoads}`;

        //console.log("numOfLoads",numOfLoads);
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
        context.state.numOfLoads++
        if (responseData.songs.length == 0) {
            context.state.numOfLoads--
        }

        //get songImageUrl from spotify
        context.commit("loadMoreSongs", responseData.songs)

    },
    async addNewSong(context, payload) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/song/${username}`;
        //http
        //pronaci image url
        let lastViewed = new Date().toLocaleString();
        const body = {
            username,
            ...payload
        }
        body.lastViewed = lastViewed;

        let methodType = "POST";
        console.log("body add", body, lastViewed);
        if (payload.songId) {
            methodType = "PUT"
        }
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

        return true

        //console.log("response", responseData);
        // context.commit("addSong", payload)
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
        console.log("body", body);
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
    async loadMoreArtists(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let numOfLoads = context.state.numOfLoadingArtists
        let url = `http://127.0.0.1:5000/artists/${username}?numOfLoads=${numOfLoads}`;

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
        context.state.numOfLoadingArtists++
        if (responseData.artists.length == 0) {
            context.state.numOfLoadingArtists--
        }
        context.commit("loadMoreArtists", responseData.artists)
    },

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
        //console.log(payload);
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
        //console.log("updated UsersNotes",responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to update user notes.');
            return
        }
        context.commit("updateUserNotes", responseData.notes)
        context.commit("updateTxtAreaHeight", responseData.txtAreaHeight)

    },
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
        //console.log("updated UsersNotes",responseData);
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
                    {name}
                )

            });

        const responseData = await response.json();
        console.log("deleteUserWebsite",responseData);
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
        //console.log("websites", responseData);
        if (!response.ok) {
            window.alert(responseData.message || 'Failed to load user notes.');
            return
        }
        context.commit("setUserWebsites", responseData.websites)
        

    },

    async apiForSongInfo(context, payload) {

        // const accesToken="";
        console.log(context, payload);

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "GET",
            headers: {
                "Authorization": `bearer`,
                "access_token": "BQAQpaIXFR_8m73LLfvVjd9nGLAMwW5yYT4mF1i01vOBdb8OOaj5FZYx5aYG-03EODYe_3yBa2WIytjZeAA",
                // "expires_in": 3600,


            },
            // params: {
            //     grant_type: 'client_credentials'
            // },

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
}