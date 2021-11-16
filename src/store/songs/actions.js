export default {
    async loadMoreSongs(context) {
        let username = context.getters.user.username;
        let access_token = context.getters.token;
        let url = `http://127.0.0.1:5000/songs/${username}`;

        //trebamo slati i inkremetirati index za svaki zahtjev i u backendu indexirati od indexa do 20 daljnjih
        const response = await fetch(url,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + access_token
                    // "Access-Control-Allow-Origin": "*",
                    // 'X-CSRF-TOKEN': context.dispatch("getCookie", "csrf_access_token"),
                },
                // body: JSON.stringify({
                //     username
                // })
            });

        const responseData = await response.json();

        if (!response.ok) {
            // const error = new Error(responseData.message || 'Failed to authenticate.');
            // throw error;
            window.alert(responseData.message || 'Failed to load more songs.');
            // return new Promise((resolve) => {
            //     resolve("done")
            // });
            return
        }

        console.log(responseData);
        context.commit("loadMoreSongs", responseData.songs)

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
        let methodType="POST";
        //console.log("body add",body);
        if (payload.songId){
            methodType="PUT"
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
            return
        }

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
        console.log("body",body);
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
        context.commit("deleteSong",payload.songId)
    },

    async loadMusicKeys(context){
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
        context.commit("storeMusicKeys",responseData.musicKeys)
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