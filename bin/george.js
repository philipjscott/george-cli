#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const {askGeorge, trimGeorge, formatGeorge} = require('../lib')

const fileLoadFailed = reason => `file failed to load: ${reason}`
const apiRequestFailed = reason => `API request failed: ${grgResult.reason}`
const fileMap = new Map()

async function main() {
  if (process.argv.length <= 2) {
    console.log(`Usage: ${process.argv[1]} file.grg [file2.grg] [--watch]`)
    return
  }
  const args = process.argv.slice(2)
  const relativeFilepaths = []
  const flags = new Set()
  for (const arg of args) {
    if (arg.startsWith('--')) {
      flags.add(arg.slice(2))
    } else {
      relativeFilepaths.push(arg)
    }
  }
  const filepaths = relativeFilepaths.map(filepath => path.resolve(process.cwd(), filepath))

  const filePromises = filepaths.map(filepath => fs.promises.readFile(filepath, 'utf8'))
  const fileResults = await Promise.allSettled(filePromises)
  const grgPromises = fileResults.map(fileResult =>
    fileResult.status === "fulfilled" ?
      askGeorge(fileResult.value) :
      Promise.resolve(fileLoadFailed(fileResult.reason))
  )
  const grgResults = await Promise.allSettled(grgPromises)
  const grgOutputs = grgResults.map((grgResult, i) =>
    grgResult.status === "fulfilled" ?
      [relativeFilepaths[i], grgResult.value] :
      [relativeFilepaths[i], apiRequestFailed(grgResult.reason)]
  )
  console.log(formatGeorge(grgOutputs))
      
  if (flags.has('watch')) {
    // fs.watch requires a lot of extra logic out of the box to handle editors like Vim
    // (Vim writes to a temporary file then renames), so we're using Chokidar
    for (const [i, filepath] of filepaths.entries()) {
      chokidar.watch(filepath, {
        ignored: /(^|[\/\\])\../, // ignore dotfiles
        persistent: true
      }).on('change', async () => {
        const header = `\n=== ${relativeFilepaths[i]}`
        let text
        try {
          text = await fs.promises.readFile(filepath, 'utf8')
        } catch (e) {
          console.log(header + '\n' + fileLoadFailed(e))
          return
        }
        // Note Chokidar doesn't keep track of whether the file has changed, so we keep track of that ourselves
        // If the file contents are the same, don't bother asking George
        if (fileMap.has(filepath) && text === fileMap.get(filepath)) {
          return
        }
        fileMap.set(filepath, text)
        try {
          const grgOutput = await askGeorge(text)
          console.log(header + '\n' + trimGeorge(grgOutput))
        } catch (e) {
          console.log(header + '\n' + apiRequestFailed(e))
          return
        }
      })
    }
  }
}

main()
