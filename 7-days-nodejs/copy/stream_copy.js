var fs = require('fs'),
    chalk = require('chalk');

function copy(src, dst) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dst);

    rs.on('data', function(chunk) {
        if (ws.write(chunk) === false) {
            rs.pause();
        }
    });

    ws.on('drain', function() {
        rs.resume();
    });

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

// 以上代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制
// 因为这种使用场景很多，例如async_copy，
// NodeJS直接提供了.pipe方法来做这件事情，其内部实现方式与上边的代码类似。

// 测试语句
// node stream_copy stream_copy.js ~/Desktop/stream_copy.js
