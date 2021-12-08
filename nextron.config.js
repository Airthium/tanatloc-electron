const path = require('path')

module.exports = {
  mainSrcDir: 'main',
  rendererSrcDir: 'tanatloc',

  webpack: (defaultConfig) => {
    defaultConfig.module.rules.push({
      test: /\.ejs/,
      use: [{ loader: 'ignore-loader' }]
    })

    return defaultConfig
  }
}
