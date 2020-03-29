import Vue from 'vue'
import App from './App.vue'
import timeFilter from '@/filters/time.filter'
import Vuelidate from 'vuelidate'

Vue.filter('time', timeFilter)
Vue.config.productionTip = false

Vue.use(Vuelidate)

export const bus = new Vue()

new Vue({
  render: h => h(App)
}).$mount('#app')
