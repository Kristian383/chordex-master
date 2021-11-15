export default {
   //  setUser(state,payload)
   //   {
   //      state.token=payload.token;
   //   },
   setAutoLogout(state) {
      state.didAutoLogout = true;
   }
   ,

   //from medium
   setUser(state, payload) {
      // state.isLoggedIn = true;
      state.user = payload.user;
      state.tokenExpiration=payload.tokenExpiration;
      state.token=payload.token
      // state.user=payload.email
   },
   logoutUserState(state) {
      // state.isLoggedIn = false;
      state.user = {};
   }

}