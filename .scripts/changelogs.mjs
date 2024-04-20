#!/usr/bin/env node
import {
  parseMonorepoConventionalCommits,
  renderMonorepoConventionalCommits,
} from '@bscotch/workspaces'

/**
 * CommitType `chore` is disabled by default for all packages
 * and should be used for changelog (and other) related commits
 *
 * { pattern: /^chore?$/, group: 'Chores' },
 */
const parsed = await parseMonorepoConventionalCommits('.', {
  types: [
    { pattern: /^feat?$/, group: 'Features' },
    { pattern: /^fix?$/, group: 'Bug Fixes' },
    { pattern: /^docs?$/, group: 'Documentation' },
    { pattern: /^style?$/, group: 'Styles' },
    { pattern: /^refactor?$/, group: 'Code Refactoring' },
    { pattern: /^perf?$/, group: 'Performance Improvements' },
    { pattern: /^test?$/, group: 'Tests' },
    { pattern: /^build?$/, group: 'Builds' },
    { pattern: /^revert?$/, group: 'Reverts' },
  ],
})

await renderMonorepoConventionalCommits(
  parsed,
  (project, versions) => {
    if (
      project.isRoot ||
      project.package.name === '@inertiajs-revamped/docs' ||
      project.package.name === '@inertiajs-revamped/presets'
    )
      return
    const title = `# Changelog - ${project.package.name}`
    const versionStrings = versions.map((version) => {
      const header = `## ${version.version} (${
        version.date.toISOString().split('T')[0]
      })`
      const groups = Object.keys(version.groups).sort()
      const sections = groups.map((group) => {
        const changes = version.groups[group]
        const commits = changes
          .map((commit) => {
            const shortHash = commit.log.hash.slice(0, 7)
            return `- ${commit.variables.description} ([${shortHash}](https://github.com/inertiajs-revamped/inertia/commit/${shortHash}))`
          })
          .join('\n')
        return `### ${group}\n\n${commits}`
      })
      return `${header}\n\n${sections.join('\n\n')}`
    })
    return `${title}\n\n${versionStrings.join('\n\n')}`
  },
  { filename: 'CHANGELOG.md' }
)
