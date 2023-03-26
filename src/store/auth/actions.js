import jwt_decode from "jwt-decode";
import { auth } from "./firebase";
import {
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

export default {

    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("email");

        context.commit("setUser", {
            token: null,
            user: {}
        })

        context.commit("clearVuex")
    },

    async auth(context, payload) {

        const mode = payload.mode;
        let url = new URL(`/login`, process.env.VUE_APP_URL)

        if (mode === "signup") {
            url = new URL(`/register`, process.env.VUE_APP_URL)
        }
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
            return "There was an error!"
        }

        const responseData = await response.json();
        if (!response.ok) {
            return responseData.message
        }

        context.dispatch("setUserAndLoadData", { ...responseData, email: payload.user.email })
    },

    async signInWithGoogle() {
        var provider = new GoogleAuthProvider();
        provider.addScope("profile");
        provider.addScope("email");
        let response = {};

        try {
            await signInWithPopup(auth, provider).then(function (result) {
                var user = result.user;
                response.google_token = user.accessToken;
                response.msg = "Success.";
                // response.username = user.displayName;
                // console.log(user);
            })
        } catch (error) {
            response.google_token = false

            switch (error.code) {
                case "auth/user-not-found":
                    response.msg = "User not found";
                    break;
                case "auth/wrong-password":
                    response.msg = "Wrong password";
                    break;
                case "auth/popup-closed-by-user":
                    response.msg = "You closed the popup window.";
                    break;
                default:
                    response.msg = "Something went wrong";
                // response.msg = error;
            }
        }
        return response
    },

    async firebaseBackendCall(context, google_token) {
        let url = new URL(`/firebase`, process.env.VUE_APP_URL);
        let response;
        // console.log(payload);
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        google_token
                        // username:payload.username
                    })
                })
        } catch {
            return {
                message: "Something went wrong.",
                success: false
            }
        }
        const responseData = await response.json();
        if (!response.ok) {
            return {
                message: responseData.message,
                success: false
            }
        }

        context.dispatch("setUserAndLoadData", responseData)
        return {
            success: true,
            message: "ok"
        }
    },
    setUserAndLoadData(context, payload) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("username", payload.user);
        localStorage.setItem("email", payload.email);
        context.commit("setUser", {
            user: {
                username: payload.user,
                email: payload.email
            },
            token: payload.token
        })
        context.dispatch("loadAllSongs");
        context.dispatch("loadAllArtists");
        context.dispatch("loadMusicKeys");
        context.dispatch("loadPlaylists");
    },

    tryLogin(context) {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username")
        const email = localStorage.getItem("email")
        if (!token) return;

        const expiresIn = jwt_decode(token).exp;
        var ts = Math.round((new Date()).getTime() / 1000);
        if (expiresIn - ts < 0) {
            context.dispatch("autoLogout")
        } else {
            const user = { username, email }

            context.commit("setUser", {
                token: token,
                expiresIn,
                user
            })
            context.dispatch("loadAllSongs")
                .then(res => {
                    if (res == "There was an error!" || res == false) {
                        context.dispatch("autoLogout")
                    }
                });
            context.dispatch("loadMusicKeys");
            context.dispatch("loadAllArtists");
            context.dispatch("loadPlaylists");
            context.commit("activateSidebar");
        }
    },
    autoLogout(context) {
        context.dispatch("logout")
        context.commit("setAutoLogout")
    },

    async forgotPassword(_, email) {
        let url = new URL(`/forgotpassword`, process.env.VUE_APP_URL)
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
        if (!response.ok) {
            return false
        } else {
            return true
        }
    },

    async resetPassword(_, payload) {
        let url = new URL(`/resetpassword/${payload.token}`, process.env.VUE_APP_URL)

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
                    body: JSON.stringify({ new: payload.new, email: payload.email })
                });
        } catch {
            console.log("There was an error!");
            return "There was an error!"
        }
        const responseData = await response.json();

        return responseData.message
    }
    ,
    async contactMe(context, payload) {
        let access_token = context.getters.token;
        let url = new URL(`/contactme`, process.env.VUE_APP_URL)

        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
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
    },

    async requestDeleteAccount(context, payload) {
        let url = new URL(`/delete-acc-request`, process.env.VUE_APP_URL);
        let access_token = context.getters.token;
        let response;
        try {
            response = await fetch(url,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({ email: payload.email })
                });

        } catch {
            console.log("There was an error!");
            return "error"
        }
        if (!response.ok) {
            return false
        } else {
            return true
        }
    },

    async deleteAccount(context, payload) {
        let url = new URL(`/delete-acc/${payload.token}`, process.env.VUE_APP_URL)
        let access_token = context.getters.token;

        const expiresIn = jwt_decode(payload.token, { header: true }).exp;
        let ts = Math.round((new Date()).getTime() / 1000);

        if (expiresIn - ts < 0) {
            return "expired"
        }
        let response;
        try {
            response = await fetch(url,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + access_token
                    },
                    body: JSON.stringify({
                        email: payload.email,
                    })
                });

        } catch {
            return { success: false }
        }
        const responseData = await response.json();

        if (!response.ok) {
            return {
                message: responseData.message,
                success: false
            }
        }
        return {
            success: true,
            message: "ok"
        }
    },


}