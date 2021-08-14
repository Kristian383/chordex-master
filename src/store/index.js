import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            sidebarActive:true,
            songs: [{ artist: "Nirvana", songName: "Lithium", key: "Am", bpm:102,progression:"I V vi ",notes:"",capo:"",isFavorite:false,}]
        }
    },
    getters:{
        sidebarIsActive(state){
            return state.sidebarActive;
        }
    },
    
    mutations:{
        toggleSidebar(state){
            state.sidebarActive=!state.sidebarActive;
        }
    }
    
})




export default store;