var fs = require('fs'),
    path = require('path');

function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback && callback(pathname);
        }
    });
}

travel('copy',function(pathname){
    console.log(pathname);
})