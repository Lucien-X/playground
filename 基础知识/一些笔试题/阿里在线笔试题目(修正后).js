评测题目:

    1. 实现一个jQuery插件， 生成一组字母数字组合的随机串（ 像车牌） `$.generateId(6)`；
2. 原生代码实现jsonp函数， 带超时、 兼容性好： `jsonp(url,params,{timeout,success,error,prefix})`
3. 一个验证IPv4地址合法性的正则表达式

// 1、生成指定长度随机串代码如下
// 使用jQuery库的extend方法，将对象直接拷贝到jQuery对象中
$.extend({
    generateId: function(length) {
        // 定义取0~36随机index的函数
        var randomIndex = function() {
            return Math.floor(Math.random() * 36);
        };
        // 定义临时数组,用于存放各位字符
        var tempArr = [];
        // 按照给定长度进行循环，将字符入栈
        for (var i = 0; i < length; i++) {
            tempArr.push(randomIndex().toString(36));
        }
        // 使用join方法将数组转为字符串返回
        return tempArr.join('');
    }
});

// 2、jsonp函数
function jsonp(url, params, options) {

    // 该方法递归地将p拷贝进c中
    var extend = function(p, c) {
        var c = c || {};
        for (var i in p) {
            if (typeof p[i] === 'object' && !!p[i]) {
                c[i] = (p[i].constructor === Array) ? [] : {};
                extend(p[i], c[i]);
            } else {
                c[i] = p[i];
            }
        }
        return c;
    };

    // 该方法将对象转换成URL查询参数
    var encodeObjectToQueryString = function(param, key) {
        var paramStr = '';
        var separator = '&';
        var mappingOperator = '=';
        if (param instanceof String || typeof(param) == 'string' || param instanceof Number || typeof(param) == 'number' || param instanceof Boolean || typeof(param) == 'boolean') {
            paramStr += separator + key + mappingOperator + encodeURIComponent(param);
        } else {
            for (var i in param) {
                var value = param[i];
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += separator + encodeObjectToQueryString(value, k);
            }
        }
        return paramStr.substr(1);
    };

    // 定义参数默认值
    var defaultOptions = {
        timeout: 0,
        success: function() {},
        error: function() {},
        prefix: 'callback'
    };
    // 调用方法拷贝默认值
    options = extend(options, defaultOptions);

    // 定义定时器timer
    var timer = null;
    // 定义callback函数名，这里加了随机数后缀防止重复
    var callbackName = 'jsonpCallback_' + Math.floor(Math.random() * 2147483648).toString(36);

    // 实例化 script DOM对象
    var cdjs = document.createElement('script');
    cdjs.type = 'text/javascript';
    cdjs.src = url + '?' + encodeObjectToQueryString(params) + '&' + options.prefix + '=' + callbackName;

    // 创建jsonp失败回调
    if (options.timeout !== 0) {
        // 设置定时器
        timer = setTimeout(function() {
            // 调用失败回调
            options.error && options.error(url,params,options);
            // 一些清理工作
            document.getElementsByTagName('head')[0].removeChild(cdjs);
            window[callbackName] = null;
        }, options.timeout);
    }

    // 创建jsonp成功回调
    window[callbackName] = function(resp) {
        // 停止定时器
        clearTimeout(timer);
        // 调用成功回调
        options.success && options.success(resp);
        // 一些清理工作
        document.getElementsByTagName('head')[0].removeChild(cdjs);
        window[callbackName] = null;
    };

    // 追加元素，触发请求
    document.getElementsByTagName('head')[0].appendChild(cdjs);

}

// 测试用Demo，用了百度的搜索接口
jsonp('http://suggestion.baidu.com/su', {
    wd: 'Alibaba',
    someObject: { key: 'value', subObject: { arrayInObj: [1, 2] } },
    someBoolean: true,
    someArray: [1, 2, 3]
}, {
    prefix: 'cb',
    timeout: 2000,
    success: function(resp) {
        console.log(resp);
    },
    error: function() {
        console.log('JSONP timeout.');
        console.log(arguments);
    }
});



// 3.验证IPV4合法性的正则
// IPV4取值范围为 0.0.0.0 至 255.255.255.255
var IPV4reg = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
IPV4reg.test('192.168.3.200'); // true
IPV4reg.test('0.0.0.0.0'); // false