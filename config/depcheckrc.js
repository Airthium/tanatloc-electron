const path = require('path')
const depcheck = require('depcheck')
const { getContent } = require('depcheck/dist/utils/file')
const { exit } = require('process')

/**
 * Custom babel parser
 * @returns Deps array
 */
depcheck.special.customBabel = async (fileName) => {
  const newDeps = []

  if (
    path.basename(fileName) === 'babelrc' ||
    path.basename(fileName) === 'babelrc.plugins'
  ) {
    const babelrc = await getContent(fileName)
    const babelrcJson = JSON.parse(babelrc)

    // Presets
    babelrcJson.presets?.forEach((preset) => {
      newDeps.push(preset)
    })

    // Plugins
    babelrcJson.plugins?.forEach((plugin) => {
      newDeps.push('babel-plugin-' + plugin[0])
    })
  }

  return newDeps
}

const options = {
  ignoreMatches: ['@types/*', 'pg-native', 'three-to-glb', 'typescript'],
  specials: [
    depcheck.special.babel,
    depcheck.special.bin,
    depcheck.special.jest
  ]
}

depcheck(process.cwd(), options, (unused) => {
  let error = 0

  if (unused.dependencies.length) {
    console.error('Unused dependencies:')
    console.error(unused.dependencies)
    console.error()
    error++
  }

  if (unused.devDependencies.length) {
    console.error('Unused dev dependencies:')
    console.error(unused.devDependencies)
    console.error()
    error++
  }

  if (Object.keys(unused.missing).length) {
    console.warn('Missing dependencies:')
    console.warn(unused.missing)
    console.warn()
  }

  if (error) exit(1)
})
