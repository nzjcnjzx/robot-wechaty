String.prototype.mytrim = function () {
  return this.replace(/[\s+\n+\r+]/g, '')
}
function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
module.exports = {
  random,
  trim (str) {
    return str.replace(/[\s+\n+\r+]/g, '')
  },
  choice (arr = []) {
    const len = arr.length
    return arr[random(0, len - 1)]
  }
}