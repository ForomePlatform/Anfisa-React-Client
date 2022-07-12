const { execSync } = require('child_process')
const fs = require('fs').promises

const versionRegex = /[0-9]+(\.[0-9]+){2}/
const taskNumberRegex = /(FOROME-\d+)/
const delimeter = '??'
const maxBuffer = 50 * 1024 * 1024
const logFormat = `--pretty=format:'%h${delimeter}%an${delimeter}%ad${delimeter}%s${delimeter}%d'`
const baseJiraUrl = 'https://quantori.atlassian.net/browse/FOROME-'
const baseGitHubUrl =
  'https://github.com/ForomePlatform/Anfisa-React-Client/commit/'

const execCommand = (command, options) => {
  return new Promise((resolve, reject) => {
    let output
    try {
      output = execSync(`${command}`, options)
    } catch (error) {
      reject()
      process.exit(0)
    }

    resolve(output)
  })
}

const getVersionFormatted = tag => {
  if (!tag) {
    return ''
  }

  const matched = tag.match(versionRegex)
  if (matched) {
    return matched[0]
  }
  return ''
}

const getDateFormatted = date => {
  return new Date(date).toLocaleDateString('en-US')
}

const fetchLog = async () => {
  const gitCommand = `git log develop --tags ${logFormat}`

  const log = await execCommand(gitCommand, {
    encoding: 'utf8',
    maxBuffer,
  })

  return log.toString()
}

const pipe =
  (...args) =>
  value => {
    return args.reduce((res, func) => {
      return func(res)
    }, value)
  }

const parse = rawLog => {
  const parsedLog = rawLog.split('\n').reduce((acc, commit) => {
    const [hash, userName, date, message, tag] = commit.split(delimeter)
    const isFix = message.includes('fix(')
    const isFeature = message.includes('feat(') || message.includes('feature(')
    const isRefactoring = message.includes('refactor(')
    const version = getVersionFormatted(tag)

    if (!!version || isFix || isFeature || isRefactoring) {
      acc.push({
        hash,
        userName,
        date: getDateFormatted(date),
        message,
        tag: version || undefined,
        isFix,
        isFeature,
        isRefactoring,
        isTechnical: !isFix && !isFeature && !isRefactoring && !!version,
      })
    }

    return acc
  }, [])

  return parsedLog
}

const groupByReleaseVersion = parsedLog => {
  let temp = []

  const grouped = parsedLog.reduce((acc, logItem) => {
    const patchVersion = logItem.tag?.split('.')[2]

    if (!logItem.isTechnical) {
      temp.push(logItem)
    }
    if (+patchVersion === 0) {
      acc[logItem.tag] = temp
      temp = []
    }

    return acc
  }, {})

  return grouped
}

const createResult = groupedLog => {
  let resultText = '# Change log \n'

  Object.entries(groupedLog).forEach(([version, versionLog]) => {
    resultText += `\n## <small>${version} (${versionLog[0].date})</small>\n\n`
    versionLog.forEach(logItem => {
      resultText += formatRow(logItem)
    })
  })

  return resultText
}

const formatRow = ({ message, hash }) => {
  const GHUrl = `${baseGitHubUrl}${hash}`
  const taskNumberMatch = message.match(taskNumberRegex)
  let commitMesage = message

  if (taskNumberMatch) {
    const label = taskNumberMatch[1]
    const taskNumber = label.split('-')[1]
    const jiraUrl = `${baseJiraUrl}${taskNumber}`
    commitMesage = message.split(label).join(`[${label}](${jiraUrl})`)
  }

  const commitRow = `* ${commitMesage} ([${hash}](${GHUrl}))\n`

  return commitRow
}

const generate = async () => {
  const gitLog = await fetchLog()

  const result = pipe(parse, groupByReleaseVersion, createResult)(gitLog)

  await fs.writeFile('CHANGELOG.md', result)
}

generate()
