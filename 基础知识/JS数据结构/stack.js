// 栈是一种后进先出(last-in-first-out)的数据结构。
// 栈内的元素只能通过列表的一端访问，这一端称为栈顶。 

// 对栈的操作有以下几种：
// 1、压入栈（将一个元素压入栈顶）
// 2、弹出栈（弹出栈顶的元素）
// 3、预览栈顶（获取但不弹出栈顶的元素）
// 4、清空栈（清空栈内所有元素）
// 5、获取栈内元素的个数

function Stack(){
	this.store=[];
}

Stack.prototype={
	constructor:Stack,
	push:function(element){
		return this.store.push(element);
	},
	pop:function(){
		return this.store.pop();
	},
	peek:function(){
		return this.store[this.store.length-1];
	},
	clear:function(){
		return this.store.length=0;
	},
	length:function(){
		return this.store.length;
	}
}

// 测试用例
var stack = new Stack()

console.log(stack.peek())   // undefined

stack.push(1)
stack.push(2)
stack.push(3)

console.log(stack.peek())   // 3

stack.pop()

console.log(stack.peek())   // 2
console.log(stack.length()) // 2

stack.clear()

console.log(stack.length()) // 0