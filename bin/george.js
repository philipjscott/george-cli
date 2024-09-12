#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const {askGeorge, trimGeorge, formatGeorge} = require('../lib')

// don't bother with directory support, just tell people to use blobs, like *.grg
// npx george *.grg
// npx george *.grg --watch

async function main() {
  if (process.argv.length <= 2) {
    console.log(`Usage: ${process.argv[1]} file.grg [file2.grg] [--watch]`)
    return
  }
  const args = process.argv.slice(2)
  const filepaths = []
  const flags = new Set()
  for (const arg of args) {
    if (arg.startsWith('--')) {
      flags.add(arg.slice(2))
    } else {
      filepaths.push(arg)
    }
  }

  const filePromises = filepaths.map(filepath =>
    fs.promises.readFile(path.resolve(process.cwd(), filepath), 'utf8'))
  const fileResults = await Promise.allSettled(filePromises)
  const grgPromises = fileResults.map(fileResult =>
    fileResult.status === "fulfilled" ?
      askGeorge(fileResult.value) :
      Promise.resolve(`file failed to load: ${fileResult.reason}`)
  )
  const grgResults = await Promise.allSettled(grgPromises)
  const grgOutputs = grgResults.map((grgResult, i) =>
    grgResult.status === "fulfilled" ?
      [filepaths[i], grgResult.value] :
      [filepaths[i], `API request failed: ${grgResult.reason}`]
  )
  console.log(formatGeorge(grgOutputs))
      
  if (flags.has('watch')) {
    // TODO(scotty): implement watch
  }
}

main()
