const {
  bubbleSort,
  selectionSort,
  insertionSort,
  quickSort,
  heapSort,
  radixSort,
  shellSort
} = require('../../src/others/sort-algorithm');

describe('七大排序方式', () => {
  const arr = [21, -123, -54, 242, 251, 66, -4, 41, 0, -143, 503, -23, 12];
  const expected = [-143, -123, -54, -23, -4, 0, 12, 21, 41, 66, 242, 251, 503];

  it('冒泡排序', () => {
    expect(bubbleSort([...arr])).toStrictEqual(expected);
  });

  it('选择排序', () => {
    expect(selectionSort([...arr])).toStrictEqual(expected);
  });

  it('插入排序', () => {
    expect(insertionSort([...arr])).toStrictEqual(expected);
  });

  it('快速排序', () => {
    expect(quickSort([...arr])).toStrictEqual(expected);
  });

  it('堆排序', () => {
    expect(heapSort([...arr])).toStrictEqual(expected);
  });

  it('基数排序', () => {
    expect(radixSort([...arr])).toStrictEqual(expected);
  });

  it('希尔排序', () => {
    expect(shellSort([...arr])).toStrictEqual(expected);
  });
});
