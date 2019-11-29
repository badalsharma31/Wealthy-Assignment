import Vue from "vue";
import "babel-polyfill";
/** Vuex Store Integration */
import store from "./store/index.js";
import App from "./App.vue";

import ElementUI from "element-ui";
//internationalization by element
import locale from "element-ui/lib/locale/lang/en";
import HighchartsVue from "highcharts-vue";
Vue.use(HighchartsVue);
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);

// import './themes/element-variables.scss'

import "./themes/element-theme.scss";
Vue.use(ElementUI, { locale });

import Util from "./misc/utils.js";

store.commit("setScreenHeight", Util.getScreenHeight());
store.commit("setScreenWidth", Util.getScreenWidth());

window.onresize = function(event) {
  store.commit("setScreenHeight", Util.getScreenHeight());
  store.commit("setScreenWidth", Util.getScreenWidth());
};

new Vue({
  el: "#app",
  store,
  render: h => h(App)
});
