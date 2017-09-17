import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from './Home.vue'
import About from './About.vue'
import Users from './Users.vue'
import User from './User.vue'
import App from './App.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/users', component: Users,
      children: [
        { path: ':username', name: 'user', component: User }
      ]
    }
  ]
})

export default {
  router,
  render: (h) => h(App)
}

