String.prototype.mytrim = function() {
  return this.replace(/[\s+\n+\r+]/g, '')
}

module.exports = {
  trim(str) {
    return str.replace(/[\s+\n+\r+]/g, '')
  },
  random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  },
  choice(arr = []) {
    const len = arr.len
    return arr[this.random(0, len - 1)]
  }
}