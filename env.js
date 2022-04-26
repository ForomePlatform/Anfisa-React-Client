const fs = require('fs')
const path = require('path')
const envDev = require('dotenv').config({
  path: path.resolve(__dirname, '.env.development'),
}).parsed

const envConfigPath = path.resolve(__dirname, './public/env-config.js')

const publicDir = fs.readdirSync(path.resolve(__dirname, './public'))

const getVariablesString = () => {
  let result = {}

  for (const key in envDev) {
    result[key] = process.env[key] || envDev[key]
  }

  return JSON.stringify(result)
}

if (publicDir.includes('env-config.js')) {
  fs.unlink(envConfigPath, err => {
    if (err) {
      console.error(err)
    }
  })
}

const content = `window._env_ = ${getVariablesString()}`

fs.writeFileSync(envConfigPath, content)
