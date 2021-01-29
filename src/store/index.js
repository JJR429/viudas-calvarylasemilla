import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // === data
    currentUser: null,
    host: "https://cappstudios.com/tools"
  },
  getters: {
    // === computed ! get values on change
    getUsername(state) {
      // make call to API
      // call mutatios -> setUserData
      return state.currentUser.username;
    },
    getCurrentUserId(state) {
      // for users and teachers
      return state.currentUser.id;
    },
    getCurrentUserData(state) {
      // for users and teachers
      return state.currentUser;
    },
    getTypeUser(state) {
      // for users and teachers
      let _typeuser = null;
      try {
        _typeuser = state.currentUser.tipo;
      } catch (error) {
        _typeuser = null;
      }
      return _typeuser;
    },
    getHost(state) {
      return state.host;
    }
  },
  actions: {
    // === methods ! Never update the State -> use to call API to fecht data
    setCurrentUser(context, _user) {
      context.commit("setCurrentUser", _user);
    },
    deleteCurrentUser({ commit }) {
      commit("deleteCurrentUser");
    },
    loadLocalStorage(context) {
      let currentUser = localStorage.getItem("currentUser");
      // console.log(JSON.parse(currentUser))
      if (currentUser) {
        try {
          currentUser = JSON.parse(currentUser);
        } catch (e) {
          currentUser = null;
        }
      }
      context.commit("mloadLocalStorage", currentUser);
    },
    //actions for cursosData
    setCursosData(context, data) {
      context.commit("setCursosData", data);
    }
  },
  mutations: {
    // new on vuex ! use it for update the State -> set
    setCurrentUser(state, userdata) {
      localStorage.setItem("currentUser", userdata);
      state.currentUser = userdata;
    },
    deleteCurrentUser(state) {
      state.currentUser = null;
    },
    mloadLocalStorage(state, userdata) {
      state.currentUser = userdata;
    },
    //mutations for setCursosData
    setCursosData(state, data) {
      state.cursosData = data;
    }
  }
});
