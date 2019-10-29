import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userstatus: 0,
    userinfo: null,
    token: "",
  },
  mutations: {
    userDataSave(state, userData) {
      state.userstatus = 1;
      state.userinfo = userData.item;
      state.token = userData.token;
    },
    userLogOut(state) {
      state.userstatus = 0;
      state.userinfo = null;
      state.token = "";
      localStorage.removeItem("admin-godper.com-store");
    },
    refreshToken(state, newtoken) {
      state.token = newtoken;
    }
  },
  actions: {

  }
})
