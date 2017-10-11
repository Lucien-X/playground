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
            return Math.floor(Math.random() * 36)
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
    // 按理说这里应该给个default的参数，
  	// 再用extend方法合并参数进来,这个好像是纯复制了，不是拓展，于是就放这儿没用
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
    var defaultOptions = {
        timeout: 0,
        success: function() {},
        error: function() {},
        prefix: 'callback'
    };
  	options = extend(options,defaultOptions);
  
    // 实例化script DOM对象
    var cdjs = document.createElement('script');
    cdjs.type = 'text/javascript';

    // 生成随机数作为callback后缀
    var randomStamp = 'jsonp_' + Math.floor(Math.random() * 2147483648).toString(36);

    // param 是对象，要序列化成get传参
    var parseJson2Url = function(param, key) {
        var paramStr = '';
        var mappingOperator = '=';
        var separator = '&';
        if (param instanceof String || typeof(param) == 'string' || param instanceof Number || typeof(param) == 'number' || param instanceof Boolean || typeof(param) == 'boolean') {
            paramStr += separator + key + mappingOperator + encodeURIComponent(param);
        } else {
            for (var i in param) {
                var value = param[i];
                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += separator + parseJson2Url(value, k);
            }
        }
        return paramStr.substr(0);
    };

    cdjs.src = url + '?' + parseJson2Url(params) + '&' + options.prefix + '=' + randomStamp;
    // 超时flag
    var loaded = false;

    // 指定加载完成后的操作，这里的判断是为了顾及IE和FF的兼容性
    cdjs.onload = cdjs.onreadystatechange = function() {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
            // 在请求到达后执行成功回调并移除该script标签
            loaded = true;
            if (options.success && typeof options.success === "function") {
                options.success();
            }
            document.getElementsByTagName('head')[0].removeChild(cdjs);
            cdjs.onload = cdjs.onreadystatechange = null;
        }
    }
    // 将生成的script追加到head中,发起请求
    document.getElementsByTagName('head')[0].appendChild(cdjs);
    // 启动定时器，超过超时时间后，flag仍为false则判断请求已经失败，
    // 执行失败回调
    if (options.timeout !== 0) {
        setTimeout(function() {
            if (loaded === false) {
                if (options.error && typeof options.error === "function") {
                    options.error();
                }
            }
        }, options.timeout);
    }

}

// 3.验证IPV4合法性的正则
// IPV4取值范围为 0.0.0.0 至 255.255.255.255
var IPV4reg = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
IPV4reg.test('192.168.3.200'); // true
IPV4reg.test('0.0.0.0.0'); // false

