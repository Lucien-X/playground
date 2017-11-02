var fs = require('fs'),
    chalk = require('chalk');

function copy(src, dst) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dst);

    rs.pipe(ws);
    
    rs.on('end', function() {
        ws.end();
        var message = chalk.bgBlue(src) +' is copied into '+ chalk.bgBlue(dst);
        console.log(message);
    });
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// 测试语句
// node async_copy async_copy.js ~/Desktop/async_copy.js