import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HomePage = {
    name: 'HomePage',

    render () {
        return (<span>Home Page</span>)
    }
}

const AboutPage = {
    name: 'AboutPage',

    render () {
        return (<span>About Page</span>)
    }
}

const TopicsPage = {
    name: 'TopicsPage',

    render () {
        return (
            <div>
                Topics Page
                <ul>
                    <li>
                        <router-link to={{ name: 'topic', params: { id: 'rendering-with-vue'}}}>
                            Rendering with Vue
                        </router-link>
                    </li>
                    <li>
                        <router-link to={{ name: 'topic', params: { id: 'components'}}}>
                            Components
                        </router-link>
                    </li>
                    <li>
                        <router-link to={{ name: 'topic', params: { id: 'props-v-state'}}}>
                            Props vs State
                        </router-link>
                    </li>
                </ul>

                <router-view/>
            </div>
        )
    }
}

const TopicPage = {
    name: 'TopicPage',

    props: {
        id: {
            type: String,
            required: true
        }
    },

    render () {
        return (<span>{this.id}</span>)
    }
}

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
    name: 'App',

    router,

    render () {
        return (
            <div style={{ padding: '10px'}}>
                <h1>Simple</h1>
                <ul>
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/about">About</router-link>
                    </li>
                    <li>
                        <router-link to="/topics">Topics</router-link>
                    </li>
                </ul>

                <hr/>

                <router-view></router-view>
            </div>
        )
    }
}
