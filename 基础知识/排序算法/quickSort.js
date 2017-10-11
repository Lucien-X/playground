//（1）在数据集之中，选择一个元素作为"基准"（base）。
//（2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
//（3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
function quickSort(array) {
    // 用slice这个纯函数来拷贝数组
    var tmp_array = array.slice(0),
        result,
        iterator = function(arr) {
            // 假如迭代器入参长度为1，直接返回　
            if (arr.length <= 1) { return arr; }　　
            var baseIndex = Math.floor(arr.length / 2);
            // 使用splice，取出基准元素
            var base = arr.splice(baseIndex, 1)[0];　　
            var left = [];　　
            var right = [];　　
            for (var i = 0; i < arr.length; i++) {　　　　
                if (arr[i] < base) {　　　　　　
                    left.push(arr[i]);　　　　
                } else {　　　　　　
                    right.push(arr[i]);　　　　
                }　　
            }　　
            return iterator(left).concat([base], iterator(right));
        };
    result = iterator(tmp_array);
    return result;
}

// 测试用例
var array = [0, 1, 2, 44, 4, 324, 5, 65, 6, 6, 34, 4, 5, 6, 2, 43, 5, 6, 62, 43, 5, 1, 4, 51, 56, 76, 7, 7, 2, 1, 45, 4, 6, 7];
quickSort(array);