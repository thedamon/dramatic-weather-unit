import 'babel-polyfill';
import Vue from 'vue';
import DWU from './DWU.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(DWU)
}).$mount('#app');
