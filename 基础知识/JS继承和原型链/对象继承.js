// JSON之父Douglas Crockford，提出了一个object()函数，用于对象继承
// 与之前YUI类继承同理，只是对象不存在constructor这回事，
// 不需要将Child的constructor指向自己，防止继承链的紊乱，
// 如果父对象的属性等于数组或另一个对象，
// 那么实际上，子对象获得的只是一个内存地址，
// 而不是真正拷贝，因此存在父对象被篡改的可能。
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}
// 测试用例
var Chinese = {nation:'中国'};
var Doctor = object(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); //中国

// 缺陷测试用例
var Chinese = {nation:'中国'};
Chinese.birthPlaces = ['北京','上海','香港'];
var Doctor = object(Chinese);
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门


// 浅拷贝实现对象继承
// 这样的拷贝有一个问题。
// 如果父对象的属性等于数组或另一个对象，
// 那么实际上，子对象获得的只是一个内存地址，
// 而不是真正拷贝，因此存在父对象被篡改的可能。
function extendCopy(p) {
	var c = {};
	for (var i in p) { 
		c[i] = p[i];
	}
	c.uber = p;
	return c;
}
// 测试用例
var Chinese = {nation:'中国'};
var Doctor = extendCopy(Chinese);
Doctor.career = '医生';
alert(Doctor.nation); // 中国
// 浅拷贝缺陷测试用例
var Chinese = {nation:'中国'};
Chinese.birthPlaces = ['北京','上海','香港'];
var Doctor = extendCopy(Chinese);
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港, 厦门



// 递归浅拷贝实现深拷贝，目前jQuery库使用的就是这种继承方法。
function deepCopy(p, c) {
	var c = c || {};
	for (var i in p) {
		if (typeof p[i] === 'object') {
			c[i] = (p[i].constructor === Array) ? [] : {};
			deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}
// 测试用例，没有浅拷贝缺陷
var Chinese = {nation:'中国'};
Chinese.birthPlaces = ['北京','上海','香港'];
var Doctor = deepCopy(Chinese);
Doctor.birthPlaces.push('厦门');
alert(Doctor.birthPlaces); //北京, 上海, 香港, 厦门
alert(Chinese.birthPlaces); //北京, 上海, 香港

