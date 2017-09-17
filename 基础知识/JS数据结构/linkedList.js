// 节点（Node）
// 链表中的元素称为节点

// 链(next,prev)
// 节点间的引用称为链

// 链表的种类:
// 单向链表：节点只有next，链表最后一个节点的next指向null
// 单向循环链表：节点只有next，链表最后一个节点的next指向第一个节点
// 双向链表：节点不仅有next，还有prev，
// 		   链表第一个节点的prev指向null,最后一个节点的next指向null
// 双向循环链表：节点不仅有next，还有prev，
// 		   链表第一个节点的prev指向最后一个节点，最后一个节点的next指向第一个节点

function Node (data) {
    this.data = data
    this.next = null
}

function Llist () {
    // 头节点
    this.head = new Node('head');
    // 因为insertAfter方法中，新插入的元素next指向下一元素，
    // 所以将head的next指向自己，会导致最后一个元素的next永远指向head，
    // 这个逻辑就是传说中的"衔尾蛇"，会使链表变为循环链表，
    // 从而使得不加终止判断的display方法陷入死循环
    this.head.next = this.head;
}
Llist.prototype = {
    constructor: Llist,
    // 插入节点：将 newNode节点 插入到 node节点 之后
    insertAfter: function (newNode, data) {
        var target = this.find(data)

        // 修改下一元素的prev
        if (target.next) {
            target.next.prev = newNode
        }
        // next指向下一元素
        newNode.next = target.next

        // 修改上一元素的next
        target.next = newNode
        // prev指向上一元素
        newNode.prev = target

        // 插入的如果是最后一个元素(next指向head)，将head的prev指向它
        if (newNode.next === this.head) {
            this.head.prev = newNode
        }
    },
    // 删除节点
    remove: function (data) {
        var target = this.find(data)
        // 将上下两节点链接起来
        target.prev.next = target.next
        target.next.prev = target.prev
        // 断开与上下两节点的链接
        target.next = target.prev = null
    },
    // 查找节点
    find: function (data) {
        var current = this.head
        while (current && current.data != data) {
            current = current.next
        }
        return current
    },
    // 显示全部节点
    display: function () {
        var current = this.head
        // 加入终止判断，到最后一个元素(next指向head)结束，防止双向链表中发生死循环
        while (current.next&&current.next.data!='head') {
            console.log(current.next.data)
            current = current.next
        }
        console.log('======')
    }
}

// 测试用例
var list = new Llist()
var new1 = new Node('new1')
var new2 = new Node('new2')
var new3 = new Node('new3')
list.insertAfter(new1, 'head')
list.insertAfter(new2, 'new1')
list.insertAfter(new3, 'new1')
list.display()  // 输出：new1 new3 new2
list.remove('new3')
list.display()  // 输出：new1 new2