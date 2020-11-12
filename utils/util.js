String.prototype.mytrim = function() {
  return this.replace(/[\s+\n+\r+]/g, '')
}
module.exports = {
  trim(str) {
    return str.replace(/[\s+\n+\r+]/g, '')
  }
}