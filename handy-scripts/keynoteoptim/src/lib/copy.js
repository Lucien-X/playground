var fs = require('fs');

module.exports = function copy(oldPath, newPath, callback = () => {}) {
  var readStream = fs.createReadStream(oldPath);
  var writeStream = fs.createWriteStream(newPath);

  readStream.on('error', callback);
  writeStream.on('error', callback);

  readStream.on('close', callback);

  readStream.pipe(writeStream);
};