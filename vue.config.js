module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.js$/,
      use: 'babel-loader',
      include: [/node_modules\/vue-router/]
    })
    config.devtool = 'source-map'

    return config
  }
}