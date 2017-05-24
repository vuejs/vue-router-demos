<template>
<div class="browser">
  <AddressBar
      v-model="address"
      :next="next"
      :prev="prev"
      @back="go(-1)"
      @forward="go(1)"
  />
  <component :is="page"/>
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
    location: '',
    prev: false,
    next: false,

    page: LoadingPage
  }),

  computed: {
    address: {
      get () {
        return this.location
      },

      set (location) {
        this.router.replace(location)
      }
    }
  },

  methods: {
    go (delta) {
      this.router.go(delta)
    },

    onComplete (router) {
      this.location = router.getCurrentLocation()
      this.next = router.index + 1 < router.stack.length
      this.prev = router.index > -1
    },

    onError (router) {
      this.onComplete(router)
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
      router.history = new MemoryHistory(this, router, router.options.base)
      router.init(this.$root)

      App.name = App.name || 'RouterExample'

      return App
    }
  },

  created () {
    this.createApp()
  },

  components: {
    AddressBar
  },

  watch: {
    bundle: 'createApp'
  }
}
</script>