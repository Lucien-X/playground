var fs = require('fs'),
    chalk = require('chalk');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
    var message = chalk.bgBlue(src) +' is copied into '+ chalk.bgBlue(dst);
    console.log(message);
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// 测试语句
// node sync_copy sync_copy.js ~/Desktop/sync_copy.js