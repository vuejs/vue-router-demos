import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const HomePage = {
    render () {
        return (<span>Home Page</span>)
    }
}

const OtherPage = {
    render () {
        return (<span>Other Page</span>)
    }
}

const router = new VueRouter({
    mode: 'abstract',

    routes: [
        { path: '/', component: HomePage },
        { path: '/other', component: OtherPage },
    ]
})

export default {
    router,

    render () {
        return (
            <div>
                <router-link to="/">Home</router-link>
                <router-link to="/other">Other</router-link>

                <div>Page: </div>

                <router-view/>
            </div>
        )
    }
}
