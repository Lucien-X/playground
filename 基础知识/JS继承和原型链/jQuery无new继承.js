// jQuery无new继承
// 以及链式调用原理
(function(w, u) {
    var jQuery = function(selector, context) {
        // 每次执行jQuery，返回新实例jQuery.fn.init
        return new jQuery.fn.init(selector, context, rootjQuery);
    };
    jQuery.fn = jQuery.prototype = {
        init: function(selector, context, rootjQuery) {

        },
        fuck: function() {
            alert('fuck');
        }
    };
    // Give the init function the jQuery prototype for later instantiation
    jQuery.fn.init.prototype = jQuery.fn;
    window.jQuery=jQuery;
})(window);

jQuery.fn = jQuery.prototype;
jQuery.fn.init.prototype = jQuery.fn;
// 这两句话，第一句把jQuery对象的原型赋给了fn属性，
// 第二句把jQuery对象的原型又赋给了init对象的原型。
// 也就是说，init对象和jQuery具有相同的原型，因此我们在上面返回的init对象，就与jQuery对象有一样的属性和方法。