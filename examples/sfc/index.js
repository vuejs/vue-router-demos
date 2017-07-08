import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from './pages/Home.vue'
import AboutPage from './pages/About.vue'
import TopicsPage from './pages/Topics.vue'
import TopicPage from './pages/topics/Topic.vue'
import App from './App.vue'

Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        { path: '/', component: HomePage },
        { path: '/about', component: AboutPage },
        { path: '/topics', component: TopicsPage, children: [
            { name: 'topic', path: ':id', component: TopicPage, props: true }
        ] }
    ]
})

export default {
    router,
    render: (h) => h(App)
}
