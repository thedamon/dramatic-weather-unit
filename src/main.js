import "babel-polyfill";
import VueMeta from "vue-meta";
import Vue from "vue";
import store from "./store/store";
import DWU from "./DWU.vue";

Vue.config.productionTip = false;

store.dispatch("start");
Vue.use(VueMeta);
new Vue({
  store,
  render: h => h(DWU)
}).$mount("#app");
