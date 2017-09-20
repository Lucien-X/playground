var http = require('http');
var socket = require('socket.io');
var fs = require('fs');
var _ = require('lodash');

// 启动http服务
var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end();
});

server.listen('9000');
console.log('Server is running at port 9000...');

// 监听socket连接
socket.listen(server).on('connection', function(client) {
    console.log('Client Online.');

    // 接收信息
    client.on('message', function(msg) {
        console.log('Client:　' + msg);

        fs.readFile('chatbot.json', 'utf8', function (err, data) {
            if (err) throw err;
            var answerObj = JSON.parse(data);
            // 1.去除消息中的全半角问号和空格，以及换行
            msg = _.trim(msg, '?？ 　\r\n');
            var answer = answerObj[msg];
            if(!!answer){
                client.send(answer);
            }else{
                var keys = _.keys(answerObj)
                var randomIndex = Math.floor(Math.random()*keys.length);
                var randomEleInObj = keys[randomIndex];

                client.send('听不懂你在说什么诶，你可以试试问我：<br/><br/>'+ randomEleInObj+'?');
            }
        });
    });

    // 断开处理
    client.on('disconnect', function() {
        console.log('Client Offline.'); 
    });
    
});