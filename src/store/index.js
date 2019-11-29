import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

let store = new Vuex.Store({
  modules: {
    app
  },
  plugins: [createPersistedState({ paths: ["app"] })]
});

export default store;
