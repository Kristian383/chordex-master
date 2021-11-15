let timer;
// import { authService } from '@/api'

export default {

    //from meidum tutorial


    // async registerUser(context, payload) {
    //     await authService.post('/register', payload)
    //     await context.dispatch('fetchUser')
    // },
    // async loginUser(context, payload) {
    //     await authService.post('/login', payload.user)
    //     await context.dispatch('fetchUser')
    // },
    // async fetchUser(context) {
    //     await authService.get('/user')
    //         .then(({ data }) => context.commit('setUser', data))
    // },
    // async logoutUser(context) {
    //     await authService.post('/logout');
    //     context.commit('logoutUserState');
    // },

    //dolje je mojez
    // async login(context, payload) {

    //     context.dispatch("auth", {
    //         ...payload,
    //         mode: "login"
    //     })
    // },
    // async signUp(context, payload) {
    //     context.dispatch("auth", {
    //         ...payload,
    //         mode: "signup"
    //     })
    // },
    logout(context) {
        localStorage.removeItem("token");
        // localStorage.removeItem("userId");
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("username");
        localStorage.removeItem("email");


        clearTimeout(timer);

        context.commit("setUser", {
            token: null,
            user: {}
        })


    },


    async auth(context, payload) {
        // console.log(JSON.stringify({
        //     ...payload
        // }));

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
                    // "Access-Control-Allow-Origin": "*",
                    // 'X-CSRF-TOKEN': context.dispatch("getCookie", "csrf_access_token"),
                },
                body: JSON.stringify({
                    // ...payload
                    email: payload.user.email,
                    password: payload.user.password
                })
            });

        const responseData = await response.json();

        if (!response.ok) {
            // const error = new Error(responseData.message || 'Failed to authenticate.');
            // throw error;
            console.log(responseData.message || 'Failed to authenticate.');
            // return new Promise((resolve) => {
            //     resolve("done")
            // });
            return
        }

        // context.commit("setUser", context.dispatch("getCookie", "csrf_access_token"))
        // console.log("tu", responseData);

        // const expiresIn = +responseData.expiresIn * 1000;
        const expiresIn = 3600000; //1 h
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem("tokenExpiration", expirationDate)
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("username", responseData.user);
        localStorage.setItem("email", payload.user.email);

        timer = setTimeout(function () {
            context.dispatch("autoLogout")
        }, expiresIn)


        context.commit("setUser", {
            user: {
                username: responseData.user,
                email: payload.user.email
            },
            token: responseData.token,
            tokenExpiration: expirationDate,

        })
        return new Promise((resolve) => {
            resolve("done")
        })

    },
    tryLogin(context) {
        const token = localStorage.getItem("token");
        const tokenExpiration = localStorage.getItem("tokenExpiration")
        const username = localStorage.getItem("username")
        const email = localStorage.getItem("email")

        const expiresIn = +tokenExpiration - new Date().getTime();

        if (expiresIn < 0) {
            return;
        }

        timer = setTimeout(() => {
            context.dispatch("autoLogout")
        }, expiresIn);

        const user={
            username,email
        }
        if (token) {
            context.commit("setUser", {
                token: token,
                tokenExpiration,
                user
            })
        }
    },
    autoLogout(context) {
        context.dispatch("logout")
        context.commit("setAutoLogout")
    }
}