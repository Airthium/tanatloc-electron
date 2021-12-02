const path = require('path')

module.exports = {
  mainSrcDir: 'electron',
  rendererSrcDir: 'tanatloc-ssr',

  webpack: (defaultConfig) => {
    defaultConfig.module.rules.push({
      test: /\.ejs/,
      use: [{ loader: 'ignore-loader' }]
    })

    return defaultConfig
  }
}
