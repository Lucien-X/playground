const TAG = '\n\x1b[36m[J2P] \x1b[0m';
module.exports = {
  info: (...args) => console.log(`\x1b[36m%s\x1b[0m`, ...args),
  warn: (...args) => console.log(`${TAG}\x1b[33m%s\x1b[0m`, ...args),
  error: (...args) => console.log(`${TAG}\x1b[31m%s\x1b[0m`, ...args),
};