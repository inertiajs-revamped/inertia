import { access, mkdir, writeFile } from 'node:fs/promises'
import { createInterface, emitKeypressEvents } from 'node:readline'
import { colorize } from 'colorize-node'
import isCommand from 'is-command'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

/**
 * Create a simple select prompt
 * @param {{question: string, options: string[], pointer: any}} object - Options
 * @returns {Promise<string>}
 */
export async function selectPrompt({ question, options, pointer }) {
  if (question === undefined) throw new Error('No question was specified.')
  if (options === undefined) throw new Error('No options were specified.')
  if (pointer === undefined) throw new Error('No pointer was specified.')

  let selectIndex = 0
  let selectedOption = undefined

  const createSelect = () => {
    process.stdout.moveCursor(0, -(options.length - 1))
    process.stdout.cursorTo(0)
    process.stdout.clearScreenDown()

    for (let opt = 0; opt < options.length; opt++) {
      const option =
        opt === selectIndex
          ? `${colorize.cyan(pointer)} ${colorize.cyan(
              colorize.underline(options[opt])
            )}`
          : `  ${options[opt]}`
      process.stdout.write(
        `  ${option}\x1b[0m${opt !== options.length - 1 ? '\n' : ''}`
      )
    }
    process.stdout.write('\x1B[?25l')
  }

  return new Promise((resolve, reject) => {
    console.log(
      `${colorize.green('?')} ${question}${colorize.gray(
        '... (Press <up> / <down> to select, <return> to confirm)'
      )}\n\n`
    )

    emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true)
      process.stdin.resume()
      process.stdin.on('keypress', function handler(_, { name, ctrl }) {
        if (name === 'down' && selectIndex < options.length - 1) {
          ++selectIndex
          createSelect()
        } else if (name === 'up' && selectIndex > 0) {
          --selectIndex
          createSelect()
        }

        if (name === 'return') {
          process.stdin.removeListener('keypress', handler)
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\x1B[?25h')
          selectedOption = options[selectIndex]
          if (!options.includes(selectedOption))
            throw new Error('The selected option does not exist.')
          resolve(selectedOption)
        }

        if (name === 'escape' || (name === 'c' && ctrl)) {
          console.log('process.end')
          rl.close()
          process.stdin.removeListener('keypress', handler)
          process.stdin.setRawMode(false)
          process.stdin.pause()
          process.stdout.write('\x1B[?25h')
        }
      })
      createSelect()
    }
  })
}

export const symbols = {
  pointer: '❯',
  success: '✔',
}

export const notifications = {
  info: colorize.bgBlue(' INFO '),
  fail: colorize.bgRed(' FAIL '),
}

/**
 * Checks if a directory exists
 * @param {string} dir - The directory to check
 * @returns {Promise<boolean>}
 */
export const exists = (dir) =>
  access(dir)
    .then(() => true)
    .catch(() => false)

/**
 * Creates a sandbox/ui directory in workspace
 * @param {string} dir - The directory to check
 * @returns {Promise<void>}
 */
export async function createFolder(dir) {
  try {
    if (!(await exists(dir))) {
      await mkdir(dir, { recursive: true })
    } else {
      console.error(
        `${notifications.fail} Sandbox ${dir} already exists. Please delete the directory and try again.`
      )
      process.exit(1)
    }
  } catch (err) {
    if (err instanceof Error)
      console.error(`${notifications.fail} ${err.name} - ${err.message}`)
  }
}

/**
 * Clears the terminal
 * @returns {Promise<void>}
 */
export async function clearConsole() {
  await new Promise((resolve) => {
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H',
      resolve
    )
  })
}

/**
 * Checks for the sandbox system requirements
 * @param {string[]} requirement - The requirement to check
 * @returns {Promise<void>}
 */
export async function checkRequirements(requirement) {
  const reqResponse = []
  if (Array.isArray(requirement) && requirement.length) {
    for (const req of requirement) {
      const is = await isCommand(req)
      if (!is) requirementError(req)
      reqResponse.push(is)
    }
  }
}

/**
 * Throws an requirement error
 * @param {string} str - The requirement to check
 * @returns {void}
 */
export function requirementError(str) {
  console.error(
    `${notifications.fail} ${colorize.underline(
      str
    )} was not found, please install ${colorize.underline(str)} first.\n`
  )
  process.exit(1)
}

/**
 * Write json data to a file
 * @param {string} path - The path to write
 * @param {object} data - The json object to write
 * @returns {Promise<void>}
 */
export async function writeJson(path, data) {
  try {
    const json = JSON.stringify(data, null, 2)
    await writeFile(path, json, 'utf-8')
  } catch (err) {
    if (err instanceof Error)
      console.error(`${notifications.fail} ${err.name} - ${err.message}`)
  }
}
