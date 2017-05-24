import Vue from 'vue'
import Router from 'vue-router'
import Browser from './Browser'
import examples from '../examples'
import ExampleExplorer from './ExampleExplorer.vue'

Vue.use(Router)

new Vue({
  router: new Router({
    routes: [
      {
        path: '/:example',
        component: Browser,
        props: (route) => ({
          bundle: () => examples[route.params.example]
        })
      }
    ]
  }),

  ...ExampleExplorer
}).$mount('#app')
