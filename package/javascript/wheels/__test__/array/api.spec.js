const Array = require('../../src/array/api');

describe('Array Methods', () => {
  it('forEach', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    arr._forEach(
      function (currentValue, index, array) {
        expect(this.a).toBe(1);
        expect(index).toBe(i);
        expect(currentValue).toBe(arr[i]);
        expect(array).toBe(arr);
        i++;
      },
      { a: 1 }
    );
  });

  it('map', () => {
    const arr = [1, 2, 3];
    let i = 0;
    expect(
      arr._map(
        function (currentValue, index, array) {
          expect(this.a).toBe(1);
          expect(index).toBe(i);
          expect(currentValue).toBe(arr[i]);
          expect(array).toBe(arr);
          i++;

          return currentValue * 2;
        },
        { a: 1 }
      )
    ).toEqual([2, 4, 6]);
  });

  it('filter', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    let i = 0;
    expect(
      arr._filter(
        function (currentValue, index, array) {
          expect(this.a).toBe(1);
          expect(index).toBe(i);
          expect(currentValue).toBe(arr[i]);
          expect(array).toBe(arr);
          i++;

          return currentValue > 2;
        },
        { a: 1 }
      )
    ).toEqual([3, 4, 5, 6]);
  });

  it('find', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(
      arr._find(
        function (currentValue, index, array) {
          expect(this.a).toBe(1);
          expect(index).toBe(i);
          expect(currentValue).toBe(arr[i]);
          expect(array).toBe(arr);
          i++;

          return currentValue === 'b';
        },
        { a: 1 }
      )
    ).toBe('b');
  });

  it('findIndex', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(
      arr._findIndex(
        function (currentValue, index, array) {
          expect(this.a).toBe(1);
          expect(index).toBe(i);
          expect(currentValue).toBe(arr[i]);
          expect(array).toBe(arr);
          i++;

          return currentValue === 'b';
        },
        { a: 1 }
      )
    ).toBe(1);
  });

  it('reduce', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    let i = 0;

    expect(
      arr._reduce(function (accumulator, currentValue, index, array) {
        expect(index).toBe(i);
        expect(currentValue).toBe(arr[i]);
        expect(array).toBe(arr);
        i++;

        return accumulator + currentValue;
      }, 0)
    ).toBe(21);

    const arr2 = ['a', 'b', 'c'];
    let j = 1;
    arr2._reduce((accumulator, currentValue, index) => {
      expect(index).toBe(j);
      expect(accumulator).toBe(arr2[j - 1]);
      expect(currentValue).toBe(arr2[j]);
      j++;
      return currentValue;
    });
  });

  it('every', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(
      arr._every(
        function (currentValue, index, array) {
          expect(this.a).toBe(1);
          expect(index).toBe(i);
          expect(currentValue).toBe(arr[i]);
          expect(array).toBe(arr);
          i++;

          return currentValue === 'b';
        },
        { a: 1 }
      )
    ).toBe(false);
  });

  it('some', () => {
    const arr = ['a', 'b', 'c'];
    let i = 0;

    expect(
      arr._some(
        function (currentValue, index, array) {
          expect(this.a).toBe(1);
          expect(index).toBe(i);
          expect(currentValue).toBe(arr[i]);
          expect(array).toBe(arr);
          i++;

          return currentValue === 'b';
        },
        { a: 1 }
      )
    ).toBe(true);
  });
});
