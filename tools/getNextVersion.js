const { execSync } = require('child_process')
const { version: packageVersion } = require('../package.json')

const str2version = str => {
  const match = str.match(/^v?(\d+)\.(\d+).(\d+)/)

  if (match) {
    return match.slice(1).map(part => parseInt(part, 10))
  }

  return undefined
}

const compareVersions = (a, b) => {
  if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2]) {
    return 0
  }

  if (
    a[0] > b[0] ||
    (a[0] === b[0] && a[1] > b[1]) ||
    (a[0] === b[0] && a[1] === b[1] && a[2] > b[2])
  ) {
    return 1
  }

  return -1
}

const tags = execSync('/usr/bin/git tag -l | grep -e "^v"')
  .toString()
  .split('\n')

let maxVersion = str2version(packageVersion) || [0, 0, 0]

for (const tag of tags) {
  const candidate = str2version(tag)

  if (candidate && compareVersions(candidate, maxVersion) > 0) {
    maxVersion = candidate
  }
}

maxVersion[2]++
process.stdout.write(maxVersion.join('.'))
