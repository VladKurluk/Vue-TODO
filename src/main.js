import Vue from 'vue'
import App from './App.vue'
import timeFilter from '@/filters/time.filter'

Vue.filter('time', timeFilter)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
