// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import res from 'vue-resource'
import VueNotifications from 'vue-notifications'
import VueLocalStorage from 'vue-ls';

require('semantic-ui-css/semantic.css')

Vue.config.productionTip = false

Vue.use(res)
Vue.use(VueNotifications)
Vue.use(VueLocalStorage);

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
