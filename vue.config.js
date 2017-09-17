const express = require('express')

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.js$/,
      use: 'babel-loader',
      include: [/node_modules\/vue-router/]
    })
    config.devtool = 'source-map'
    config.resolve = config.resolve || {}
    config.resolve.alias = config.resolve.alias || {}
    config.resolve.alias['vue$'] = 'vue/dist/vue.esm.js'

    return config
  },
  setup (app) {
    app.use('/examples', express.static('examples'))
  }
}