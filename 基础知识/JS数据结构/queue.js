// 队列是一种先进先出(first-in-first-out)的数据结构，
// 队列只允许在一端插入数据，在另一端读取数据。

// 对队列的操作有如下几种：
// 入队（向队列尾部插入新元素）
// 出队（删除队列头部的元素）
// 读取队头的元素（获取但不删除队列头部的元素）
// 清空队列
// 获取队列的元素个数
// 等...

function Queue () {
    this.store = []
}

Queue.prototype = {
    constructor: Queue,
    enqueue: function (element) {
        return this.store.push(element)
    },
    dequeue: function () {
        return this.store.shift()
    },
    peek: function () {
        return this.store[0]
    },
    clear: function () {
        this.store.length = 0
    },
    length: function () {
        return this.store.length
    }
}

// 测试用例
var qu = new Queue()

qu.enqueue('1')
qu.enqueue('2')
qu.enqueue('3')

console.log(qu.peek())  // 1

qu.dequeue()

console.log(qu.peek())  // 2

qu.clear()

console.log(qu.peek())  // undefined