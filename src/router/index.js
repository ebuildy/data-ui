import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Hello from '@/components/Hello'
import DataSources from '@/components/DataSources'
import DataSource from '@/components/DataSource'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Dashboard
    },
    {
      path: '/about',
      name: 'About',
      component: Hello
    },
    {
      path: '/sources',
      name: 'DataSources',
      component: DataSources
    },
    {
      path: '/sources/:id',
      name: 'DataSource',
      component: DataSource
    }
  ]
})
