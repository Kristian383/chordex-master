// import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
import mutations from './mutations.js';

export default {


    state() {
        return {
            user: {},
            // isLoggedIn: true,
            tokenExpiration: null,
            token: null,
            didAutoLogout: false,
            // userData: {
            //     username: "Kristian",
            //     email: "kristian3833@gmail.com",
            //     numberOfSongs: 66,
            //     numberOfArtists: 20,
            //     numberOfMySongs: 5,
            // },
        };
    },
    // mutations,
    getters,
    actions,
    mutations
}