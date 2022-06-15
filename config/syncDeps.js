const { execSync } = require('child_process')

const base = [
  '@babel/cli',
  '@babel/core',
  '@babel/preset-typescript',
  '@types/cors',
  '@types/express',
  '@types/http-errors',
  '@types/jest',
  'babel-jest',
  'babel-plugin-module-resolver',
  'babel-preset-minify',
  'cors',
  'depcheck',
  'electron',
  'electron-builder',
  'express',
  'http-errors',
  'jest',
  'next',
  'nextron',
  'prettier',
  'typedoc',
  'typedoc-plugin-airthium',
  'typescript'
]

const syncDeps = () => {
  const tanatlocPackage = require('../tanatloc/package.json')

  const keys = Object.keys(tanatlocPackage.devDependencies)
  const deps = []
  const devDeps = []
  for (let i = 0; i < keys.length; i++) {
    const key = Object.keys(tanatlocPackage.devDependencies)[i]
    if (base.includes(key)) {
      continue
    }

    const dep = tanatlocPackage.devDependencies[key]
    try {
      if (key === 'sharp') {
        console.info(`Add ${key}@${dep}...`)
        deps.push(`${key}@${dep}`)
      } else {
        console.info(`Add ${key}@${dep}... (dev)`)
        devDeps.push(`${key}@${dep}`)
      }
    } catch (err) {}
  }

  try {
    const depsRes = execSync('yarn add ' + deps.join(' '))
    console.log(depsRes.toString())

    const devDepsRes = execSync('yarn add --dev ' + devDeps.join(' '))
    console.log(devDepsRes.toString())
  } catch (err) {}
}

syncDeps()
