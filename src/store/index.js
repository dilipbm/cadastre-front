import Vue from "vue";
import Vuex from "vuex";
import parcelle from "./parcelle";
import geolocalisation from "./geolocalisation";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { parcelle, geolocalisation },
});
