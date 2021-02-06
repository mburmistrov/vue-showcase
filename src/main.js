import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import { i18n } from './i18n'
import { createStore } from '@/store'
import starterChecklistPlugin from './plugins/starterChecklist'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(starterChecklistPlugin, {
  completedKeys: ['filterByDate']
})

new Vue({
  render: h => h(App),
  i18n,
  store: createStore()
}).$mount('#app')
