function requireAll (dirName) {
  const fs = require('fs')
  const path = require('path')
  let source = {}
  const basename = 'index.js'
  fs.readdirSync(dirName)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach(file => {
      const model = require(path.join(dirName, file))
      source = { ...source, ...model }
    })
    return source
}
module.exports = {
  requireAll
}