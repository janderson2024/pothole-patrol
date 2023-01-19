const { promises: Fs } = require('fs')

async function exists (path) {  
  try {
    await Fs.access(path)
    return true
  } catch {
    return false
  }
}

module.exports = exists;