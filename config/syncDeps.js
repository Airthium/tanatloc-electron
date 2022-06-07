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
  for (let i = 0; i < keys.length; i++) {
    const key = Object.keys(tanatlocPackage.devDependencies)[i]
    if (base.includes(key)) {
      continue
    }

    const dep = tanatlocPackage.devDependencies[key]
    try {
      if (key === 'sharp') {
        console.info(`Install ${key}@${dep}...`)
        const res = execSync(`yarn add ${key}@${dep}`)
        console.log(res.toString())
      } else {
        console.info(`Install ${key}@${dep}... (dev)`)
        const res = execSync(`yarn add --dev ${key}@${dep}`)
        console.log(res.toString())
      }
    } catch (err) {}
  }
}

syncDeps()
