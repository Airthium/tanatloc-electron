const path = require('path')
const depcheck = require('depcheck')
const { getContent } = require('depcheck/dist/utils/file')
const { exit } = require('process')

depcheck.special.customPackage = async (fileName) => {
  const newDeps = []

  if (path.basename(fileName) === 'package.json') {
    const packageJson = require(fileName)

    newDeps.push(...Object.keys(packageJson.dependencies))
    newDeps.push(...Object.keys(packageJson.devDependencies))
  }

  return newDeps
}

const options = {
  ignoreMatches: ['@types/*', 'typescript'],
  specials: [
    depcheck.special.babel,
    depcheck.special.bin,
    depcheck.special.jest,
    depcheck.special.customPackage
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
