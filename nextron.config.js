module.exports = {
  mainSrcDir: 'main',
  rendererSrcDir: 'tanatloc',

  webpack: (defaultConfig) => {
    defaultConfig.module.rules.push({
      test: /\.ejs/,
      use: [{ loader: 'ignore-loader' }]
    })

    defaultConfig.externals = {
      sharp: 'commonjs sharp'
    }

    return defaultConfig
  }
}
