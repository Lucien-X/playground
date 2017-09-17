// 顶点类
function Vert (data, visited) {
    // 顶点的数据
    this.data = data
    // 标示着顶点是否被访问过
    this.visited = visited
}

// 图类，构造邻接表数组 adj，传递顶点数组 vertex 进行初始化
function Graph (vertex) {
    this.vertex = vertex
    // 顶点数量
    this.quantity = vertex.length
    // 边的数量
    this.edges = 0
    // 邻接表数组
    this.adj = []
    for(var i = 0; i < this.quantity; i++) {
        this.adj[i] = []
    }
}

Graph.prototype={
    constructor:Graph,
    searchPos:function (data) {
        var index = -1
        for (var i = 0; i < this.quantity; i++) {
            if (this.vertex[i].data == data) {
                index = i
                break
            }
        }
        return index
    },
    addEdge:function (data1, data2) {
        // 查找顶点 v1 在顶点数组的位置
        var v1Index = this.searchPos(data1)
        // 查找顶点 v2 在顶点数组的位置
        var v2Index = this.searchPos(data2)

        this.adj[v1Index].push(v2Index)
        this.adj[v2Index].push(v1Index)
        this.edges++
    },
    // 查看图
    showGraph:function () {
        var putStr = ''
        for (var i = 0; i < this.quantity; i++) {
            putStr = ''
            putStr += i + ' -> '
            for (var j = 0; j < this.quantity; j++) {
                if (this.adj[i][j] !== undefined) {
                    putStr += ' ' + this.adj[i][j] + ' '
                }
            }
            console.log(putStr)
        }
    },
    // 深度优先搜索
    dfs:function (data) {
        // 找到起始顶点在邻接表数组中的位置
        var index = this.searchPos(data)
        // 将其设置为已访问
        this.vertex[index].visited = true
        console.log(this.vertex[index].data)

        // 遍历邻接表数组中存储的相邻顶点，递归搜索
        for (var i = 0; i < this.adj[index].length; i++) {
            var key = this.adj[index][i]
            if (!this.vertex[key].visited) {
                this.dfs(this.vertex[key].data)
            }
        }
    },
    // 广度优先搜索
    bfs:function (data) {
        // 一个队列
        var queue = []
        // 找到起始顶点在邻接表数组中的位置
        var index = this.searchPos(data)
        // 将起始顶点入队
        queue.push(index)

        // 遍历队列的过程就是在横向搜索
        while (queue.length > 0) {
            var i = queue.shift()
            this.vertex[i].visited = true
            console.log(this.vertex[i].data)

            for (var j = 0; j < this.adj[i].length; j++) {
                if (!this.vertex[this.adj[i][j]].visited) {
                    queue.push(this.adj[i][j])
                }
            }
        }
    },
    // 重置访问状态
    resetVisited:function(){
        for(var i=0;i<this.vertex.length;i++){
            this.vertex[i].visited=false;
        }
    }
}

// 测试用例
var vertex = [
    new Vert(0),
    new Vert(1),
    new Vert(2),
    new Vert(3),
    new Vert(4)
]

var g = new Graph(vertex)
g.addEdge(0, 1)
g.addEdge(0, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)
console.log('=====查看图=====');
g.showGraph()
console.log('=====深度优先搜索=====');
g.dfs(0)
g.resetVisited()
console.log('=====广度优先搜索=====');
g.bfs(0)
g.resetVisited()