const Array = require('../../src/array/api');

describe('Array Methods', () => {
  it('forEach', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    arr._forEach((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;
    });
  })

  it('map', () => {
    const arr = [1, 2, 3];
    let i = 0;
    expect(arr._map((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return currentValue * 2;
    })).toEqual([2, 4, 6]);
  })

  it('filter', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    let i = 0;
    expect(arr._filter((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return currentValue > 2;
    })).toEqual([3, 4, 5, 6])
  })

  it('find', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(arr._find((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return currentValue === 'b';
    })).toBe('b');
  })

  it('findIndex', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(arr._findIndex((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return currentValue === 'b';
    })).toBe(1);
  })

  it('reduce', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    let i = 0;

    expect(arr._reduce((accumulator, currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return accumulator + currentValue;
    }, 0)).toBe(21)
  })

  it('every', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(arr._every((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return currentValue === 'b'
    })).toBe(false)
  })

  it('some', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(arr._some((currentValue, index, array) => {
      expect(index).toBe(i);
      expect(currentValue).toBe(arr[i]);
      expect(array).toBe(arr);
      i++;

      return currentValue === 'b'
    })).toBe(true)
  })
})
