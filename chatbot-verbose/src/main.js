if (process.env.NODE_ENV !== 'production') {
    console.warn('您当前处在开发模式，该版本构建不可用于生产。\n\n终端指令列表速查:\n\t启动开发模式: npm run start \n\t启动服务器: npm run serve \n\t打包生产代码: npm run build \n ');
}

// 外部样式
import '../node_modules/font-awesome/css/font-awesome.min.css'
// 自定义样式
import './assets/styles/main.styl';
// 基础工具库
import $ from 'jquery';
import _ from 'lodash';
// websocket
import * as io from 'socket.io-client'

// 代码高亮
import '../node_modules/highlight.js/styles/monokai-sublime.css'
import hljs from 'highlight.js';

// 定义全局变量
const $CLIENT = $('#client');
const $CLIENT_SCREEN = $('#client-screen');
const $SERVER = $('#server');
const $SERVER_SCREEN = $('#server-screen');

/**
 * 代码高亮
 */
const highlight = function() {
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
};
$(document).ready(function() {
    highlight();
});

/**
 * UI逻辑
 */

// 定义服务器回传输出方法
const printLogToScreen = function(msg) {
    $SERVER_SCREEN.html(msg + '<br/>');
    highlight();
}

// 为按键添加事件委托
$CLIENT.find('.js_send').on('click', _.debounce(
    function(event) {
        event.preventDefault();
        socket.send($CLIENT_SCREEN.val());
    },
    100, {
        'leading': true,
        'trailing': false
    }
));
$CLIENT.find('.js_reset').on('click',
    function(event) {
        event.preventDefault();
        $CLIENT_SCREEN.val('').focus();
    }
);
/**
 * WebSocket 处理逻辑
 */

const socket = io.connect('http://localhost:9000');
// 连接成功处理
socket.on('connect', function() {
    printLogToScreen('Server connected.');

    // 监听服务端消息
    socket.on('message', function(msg) {
        printLogToScreen(msg);
    });

    // 监听服务端关闭
    socket.on('disconnect', function() {
        printLogToScreen('Server disconnected.');
    });
});