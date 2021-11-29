import jwt_decode from "jwt-decode";

export default {

    logout(context) {
        localStorage.removeItem("token");
        // localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        // clearTimeout(timer);

        context.commit("setUser", {
            token: null,
            user: {}
        })

        context.commit("clearVuex")
    },

    async auth(context, payload) {

        const mode = payload.mode;
        let url = `${process.env.VUE_APP_LOGIN_URL}`;
        if (mode === "signup") {
            url = `${process.env.VUE_APP_REGISTER_URL}`;
        }
        // console.log("pay", payload);
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        email: payload.user.email,
                        password: payload.user.password,
                        username: payload.user.username
                    })
                })
        } catch {
            // context.commit("removeLoader")
            //  console.log("There was an error!");
            return "There was an error!"
        }

        const responseData = await response.json();
        //console.log(responseData);
        if (!response.ok) {
            return responseData.message
        }

        localStorage.setItem("token", responseData.token);
        localStorage.setItem("username", responseData.user);
        localStorage.setItem("email", payload.user.email);

        context.commit("setUser", {
            user: {
                username: responseData.user,
                email: payload.user.email
            },
            token: responseData.token

        })

        context.dispatch("loadAllSongs");
        context.dispatch("loadAllArtists");
        context.dispatch("loadMusicKeys");
    },

    tryLogin(context) {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username")
        const email = localStorage.getItem("email")
        if (!token) {
            return
        }
        const expiresIn = jwt_decode(token).exp;
        var ts = Math.round((new Date()).getTime() / 1000);
        if (expiresIn - ts < 0) {
            context.dispatch("autoLogout")

        } else {
            const user = {
                username, email
            }
            context.commit("setUser", {
                token: token,
                expiresIn,
                user
            })
            context.dispatch("loadAllSongs")
            //.then(res => {
            //     // if (!res) {
            //     //     context.dispatch("autoLogout")

            //     // }
            //     console.log("res",res);
            // });
            context.dispatch("loadMusicKeys");
            context.dispatch("loadAllArtists");
            context.commit("activateSidebar");
        }
    },
    autoLogout(context) {
        context.dispatch("logout")
        context.commit("setAutoLogout")
    },

    async forgotPassword(_, email) {//context,payload
        let url = `${process.env.VUE_APP_FORGOTPSWD_URL}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({ email })
                });

        } catch {
            console.log("There was an error!");
            return "error"
        }
        //console.log(responseData);
        if (!response.ok) {
            return false
        } else {
            return true
        }

    },

    async resetPassword(_, payload) {
        let url = `${process.env.VUE_APP_RESETPSWD_URL}/${payload.token}`;
        const expiresIn = jwt_decode(payload.token, { header: true }).exp;
        var ts = Math.round((new Date()).getTime() / 1000);

        if (expiresIn - ts < 0) {
            return "expired"
        }
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ new: payload.new, email: payload.email }) //, token: payload.token 
                });
        } catch {
            console.log("There was an error!");
            return "There was an error!"
        }
        const responseData = await response.json();

        return responseData.message
    }
    ,
    async contactMe(_, payload) {
        // console.log("payload", payload);
        let url = `${process.env.VUE_APP_CONTACT_URL}`;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({
                        email: payload.email,
                        message: payload.message
                    })
                });

        } catch {
            return false
        }
        if (!response.ok) {
            return false
        }
        return true
    }
}