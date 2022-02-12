/**
 * 冒泡排序
 * @param array {number[]}
 * @return {number[]}
 */
function bubbleSort(array) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  return array;
}

/**
 * 选择排序
 * @param array {number[]}
 * @return {number[]}
 */
function selectionSort(array) {
  const len = array.length;
  let minIndex = 0;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      // 寻找最小的值
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    [array[i], array[minIndex]] = [array[minIndex], array[i]];
  }

  return array;
}

/**
 * 插入排序
 * @param array {number[]}
 * @return {number[]}
 */
function insertionSort(array) {
  const len = array.length;
  for (let i = 1; i < len; i++) {
    const curValue = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > curValue) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = curValue;
  }

  return array;
}

/**
 * 快速排序
 * @param array {number[]}
 * @return {number[]}
 */
function quickSort(array) {
  const len = array.length;

  if (len <= 1) return array;

  const midIndex = len >> 1;
  // 将该中间值提出出来并删除
  const midValue = array.splice(midIndex, 1)[0];
  const leftArray = [];
  const rightArray = [];

  let index = 0;
  while (index < len - 1) {
    const curValue = array[index];
    if (curValue < midValue) {
      leftArray.push(curValue);
    } else {
      rightArray.push(curValue);
    }
    index++;
  }

  return [...quickSort(leftArray), midValue, ...quickSort(rightArray)];
}

/**
 * 堆排序
 * @param array {number[]}
 * @return {number[]}
 */
function heapSort(array) {
  let heapSize = array.length;
  for (let i = (heapSize >> 1) - 1; i >= 0; i--) {
    heapify(array, i, heapSize);
  }

  // 堆排序
  for (let i = heapSize - 1; i >= 1; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, 0, --heapSize);
  }

  return array;

  function heapify(array, x, len) {
    let left = 2 * x + 1;
    let right = 2 * x + 2;
    let largest = x;
    if (left < len && array[left] > array[largest]) {
      largest = left;
    }
    if (right < len && array[right] > array[largest]) {
      largest = right;
    }
    if (largest !== x) {
      [array[x], array[largest]] = [array[largest], array[x]];
      heapify(array, largest, len);
    }
  }
}

/**
 * 基数排序
 * @param array {number[]}
 * @return {number[]}
 */
function radixSort(array) {
  if (Math.min(...array) >= 0) {
    return _radixSort(array);
  } else {
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

  function _radixSort(array) {
    // 取最大值 最大值的位数就是要循环遍历的次数
    const max = Math.max(...array);

    // 定义一个桶
    const buckets = [];

    // 定义当前要遍历的位数 个位 十位 百位...
    let m = 1;
    while (m < max) {
      // m < 最大值
      // 下方m要 m*=10 -> 每次遍历增加一位
      // 保证遍历完所有可能的位数

      // 放入桶
      array.forEach((number) => {
        // digit表示某位数的值
        const digit = ~~((number % (m * 10)) / m);

        // 把该位数的值放到桶buckets中
        // 通过索引确定顺序 类比计数排序
        if (!buckets[digit]) {
          buckets[digit] = [];
        }
        buckets[digit].push(number);
      });

      // 从桶buckets中取值
      // 完成此步后 就完成了一次位数排序
      let ind = 0;
      buckets.forEach((bucket) => {
        while (bucket.length > 0) {
          // shift从头部取值
          // 保证按照队列先入先出
          array[ind++] = bucket.shift();
        }
      });

      // 每次最外层while循环后m要乘等10
      // 也就是要判断下一位 比如当前是个位 下次就要判断十位
      m *= 10;
    }

    return array;
  }
}

/**
 * 基数排序
 * @param array {number[]}
 * @return {number[]}
 */
function shellSort(array) {
  const len = array.length;
  let gap = 1;
  while (gap < len / 5) {
    gap = gap * 5 + 1;
  }

  for (; gap > 0; gap = Math.floor(gap / 5)) {
    for (let i = gap; i < len; i++) {
      const temp = array[i];
      let j;
      for (j = i - gap; j >= 0 && array[j] > temp; j -= gap) {
        array[j + gap] = array[j];
      }
      array[j + gap] = temp;
    }
  }

  return array;
}

module.exports = {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  heapSort,
  radixSort,
  shellSort
};
