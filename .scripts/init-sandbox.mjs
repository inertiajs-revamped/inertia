#!/usr/bin/env node
import { resolve } from 'node:path'
import { colorize } from 'colorize-node'
import { execa } from 'execa'
import {
  checkRequirements,
  clearConsole,
  createFolder,
  notifications,
  selectPrompt,
  symbols,
  writeJson,
} from './utils.mjs'

const root = process.cwd()

async function init() {
  await clearConsole().then(async () => {
    process.stdout.write(
      `${colorize.bgMagenta(
        colorize.bold(' Inertia.js-Revamped ')
      )} ${colorize.dim('sandbox-setup')}\n\n`
    )

    await checkRequirements(['pnpm', 'php', 'composer', 'git'])

    process.stdout.write(
      `${notifications.info} ${colorize.underline(
        'This command will auto-install a sandbox environment in the workspace.'
      )}\n\n`
    )

    const uiFramework = await selectPrompt({
      question: `${colorize.bold('Choose your UI framework:')} `,
      options: ['Preact', 'React', 'Vue'],
      pointer: symbols.pointer,
    })

    process.stdout.write(
      `${colorize.green(
        symbols.success
      )} Selected UI framework: ${uiFramework} ...\n\n`
    )

    const ui = uiFramework.toLowerCase()

    let template

    if (ui !== 'preact') {
      template = await selectPrompt({
        question: `${colorize.bold('Choose your template:')} `,
        options: ['default', 'breeze', 'pingcrm'],
        pointer: symbols.pointer,
      })

      process.stdout.write(
        `${colorize.green(
          symbols.success
        )} Selected template: ${template} ...\n\n`
      )
    }

    await createFolder(`./sandboxes/${ui}`)

    await writeJson(`./sandboxes/${ui}/package.json`, {
      name: `@inertiajs-revamped/sandbox-${ui}`,
    })

    process.stdout.write(
      `${notifications.info} Installing sandbox with @preset/cli ...\n`
    )

    execa(
      'pnpm',
      [
        '--shell-mode',
        `--filter=@inertiajs-revamped/sandbox-${ui}`,
        'exec',
        'preset',
        'apply',
        resolve(root, 'packages', 'presets'),
        '--sandbox',
        `--ui=${ui}`,
        `--template=${template ?? 'breeze'}`,
      ],
      { env: { FORCE_COLOR: 'true' } }
    ).stdout?.pipe(process.stdout)
  })
}

init().catch((err) => {
  if (err instanceof Error)
    console.error(`${notifications.fail} ${err.name} - ${err.message}`)
})
