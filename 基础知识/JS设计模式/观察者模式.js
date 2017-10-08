
var events = (function () {
    var topics = {};
    return {
        publish: function (topic, info) {
            console.log('publish a topic:' + topic);
            if (topics.hasOwnProperty(topic)) {
                topics[topic].forEach(function (handler) {
                    handler(info ? info : {});
                })
            }
        },
        subscribe: function (topic, handler) {
            console.log('subscribe a topic:' + topic);
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
            topics[topic].push(handler);
        }
    }
})();

//主题监听函数
var handler1 = function (info) {
    console.log('handler1',info);
};
var handler2 = function (info) {
    console.log('handler2',info);
};

//订阅hello主题
events.subscribe('hello', handler1);
events.subscribe('hello', handler2);

//发布hello主题
events.publish('hello', 'hello world');