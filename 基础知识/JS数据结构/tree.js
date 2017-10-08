// 树是计算机科学中经常用到的一种数据结构，
// 以分层的方式存储数据，所以经常用来存储具有层级关系的数据，比如文件系统。
// 此外，树也被用来存储有序的列表，例如二叉查找树，在二叉查找树上进行查找非常快。

// 设计二叉查找树的目的，最初只是为了方便查找一组数据中的最小值和最大值

// 对于树结构，有三种遍历方式：
// 1.先序遍历：
// 	模式：先输出根节点，再输出左子树，最后输出右子树。
// 	特点：在第一次遍历到节点时就执行操作。
// 	用途：配合栈结构，可用于实现相对路径的显示。
// 2.中序遍历：
// 	模式：先输出左子树，再输出根节点，最后输出右子树。
// 	特点：对于二叉搜索树，中序遍历的操作顺序（或输出结果顺序）是符合从小到大（或从大到小）顺序的。
// 	用途：配合栈结构，可实现排序功能。反转二叉树后，可以倒序。
// 3.后序遍历：
// 	模式：先输出左子树，再输出右子树，最后输出根节点。
// 	特点：后序遍历的特点是执行操作时，肯定已经遍历过该节点的左右子节点。
// 	用途：配合栈结构，可用于删除目录及其子目录，或者计算指定目录内所有文件大小


// 以下是二叉搜索树的实现
function Node (data) {
    this.data = data
    this.left = null
    this.right = null
}
//	Binary Search Tree，二叉搜索树
function BST(){	
	this.root=null;
}

BST.prototype={
	constructor:BST,
	// 节点插入方法
	insert:function(data){
		// 1、根据输入的数据 data 创建一个新的节点。
		var n=new Node(data);
		// 2、检查是否有根节点，如果没有根节点证明这是一颗新树，将该节点作为根节点。
		if(!this.root){
			this.root=n;
			return;
		}
		// 3、否则，开始遍历树，将根节点设为当前节点，使用新节点与当前节点作比较，
		// 如果新节点的值小于当前节点:
		// 3.1、如果当前节点的左子节点为null，则将新节点设为当前节点的左子节点，退出循环。
		// 3.2、如果当前节点的左子节点不为null，则更新当前节点为当前节点的左子节点，执行下一次循环。
		var current=this.root;
		while(true){
			if(data<current.data){
				if(!current.left){
					current.left=n;
					break;
				}
				current=current.left;
			}
			if(data>current.data){
				if(!current.right){
					current.right=n;
					break;
				}
				current=current.right;
			}
			// 由于二叉树定义中，每个结点都有一个作为搜索依据的关键码(key)，
			// 所有结点的关键码互不相同。
			// 当插入值已存在，不再重复插入
			if(data==current.data){
				break;
			}
		}
	},
	// 先序(根)遍历(preOrder traversal)
	preOrder:function(Node){
		if(Node){
			console.log(Node.data);
			this.preOrder(Node.left);
			this.preOrder(Node.right);
		}
	},
	// 中序(根)遍历(inOrder traversal)
	inOrder:function(Node){
		if(Node){
			this.inOrder(Node.left);
			console.log(Node.data);
			this.inOrder(Node.right);
		}
	},
	// 后序(根)遍历(postOrder traversal)
	postOrder:function(Node){
		if(Node){
			this.postOrder(Node.left);
			this.postOrder(Node.right);
			console.log(Node.data);
		}
	},
	// 查找最小值
	getMin:function(){
		var current=this.root;
		while(true){
			if(!current.left){
				console.log(current.data);
				break;
			}
			current=current.left;
		}
	},
	// 查找最大值
	getMax:function(){
		var current=this.root;
		while(true){
			if(!current.right){
				console.log(current.data);
				break;
			}
			current=current.right;
		}
	},
	// 查找指定值
	find:function(data){
		var current=this.root;
		while(true){
			if(data==current.data){
				return current;
			}
			if(data<current.data){
				if(current.left){
					current=current.left;
				}else{
					break;
				}
			}
			if(data>current.data){
				if(current.right){
					current=current.right;
				}else{
					break;
				}
			}
		}
		return null;
	},
	// 反转二叉树
	revert:function(Node){
		if(Node){
			var tmp = Node.right;
			Node.right = Node.left;
			Node.left = tmp;

			this.revert(Node.left);
			this.revert(Node.right);
		}
	}
}

// 测试用例
var tree = new BST();
tree.insert(23);
tree.insert(45);
tree.insert(16);
tree.insert(37);
tree.insert(3);
tree.insert(99);
tree.insert(22);


console.log('=====先序遍历=====');
tree.preOrder(tree.root);
console.log('=====中序遍历=====');
tree.inOrder(tree.root);
console.log('=====后序遍历=====');
tree.postOrder(tree.root);
console.log('=====查找最小值=====');
tree.getMin();
console.log('=====查找最大值=====');
tree.getMax();
console.log('=====查找指定值=====');
console.dir(tree.find(22));
console.dir(tree);
console.log('=====先拷贝树，再反转二叉树后，再次中序遍历，应得到倒序=====');
function deepCopy(p, c) {
	var c = c || {};
	for (var i in p) {
		if (typeof p[i] === 'object' && !!p[i]) {
				c[i] = (p[i].constructor === Array) ? [] : {};
				deepCopy(p[i], c[i]);
		} else {
			c[i] = p[i];
		}
	}
	return c;
}
var mirrorTree = deepCopy(tree);
mirrorTree.revert(mirrorTree.root);
mirrorTree.inOrder(mirrorTree.root);

