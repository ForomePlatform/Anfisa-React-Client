const { execSync } = require('child_process')
const fs = require('fs').promises

const versionRegex = /([\d.\d.\d]+)/
const taskNumberRegex = /(FOROME-\d+)/
const delimeter = '??'
const maxBuffer = 50 * 1024 * 1024
const logFormat = `--pretty=format:'%h${delimeter}%an${delimeter}%ad${delimeter}%s${delimeter}%d'`
const techCommitMessage = 'docs:changelog-auto-generated'
const techAccountName = 'Version Bot'
const baseJiraUrl = 'https://quantori.atlassian.net/browse/FOROME-'
const baseGitHubUrl =
  'https://github.com/ForomePlatform/Anfisa-React-Client/commit/'

const execCommand = (command, options) => {
  return new Promise((resolve, reject) => {
    let output
    try {
      output = execSync(`npx ${command}`, options)
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
    const isTechnicalCommit = userName === techAccountName

    if (isTechnicalCommit || isFix || isFeature || isRefactoring) {
      acc.push({
        hash,
        userName,
        date: getDateFormatted(date),
        message,
        tag: isTechnicalCommit ? getVersionFormatted(tag) : undefined,
        isFix,
        isFeature,
        isRefactoring,
      })
    }

    return acc
  }, [])

  return parsedLog
}

const createResult = parsedLog => {
  let resultText = '# Change log \n'
  parsedLog.forEach(logItem => {
    const { tag, date, ...rest } = logItem
    if (tag) {
      resultText += `\n## <small>${tag} (${date})</small>\n\n`
    } else {
      resultText += formatRow(rest)
    }
  })

  return resultText
}

const formatRow = ({ message, hash }) => {
  if (message.includes(techCommitMessage)) {
    return
  }

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

  const result = pipe(parse, createResult)(gitLog)

  await fs.writeFile('CHANGELOG.md', result)
}

generate()
