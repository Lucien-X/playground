// 冒泡排序 每次将最小元素推至最前
function bubbleSort(array) {
  var len = array.length,
  i, j, tmp, result;
  result = array.slice(0);
  for (i = 0; i < len; i++) {
    for (j = len - 1; j > i; j--) {
      if (result[j] < result[j - 1]) {
        tmp = result[j - 1];
        result[j - 1] = result[j];
        result[j] = tmp;
      }
    }
  }
  return result;
}

// 测试用例
var array = [0,1,2,44,4,324,5,65,6,6,34,4,5,6,2,43,5,6,62,43,5,1,4,51,56,76,7,7,2,1,45,4,6,7];
bubbleSort(array);
