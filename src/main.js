import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = true

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')