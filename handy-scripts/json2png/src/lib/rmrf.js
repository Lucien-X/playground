const fs = require('fs');
const path = require('path');

const deleteFolderRecursive = function(filePath) {
  if (fs.existsSync(filePath)) {
    fs.readdirSync(filePath).forEach((file, index) => {
      const curPath = path.join(filePath, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(filePath);
  }
};

module.exports = deleteFolderRecursive;