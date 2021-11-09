
export default {
    // userId(state) {
    //   return state.userId;
    // },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
    getUserData(state){
      return state.userData
    }
  }    return state.user
  isLoggedIn(state) {
    return state.isLoggedIn
  },
  user(state) {
    return state.user
  },
}