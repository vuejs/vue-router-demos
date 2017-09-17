<template>
  <div class="columns example">
      <div class="column is-4-desktop">
          <Browser :name="name" :bundle="bundled"/>
      </div>
      <div class="column is-8-desktop code-browser">
          <div v-for="code in codes" :key="code.name">
            <span v-if="code.loading">
              Loading...
            </span>
            <pre v-else
                class="code"
                v-html="code.source"/>
          </div>
      </div>
  </div>
</template>

<script>
import Browser from './Browser'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prism-themes/themes/prism-atom-dark.css'

export default {
  name: 'Example',

  props: {
    name: {
        type: String,
        required: true,
    },
    files: {
        type: Array,
        required: true,
        validate (files) {
            return files.every(file => typeof (file) === 'string')
        }
    },
    bundle: {
        type: Function,
        required: true
    }
  },

  computed: {
      codes () {
          const name = this.name
          const downloaded = this.downloaded[name] || {}
          const files = this.files

          return files.map(file => ({
              name: file,
              loading: !(file in downloaded),
              source: downloaded[file]
          }))
      },

      bundled () {
          const bundle = this.bundle

          return bundle
      }
  },

  data: () => ({
      downloaded: {},
  }),

  methods: {
      fetchSource () {
          const name = this.name
          
          if (!(name in this.downloaded)) {
              this.$set(this.downloaded, name, {})
          }
          
          this.files.forEach(file => {
              fetch(`/examples/${this.name}/${file}`)
                .then((result) => {
                    result.text().then(text => {
                        this.$set(
                            this.downloaded[name],
                            file,
                            Prism.highlight(
                                `// File: ${file}\n\n${text}`, 
                                /\.vue$/.test(file) ? Prism.languages.jsx : Prism.languages.js
                            )
                        )
                    })
                })
                .catch(error => console.log(error))
          })
      }
  },

  beforeRouteUpdate (from, to, next) {
      next()
      this.$nextTick(() => this.fetchSource())
  },

  created () {
      this.fetchSource()
  },

  components: { Browser }
}
</script>

<style lang="scss" scoped>
.example {
    height: 100vh;
    padding-left: .75rem;
}

.code-browser {
    background: rgba(0, 0, 0, .7);
    margin-bottom: 0 !important;
    overflow: auto;
}

pre.code {
    color: white;
    background: transparent;

    .token.tag {
        background-color: inherit !important;
        border-radius: 0 !important;
        color: inherit !important;
        display: initial !important;
        font-size: inherit !important;
        height: inherit !important;
        line-height: inherit !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        white-space: initial !important;
    }
}
</style>


