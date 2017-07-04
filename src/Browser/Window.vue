<template>
<div class="browser">
  <AddressBar
      v-model="address"
      :next="next"
      :prev="prev"
      @back="go(-1)"
      @forward="go(1)"
  />
  <component :is="page" ref="page"/>
</div>
</template>

<script>
import Vue from 'vue'
import AddressBar from './AddressBar.vue'
import LoadingPage from './LoadingPage.vue'
import { MemoryHistory } from './history'

export default {
  name: 'Browser',

  props: {
    bundle: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    refresh: false,
    page: LoadingPage
  }),

  computed: {
    index () {
      this.refresh // dep.
      
      return this.router && this.router.history ? this.router.history.index : 0
    },
    stack () {
      this.refresh // dep.

      return this.router && this.router.history ? this.router.history.stack || [] : []
    },
    address: {
      get () {
        this.refresh // dep.

        return (this.router && this.router.history && this.router.history.getCurrentLocation()) || ''
      },

      set (location) {
        this.router && this.router.replace(location)
      }
    },
    prev () {
      return this.index > 0
    },
    next () {
      this.refresh // dep.

      return this.index > -1 && this.index + 1 < this.stack.length
    }
  },

  methods: {
    go (delta) {
      this.router.go(delta)
    },

    async createApp () {
      const es = (App = {}) => ('__esModule' in App ? App.default : App)

      this.page = this.configureRouter(es(await this.bundle()))
    },

    configureRouter (App) {
      if (!App) return LoadingPage

      const router = this.router = App.router
      router.fallback = false
      router.mode = 'abstract'
      router.options.base = '/'
      router.afterEach(() => {
        this.refresh = !this.refresh
      })

      App.name = App.name || 'RouterExample'

      return App
    }
  },

  created () {
    this.createApp().then(() => this.$nextTick(() => this.router.replace('/')))
  },

  components: {
    AddressBar
  },

  watch: {
    bundle: 'createApp'
  }
}
</script>