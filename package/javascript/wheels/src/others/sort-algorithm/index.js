/**
 * 冒泡排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(N²) 空间复杂度：O(1) 排序方式：in-place
 * @param array {number[]}
 * @return {number[]}
 */
function bubbleSort(array) {
  const len = array.length;
  let i = 0;
  // 循环 len 次
  while (i < len) {
    // 每次结尾都少遍历一个
    const lastIndex = len - 1 - i++;
    for (let j = 0; j < lastIndex; j++) {
      // 当前元素与下一个元素做比较，如果大于的话调换顺序
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}

/**
 * 选择排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(N²) 空间复杂度：O(1) 排序方式：in-place
 * @param array {number[]}
 * @return {number[]}
 */
function selectionSort(array) {
  const len = array.length;
  for (let i = 0; i < len - 1; i++) {
    let minIndex = i; // 初始化最小值下标
    for (let j = i + 1; j < len; j++) {
      // 寻找最小的值
      if (array[j] < array[minIndex]) minIndex = j;
    }
    // 调换顺序
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }

  return array;
}

/**
 * 插入排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(N²) 空间复杂度：O(1) 排序方式：in-place
 * @param array {number[]}
 * @return {number[]}
 */
function insertionSort(array) {
  const len = array.length;
  // 从第二个开始遍历
  for (let i = 1; i < len; i++) {
    // 获取当前值
    const curValue = array[i];
    let j = i - 1;
    // 遍历 i 之前的元素，如果大于curValue，则直接往后挪一位
    while (j >= 0 && array[j] > curValue) {
      array[j + 1] = array[j];
      j--;
    }
    // 插入 curValue
    array[j + 1] = curValue;
  }
  return array;
}

/**
 * 快速排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(NlogN) 空间复杂度：O(logN) 排序方式：in-place
 * @param array {number[]}
 * @return {number[]}
 */
function quickSort(array) {
  return _quickSort(array, 0, array.length - 1);

  /**
   * 快速排序
   * @param array {number[]}
   * @param left {number}
   * @param right {number}
   * @return {number[]}
   * @private
   */
  function _quickSort(array, left, right) {
    if (left < right) {
      // 进行分区，获取基准点
      const partitionIndex = partition(array, left, right);
      // 以基准值为中心，左右各种再递归调用快速排序
      _quickSort(array, left, partitionIndex - 1);
      _quickSort(array, partitionIndex + 1, right);
    }

    return array;
  }

  /**
   * 分区操作
   * @param array {number[]}
   * @param left {number}
   * @param right {number}
   * @return {number}
   */
  function partition(array, left, right) {
    const pivot = left; // 基准
    let idx = pivot + 1; // 定位到等于array[pivot]的下标
    // 将小于基准值的与array[idx]调换顺序
    for (let i = idx; i <= right; i++) {
      if (array[i] < array[pivot]) {
        [array[i], array[idx]] = [array[idx], array[i]];
        idx++;
      }
    }
    // 调换array[pivot]至array[idx - 1]处
    // 形成小于基准值的在基准值的左边，大于基准值的在基准值的右边
    [array[pivot], array[idx - 1]] = [array[idx - 1], array[pivot]];
    return idx - 1;
  }
}

/**
 * 归并排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(NlogN) 空间复杂度：O(N) 排序方式：out-place
 * @param array {number[]}
 * @return {number[]}
 */
function mergeSort(array) {
  const len = array.length;
  if (len < 2) {
    return array;
  }

  // 获取中间下标
  const middle = len >> 1;
  // 根据middle差分为左右数组
  const left = array.slice(0, middle);
  const right = array.slice(middle);
  return merge(mergeSort(left), mergeSort(right));

  /**
   * 合并操作
   * @param left {number[]}
   * @param right {number[]}
   * @return {number[]}
   */
  function merge(left, right) {
    const result = [];

    // 遍历两个数组，一一比较，谁小进入result数组
    while (left.length && right.length) {
      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    // 处于剩余元素
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());

    return result;
  }
}

/**
 * 堆排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(NlogN) 空间复杂度：O(1) 排序方式：in-place
 * @param array {number[]}
 * @return {number[]}
 */
function heapSort(array) {
  let heapSize = array.length;
  // 建立大顶堆
  // 确保每个节点大于两个子节点
  for (let i = heapSize >> 1 /* 中间值 */; i >= 0; i--) {
    heapify(array, i, heapSize);
  }

  for (let i = heapSize - 1; i >= 1; i--) {
    // 把堆首（最大值）和堆尾互换
    [array[0], array[i]] = [array[i], array[0]];
    // 重新排序堆
    heapify(array, 0, --heapSize);
  }

  return array;

  /**
   * 堆调整
   * @param array {number[]}
   * @param x {number}
   * @param len {number}
   */
  function heapify(array, x, len) {
    let left = 2 * x + 1; // 左节点下标
    let right = 2 * x + 2; // 右节点下标
    let largest = x; // 最大值下标

    // 如果左节点的值大于largest的值，更新largest
    if (left < len && array[left] > array[largest]) {
      largest = left;
    }
    // 如果右节点的值大于largest的值，更新largest
    if (right < len && array[right] > array[largest]) {
      largest = right;
    }

    // 如果largest不是x，则将其与x调换顺序
    if (largest !== x) {
      [array[x], array[largest]] = [array[largest], array[x]];
      // 以largest为中心继续堆调整
      heapify(array, largest, len);
    }
  }
}

/**
 * 希尔排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(Nlog²N) 空间复杂度：O(1) 排序方式：in-place
 * @param array {number[]}
 * @return {number[]}
 */
function shellSort(array) {
  // 以 N/2 作为步长
  let gap = array.length >> 1;
  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      // 执行插入排序
      let temp = array[i];
      let j;
      // 以gap为间隔遍历
      for (j = i - gap; j >= 0 && array[j] > temp; j -= gap) {
        array[j + gap] = array[j];
      }
      array[j + gap] = temp;
    }

    // 继续 N/2 更新步长
    gap >>= 1;
  }

  return array;
}

/**
 * 计数排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(N + K) 空间复杂度：O(N + K) 排序方式：out-place
 * @param array {number[]}
 * @return {number[]}
 */
function countingSort(array) {
  // 没有负数的情况
  if (Math.min(...array) >= 0) {
    return _countingSort(array);
  }
  // 有负数的情况
  else {
    let pArr = [];
    let nArr = [];
    for (let i = 0; i < array.length; i++) {
      array[i] >= 0 ? pArr.push(array[i]) : nArr.push(-1 * array[i]);
    }

    return [
      ..._countingSort(nArr).reduce((acc, cur) => {
        acc.unshift(-1 * cur);
        return acc;
      }, []),
      ..._countingSort(pArr)
    ];
  }

  /**
   * 计数排序核心代码
   * @param array {number[]}
   * @return {number[]}
   * @private
   */
  function _countingSort(array) {
    // 获取最大值
    const maxValue = Math.max(...array);
    const bucketLen = maxValue + 1;
    // 生成 maxValue + 1 长度的数组
    const bucket = new Array(bucketLen).fill(0);
    const arrLen = array.length;

    // 以数值为下标，计算出每个数值出现的次数
    for (let i = 0; i < arrLen; i++) {
      bucket[array[i]]++;
    }

    let sortedIndex = 0;
    // 进行遍历排序
    for (let j = 0; j < bucketLen; j++) {
      while (bucket[j] > 0) {
        array[sortedIndex++] = j;
        bucket[j]--;
      }
    }

    return array;
  }
}

/**
 * 桶排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(N + K) 空间复杂度：O(N + K) 排序方式：out-place
 * @param array {number[]}
 * @param [bucketSize]{number}
 * @return {number[]}
 */
function bucketSort(array, bucketSize = 5 /* 桶的默认容量为 5 */) {
  if (array.length === 0) {
    return array;
  }

  let i;
  let minValue = array[0];
  let maxValue = array[0];
  // 一次遍历获取数组中的最小值和最大值
  for (i = 1; i < array.length; i++) {
    if (array[i] < minValue) {
      minValue = array[i]; // 输入数据的最小值
    } else if (array[i] > maxValue) {
      maxValue = array[i]; // 输入数据的最大值
    }
  }

  // 桶的数量
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  /**
   * 桶
   * @type {number[][]}
   */
  const buckets = new Array(bucketCount).fill(0).map(() => []);

  // 利用映射函数将数据分配到各个桶中
  for (i = 0; i < array.length; i++) {
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]);
  }

  // 清空原数组
  array.length = 0;

  // 对每个桶进行排序
  for (i = 0; i < buckets.length; i++) {
    // 使用了插入排序对每个桶进行排序
    insertionSort(buckets[i]);
    // 将桶里排序后的数据放入数组
    array.push(...buckets[i]);
  }

  return array;
}

/**
 * 基数排序
 * @author 欧怼怼
 * @desc 时间复杂度：O(NK) 空间复杂度：O(N + K) 排序方式：out-place
 * @param array {number[]}
 * @return {number[]}
 */
function radixSort(array) {
  // 没有负数的情况
  if (Math.min(...array) >= 0) {
    return _radixSort(array);
  }
  // 有负数的情况
  else {
    let pArr = [];
    let nArr = [];
    for (let i = 0; i < array.length; i++) {
      array[i] >= 0 ? pArr.push(array[i]) : nArr.push(-1 * array[i]);
    }

    return [
      ..._radixSort(nArr).reduce((acc, cur) => {
        acc.unshift(-1 * cur);
        return acc;
      }, []),
      ..._radixSort(pArr)
    ];
  }

  /**
   * 基数排序核心代码
   * @param array {number[]}
   * @return {number[]}
   * @private
   */
  function _radixSort(array) {
    // 找到最大值，为了得知数组中最大位数
    const maxValue = Math.max(...array);

    // 定义当前要遍历的位数
    let m = 1;

    // 初始化一个桶
    const buckets = [];

    // 保证遍历完所有可能的位数
    while (m < maxValue) {
      // 清空桶
      buckets.length = 0;

      // 放入桶
      for (const number of array) {
        // digit表示number的某位数的值
        const digit = ~~((number % (m * 10)) / m);
        // 把该位数的值放到桶buckets中
        !buckets[digit] ? (buckets[digit] = [number]) : buckets[digit].push(number);
      }

      // 从桶buckets中取值，完成了一次位数排序
      array.length = 0;
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i]) array.push(...buckets[i]);
      }

      // 每次最外层while循环后m要乘等10，也就是要判断下一位 比如当前是个位 下次就要判断十位
      m *= 10;
    }

    return array;
  }
}

module.exports = {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  heapSort,
  radixSort,
  shellSort,
  mergeSort,
  countingSort,
  bucketSort
};
