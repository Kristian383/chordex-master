// let timer;
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
        const response = await fetch(url,
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
            });

        const responseData = await response.json();
        //console.log(responseData);
        if (!response.ok) {
            console.log(responseData.message);

            return
        }

        // const expiresIn = jwt_decode(responseData.token).exp;

        // localStorage.setItem("tokenExpiration", expiresIn)
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("username", responseData.user);
        localStorage.setItem("email", payload.user.email);

        // let d = new Date(expiresIn * 1000).getTime()
        // let expirationDate = new Date(d).getTime()
        // let now = new Date().getTime()
        // let milisecondsBetweenDates = Math.round((expirationDate - now));
        // let timeForAutoLogout = milisecondsBetweenDates - 60000;

        // timer = setTimeout(function () {
        //     context.dispatch("autoLogout")

        // }, timeForAutoLogout)


        context.commit("setUser", {
            user: {
                username: responseData.user,
                email: payload.user.email
            },
            token: responseData.token,
            // tokenExpiration: expiresIn,

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
        // generate a JWT in the form of a link sent to the user through email
        // JWT payload consists of the username to uniquely identify the user. JWT expiration is set to a limited time say 30mins.
        // JWT signature is signed with a secret: the user’s password hash
        // JWT could be appended in the query of the link: https://exampletest.com/reset/password?token={Insert JWT here} i ovo ce biti ruta na frontendu
        let url = `${process.env.VUE_APP_FORGOTPSWD_URL}`;
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email })
            });

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
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ new: payload.new, email: payload.email }) //, token: payload.token 
            });

        const responseData = await response.json();

        return responseData.message
        // if (!response.ok) {
        //     return false
        // } else {
        //     return true
        // }
    }
    ,
    async contactMe(_, payload) {
        // console.log("payload", payload);
        let url = `${process.env.VUE_APP_CONTACT_URL}`;
        const response = await fetch(url,
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

        if (!response.ok) {
            return false
        }
        return true
    }
}