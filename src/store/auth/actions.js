let timer;
export default {
    async logIn(context, payload) {

        context.dispatch("auth", {
            ...payload,
            mode: "login"
        })
    },
    async signUp(context, payload) {
        context.dispatch("auth", {
            ...payload,
            mode: "signup"
        })
    },
    logout(context) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");

        sessionStorage.removeItem("token")

        clearTimeout(timer);

        context.commit("setUser", {
            userId: null,
            token: null,
        })


    },
    async auth(context, payload) {
        console.log(JSON.stringify({
            ...payload
        }));
        const mode = payload.mode;
        let url = `http://127.0.0.1:5000/login`;

        if (mode === "signup") {
            url = `http://127.0.0.1:5000/register`;
        }
        console.log(url);
        const response = await fetch(url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // "Access-Control-Allow-Origin": "http://127.0.0.1:5000/"
                    "Access-Control-Allow-Origin": "*"
                },
                body: JSON.stringify({
                    // ...payload
                    email: payload.email,
                    password: payload.password
                })
            });

        const responseData = await response.json();

        if (!response.ok) {
            // const error = new Error(responseData.message || 'Failed to authenticate.');
            // throw error;
            console.log(responseData.message || 'Failed to authenticate.');
            return;
        }

        console.log("tu", responseData);
        sessionStorage.setItem("token", responseData.access_token)
        // this.$router.push("/songs")
        // import router from './../../router.js'

        // const expiresIn = +responseData.expiresIn * 1000;
        //  const expiresIn = 5000;
        // const expirationDate = new Date().getTime() + expiresIn;

        // localStorage.setItem("tokenExpiration", expirationDate)
        // localStorage.setItem("token", responseData.idToken);
        // localStorage.setItem("userId", responseData.localId);

        // timer = setTimeout(function () {
        //     context.dispatch("autoLogout")
        // }, expiresIn)


        // context.commit("setUser", {
        //     token: responseData.idToken,
        //     userId: responseData.localId,
        // })
    },
    tryLogin(context) {
        const token = sessionStorage.getItem("token");
        // const userId = localStorage.getItem("userId");
        // const tokenExpiration = localStorage.getItem("tokenExpiration")

        // const expiresIn = +tokenExpiration - new Date().getTime();

        // if (expiresIn < 0) {
        //     return;
        // }

        // timer = setTimeout(() => {
        //     context.dispatch("autoLogout")
        // }, expiresIn);

        if (token) {
            context.commit("setUser", {
                token: token,
            })
        }
    },
    autoLogout(context) {
        context.dispatch("logout")
        context.commit("setAutoLogout")
    }
}