export default {

   setAutoLogout(state) {
      state.didAutoLogout = true;
   } ,

   setUser(state, payload) {
      state.user = payload.user;
      // state.tokenExpiration=payload.tokenExpiration;
      state.token=payload.token
   },
   logoutUserState(state) {
      state.user = {};
   }

}