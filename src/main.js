import Vue from 'vue';
import DWU from './DWU.vue';

Vue.config.productionTip = false;
console.log('uhhg?');
new Vue({
  render: h => h(DWU)
}).$mount('#app');
