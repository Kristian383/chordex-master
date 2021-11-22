let timer;
// import { authService } from '@/api'
import jwt_decode from "jwt-decode";

export default {
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        clearTimeout(timer);

        context.commit("setUser", {
            token: null,
            user: {}
        })

        //clear state?

    },

    async auth(context, payload) {

        const mode = payload.mode;
        let url = `http://127.0.0.1:5000/login`;
        if (mode === "signup") {
            url = `http://127.0.0.1:5000/register`;
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

            return 
        }

        const expiresIn = jwt_decode(responseData.token).exp;

        localStorage.setItem("tokenExpiration", expiresIn)
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("username", responseData.user);
        localStorage.setItem("email", payload.user.email);

        let d = new Date(expiresIn * 1000).getTime()
        let expirationDate = new Date(d).getTime()
        let now = new Date().getTime()
        let milisecondsBetweenDates = Math.round((expirationDate - now));
        let timeForAutoLogout = milisecondsBetweenDates - 60000;
        // console.log("timeForAutoLogout", timeForAutoLogout);

        timer = setTimeout(function () {
            console.log("token je istekao, odjavi usera");
            //context.dispatch("refreshToken", responseData.token)
            context.dispatch("autoLogout")

        }, timeForAutoLogout)


        context.commit("setUser", {
            user: {
                username: responseData.user,
                email: payload.user.email
            },
            token: responseData.token,
            tokenExpiration: expiresIn,

        })

        context.dispatch("loadAllSongs");
            context.dispatch("loadMusicKeys");
        // return new Promise((resolve) => {
        //     resolve("done")
        // })

    },

    tryLogin(context) {
        const token = localStorage.getItem("token");
        //const tokenExpiration = localStorage.getItem("tokenExpiration")
        const username = localStorage.getItem("username")
        const email = localStorage.getItem("email")
        if (!token) {
            return
        }
        const expiresIn = jwt_decode(token).exp;
        var ts = Math.round((new Date()).getTime() / 1000);
        //console.log(expiresIn - ts);
        if (expiresIn - ts < 0) {
            // console.log("token je istekao");
            context.dispatch("autoLogout")

        } else {
            // console.log("tryLogin token je vazeci");
            const user = {
                username, email
            }
            context.commit("setUser", {
                token: token,
                expiresIn,
                user
            })
            context.dispatch("loadAllSongs");
            context.dispatch("loadMusicKeys");

        }


    },
    autoLogout(context) {
        context.dispatch("logout")
        context.commit("setAutoLogout")
    }
}