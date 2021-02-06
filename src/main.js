import Vue from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import starterChecklistPlugin from './plugins/starterChecklist'

Vue.config.productionTip = false
Vue.use(starterChecklistPlugin, {
  completedKeys: ['filterByDate']
})

new Vue({
  render: h => h(App),
  i18n
}).$mount('#app')
