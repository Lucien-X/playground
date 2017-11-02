if (process.env.NODE_ENV !== 'production') {
    console.warn('您当前处在开发模式，该版本构建不可用于生产。\n\n终端指令列表速查:\n\t启动开发模式: npm run start \n\t启动服务器: npm run serve \n\t打包生产代码: npm run build \n ');
}

// 外部样式
import '../node_modules/font-awesome/css/font-awesome.min.css'
// 自定义样式
import './assets/styles/main.styl';
// favicons
import './assets/favicons/favicons.js';
// hotcss,移动端rem布局基础库
import hotcss from 'hotcss'

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
 * hotcss配置,以防JS中用到hotcss的px2rem和rem2px方法
 */
hotcss.designWidth = 750;

/**
 * 代码高亮
 */
const highlight = () => {
    $('pre code').each((i, block) => {
        hljs.highlightBlock(block);
    });
};
$(document).ready(highlight);

/**
 * UI逻辑
 */


// 定义服务器回传输出方法
const printLogToScreen = (() => {
    //闭包保存定时器状态，防止上次递归未结束就触发下一次递归
    var logFlag = null;
    return (msg) => {
        // 如果定时器存在，清除定时器
        if (!!logFlag) {
            clearTimeout(logFlag);
        }

        // 输入队列
        var inputQueue = msg.split('');
        // 输出队列
        var outputQueue = [];

        const typeAhead = () => {
            outputQueue.push(inputQueue.shift());
            $SERVER_SCREEN.html(outputQueue.join(''));
            highlight();
            // 当数组还未空时，递归调用，进入下一次循环
            if (inputQueue.length !== 0) {
                logFlag = setTimeout(typeAhead, 20);
            } else {
                return;
            }
        }
        // 触发第一次调用
        typeAhead();
    }
})();

// 为按键添加事件委托
$CLIENT.find('.js_send').on('click', _.debounce(
    (event) => {
        event.preventDefault();
        socket.send($CLIENT_SCREEN.val());
    },
    100, {
        'leading': true,
        'trailing': false
    }
));
$CLIENT.find('.js_reset').on('click', (event) => {
    event.preventDefault();
    $CLIENT_SCREEN.val('').focus();
});


/**
 * WebSocket 处理逻辑
 */

const socket = io.connect('http://localhost:9000');
// 连接成功处理
socket.on('connect', () => {
    printLogToScreen('Server connected.');

    // 监听服务端消息
    socket.on('message', (msg) => {
        printLogToScreen(msg);
    });

    // 监听服务端关闭
    socket.on('disconnect', () => {
        printLogToScreen('Server disconnected.');
    });
});