#!/usr/bin/env node
import { listRepoManifests } from '@bscotch/workspaces'
import { colorize } from 'colorize-node'
import semver from 'semver'
import {
  clearConsole,
  notifications,
  selectPrompt,
  symbols,
  writeJson,
} from './utils.mjs'

async function bump() {
  await clearConsole().then(async () => {
    const packages = await listRepoManifests('packages')

    const publicPackages = packages
      .filter((pkg) => pkg.package.private !== true)
      .map((pkg) => pkg.package.name)

    process.stdout.write(
      `${colorize.bgMagenta(
        colorize.bold(' Inertia.js-Revamped ')
      )} ${colorize.dim('bump')}\n\n`
    )

    process.stdout.write(
      `${notifications.info} ${colorize.underline(
        'This command will bump selected packages in the workspace.'
      )}\n\n`
    )

    const selectedPackage = await selectPrompt({
      question: `${colorize.bold('Which packages do you want to bump?')} `,
      options: publicPackages,
      pointer: symbols.pointer,
    })

    const pkg = packages.filter(
      (pkg) =>
        pkg.package.private !== true && pkg.package.name === selectedPackage
    )

    if (!pkg[0]) return

    const {
      package: { name, version },
      relativePath,
      absolutePath,
      logs,
    } = pkg[0]

    if (!version) {
      throw new Error(`Missing package.json version for package ${name}`)
    }

    if (!relativePath) {
      throw new Error(`Could not resolve relativePath for package ${name}`)
    }

    if (logs.length === 0) {
      throw new Error(
        `Nothing has changed since last release for package ${name}`
      )
    }

    const prerelease = semver.prerelease(version)
    const preId = prerelease?.[0]

    const versionIncrements = [
      'patch',
      'minor',
      'major',
      ...(preId ? ['prepatch', 'preminor', 'premajor', 'prerelease'] : []),
    ]

    const choices = versionIncrements.map(
      (i) =>
        `${i}: ${name} (${semver.inc(
          version,
          // @ts-expect-error it is `semver.ReleaseType[]`
          i,
          preId
        )})`
    )
    // todo
    //.concat(['custom'])

    const release = await selectPrompt({
      question: `${colorize.bold('Select release type')} `,
      options: choices,
      pointer: symbols.pointer,
    })

    const match = release.match(/\((.*)\)/)
    const selectedVersion = match ? match[1] : ''

    if (!semver.valid(selectedVersion)) {
      throw new Error(`Invalid target version: ${selectedVersion}`)
    }

    const { default: json } = await import(`../${relativePath}`, {
      assert: { type: 'json' },
    })

    const data = {
      ...json,
      version: selectedVersion,
    }

    await writeJson(absolutePath, data)

    process.stdout.write(
      `${notifications.bump} ${colorize.dim(
        `${name} to v${selectedVersion} ..`
      )}\n`
    )
  })
}

bump().catch((err) => {
  if (err instanceof Error)
    console.error(`${notifications.fail} ${err.name} - ${err.message}`)
})
