// YUI库实现继承的方法，用空对象进行中介
function extend(Child, Parent) {
    /* 
    	假如直接使用Child.prototype = Parent.prototype，两者原型指向了同一个对象，
    	那么任何对Child.prototype的修改，都会反映到Parent.prototype，
    	利用一个空对象的实例作为中介，则不会存在这个问题，而且新建空对象实例，几乎不耗内存
     */
    // 建立Medium作为中介,
    var Medium = function() {};
    // 将Medium的原型指向Parent原型
    Medium.prototype = Parent.prototype;
    // 将Child的原型指向Medium的实例
    Child.prototype = new Medium();

    /* 	
    	每一个实例也有一个constructor属性，默认调用prototype对象的constructor属性。
     	这导致new Medium()的constructor指向Parent，Child.prototype也是，这里要手动校正
     */
    // 将Child的constructor指向自己，防止继承链的紊乱
    Child.prototype.constructor = Child;

    /* 
    	意思是为子对象设一个uber属性，这个属性直接指向父对象的prototype属性。（uber是一个德语词，意思是"向上"、"上一层"。）
      	这等于在子对象上打开一条通道，可以直接调用父对象的方法。这一行放在这里，只是为了实现继承的完备性，纯属备用性质。
     */
    Child.uber = Parent.prototype;
}

// 测试用例
function Animal() {}
// 首先，把Animal的所有通用属性和方法，都放到它的prototype对象上。
Animal.prototype={
	constructor:Animal,
	species:"动物",
}

function Cat(name, color) {
	this.name = name;
	this.color = color;
}

extend(Cat,Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物

// 拷贝继承，把父对象的所有属性和方法，遍历拷贝进子对象
function extend2(Child, Parent) {
	var p = Parent.prototype;
	var c = Child.prototype;
	for (var i in p) {
		c[i] = p[i];
	}
	c.uber = p;
}

// 测试用例
function Animal() {}
// 首先，把Animal的所有通用属性和方法，都放到它的prototype对象上。
Animal.prototype={
	constructor:Animal,
	species:"动物",
}

function Cat(name, color) {
	this.name = name;
	this.color = color;
}

extend2(Cat, Animal);
var cat1 = new Cat("大毛","黄色");
alert(cat1.species); // 动物

