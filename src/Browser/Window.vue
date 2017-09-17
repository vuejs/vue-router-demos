<template>
<div class="browser">
  <AddressBar
      v-model="address"
      :next="next"
      :prev="prev"
      @back="go(-1)"
      @forward="go(1)"
  />
  <div class="page">
    <LoadingPage v-if="!page"/>
    <div v-else :is="page"/>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import AddressBar from './AddressBar.vue'
import LoadingPage from './LoadingPage.vue'
import { MemoryHistory } from './history'

export default {
  name: 'Browser',

  props: {
    name: {
      type: String,
      default: 'App'
    },
    bundle: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    index: 0,
    stack: [],
  }),

  beforeCreate() {
    this.page = null
  },

  computed: {
    address: {
      get () {
        return this.stack[this.index] ? this.stack[this.index].fullPath : '/'
      },

      set (location) {
        this.router && this.router.push(location)
      }
    },
    prev () {
      return this.index > 0
    },
    next () {
      return this.index > -1 && this.index + 1 < this.stack.length
    }
  },

  methods: {
    go (delta) {
      this.router.go(delta)
    },

    async createApp () {
      this.page = null
      console.log('Creating App!')
      const es = (App = {}) => ('__esModule' in App ? App.default : App)

      this.page = this.configureRouter(es(await this.bundle()))
    },

    configureRouter (App) {
      if (!App) return LoadingPage

      if (!('router' in App)) {
        App.router = new Router({})
      }
      
      const options = App.router.options
      options.mode ='abstract'
      options.fallback = false

      const router = this.router = App.router = new Router(options)
      
      router.history.index = 0
      router.afterEach((to) => {
        this.$nextTick(() => {
          this.index = router.history.index
          this.stack = Array.isArray(router.history.stack) ? router.history.stack : []
        })
      })

      // Skip two ticks and then navigate to base path.
      this.$nextTick(
        () => this.$nextTick(
          () => router.replace(router.options.base || '/')
        )
      )

      App.name = this.name
      App.replace = false

      console.log({ ...App })

      return App
      // return new Vue(App).$mount('#__browser_app__')
    }
  },

  created () {
    this.bundle && this.createApp()
  },

  components: {
    AddressBar, LoadingPage
  },

  watch: {
    bundle: 'createApp'
  }
}
</script>

<style lang="scss" scoped>
.browser {
    flex-direction: column;
    background: white;
    box-shadow: 0px 5px 20px hsla(0, 0%, 0%, 0.75);
    border-radius: 6px;
    position: static;
    display: flex;
    width: 100%;

    margin: 0 0 .75rem;
    min-width: 320px;
    min-height: 640px;
}

.page {
  overflow: auto;
  flex: auto;
}
</style>

<style lang="scss">
.page {
  a.router-link-exact-active {
    color: red !important;
  } 
  a.router-link-active {
    color: blue;
  }
  .router-link-exact-active {
    a {
      color: red !important;
    }
  } 
  .router-link-active {
    a {
      color: blue;
    }
  }
}
</style>
