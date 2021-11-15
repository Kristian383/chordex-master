
export default {

  token(state) {
    // console.log(state.token);
    return state.token;
  },
  // isAuthenticated(state) {
  //   return state.isLoggedIn;
  // },
  didAutoLogout(state) {
    return state.didAutoLogout;
  },

  // isLoggedIn(state) {
  //   return state.isLoggedIn
  // },
  user(state) {
    return state.user
  },
}