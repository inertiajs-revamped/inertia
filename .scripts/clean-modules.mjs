#!/usr/bin/env node
import { readdir, rm } from 'node:fs/promises'

/**
 * Deletes node_modules folders inside a workspace recursively
 * @param {string}  path - The target path
 * @returns {Promise<void>}
 */
async function cleanModules(path) {
  const root = path || process.cwd()
  try {
    const contents = await readdir(root, { withFileTypes: true })
    for (const content of contents) {
      const name = content.name
      const isDir = content.isDirectory()

      if (isDir && !name.startsWith('.')) {
        if (name === 'node_modules') {
          console.log(`Cleaning: ${root}/${name}`)
          await rm(`${root}/${name}`, { recursive: true, force: true })
        } else cleanModules(`${root}/${name}`)
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error at path ${root}: ${err.message}`)
    }
  }
}

cleanModules(process.cwd())
