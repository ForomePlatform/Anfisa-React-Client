const fs = require('fs')
const path = require('path')
const envDev = require('dotenv').config({
  path: path.resolve(__dirname, '.env.development'),
}).parsed

const envConfigPath = path.resolve(__dirname, './public/env-config.js')

const publicDir = fs.readdirSync(path.resolve(__dirname, './public'))

const getVariablesString = () => {
  let result = ''

  for (key in envDev) {
    const value = envDev[key]
    result += `${key}: "${process.env[key] || value}",\n`
  }

  return result
}

if (publicDir.includes('env-config.js')) {
  fs.unlink(envConfigPath, err => {
    if (err) {
      console.error(err)
    }
  })
}

const content = `window._env_ = {
    ${getVariablesString()}
}`

fs.writeFileSync(envConfigPath, content)
