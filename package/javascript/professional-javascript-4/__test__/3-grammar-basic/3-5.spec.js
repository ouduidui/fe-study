describe('3.5 操作符', () => {
  describe('一元操作符', () => {
    describe('递增/递减操作符', () => {
      it('happy path', () => {
        let num = 100;
        num++;
        expect(num).toBe(101);
        num--;
        expect(num).toBe(100);
        ++num;
        expect(num).toBe(101);
        --num;
        expect(num).toBe(100);
      });

      it('前缀递增和递减的副作用：遍历的值都会在语句被求值之前改变', () => {
        let num = 10;
        expect(num++ * 2).toBe(20);
        num = 10;
        expect(++num * 2).toBe(22);
        num = 10;
        expect(num-- * 2).toBe(20);
        num = 10;
        expect(--num * 2).toBe(18);
      });

      it('适用所有类型', () => {
        let s1 = '2';
        expect(++s1).toBe(3);
        let s2 = 'a';
        expect(++s2).toBe(NaN);
        let b1 = true;
        expect(++b1).toBe(2);
        let b2 = false;
        expect(++b2).toBe(1);
        let f = 1.1;
        expect(++f).toBe(2.1);
        let o = {
          valueOf() {
            return -1;
          }
        };
        expect(++o).toBe(0);
      });
    });

    describe('一元加和减', () => {
      it('一元加', () => {
        let num = 10;
        num = +num;
        expect(num).toBe(10);

        // 如果将一元加应用到非数值，则会执行与使用Number()转型函数一样的类型操作

        let s1 = '01';
        s1 = +s1;
        expect(s1).toBe(1);

        let s2 = '1.1';
        s2 = +s2;
        expect(s2).toBe(1.1);

        let s3 = 'a';
        s3 = +s3;
        expect(s3).toBe(NaN);

        let b = false;
        b = +b;
        expect(b).toBe(0);

        let f = 1.1;
        f = +f;
        expect(f).toBe(1.1);

        let o = {
          valueOf() {
            return -1;
          }
        };
        o = +o;
        expect(o).toBe(-1);
      });

      it('一元减', () => {
        let num = 10;
        num = -num;
        expect(num).toBe(-10);

        let s1 = '01';
        s1 = -s1;
        expect(s1).toBe(-1);

        let s2 = '1.1';
        s2 = -s2;
        expect(s2).toBe(-1.1);

        let s3 = 'a';
        s3 = -s3;
        expect(s3).toBe(NaN);

        let b = false;
        b = -b;
        expect(b).toBe(-0);

        let f = 1.1;
        f = -f;
        expect(f).toBe(-1.1);

        let o = {
          valueOf() {
            return -1;
          }
        };
        o = -o;
        expect(o).toBe(1);
      });
    });
  });

  describe('位操作符', () => {
    it('按位非', () => {
      let num1 = 25; // 0000 0000 0000 0000 0000 0000 0001 1001
      let num2 = ~num1; // 1111 1111 1111 1111 1111 1111 1110 0110
      expect(num2).toBe(-26);
      // ~num === - num - 1
      expect(num2).toBe(-num1 - 1);
    });

    it('按位与', () => {
      let num1 = 25; // 0000 0000 0000 0000 0000 0000 0001 1001
      let num2 = 3; // 0000 0000 0000 0000 0000 0000 0000 0011
      let num3 = num1 & num2; // 0000 0000 0000 0000 0000 0000 0000 0001
      expect(num3).toBe(1);
    });

    it('按位或', () => {
      let num1 = 25; // 0000 0000 0000 0000 0000 0000 0001 1001
      let num2 = 3; // 0000 0000 0000 0000 0000 0000 0000 0011
      let num3 = num1 | num2; // 0000 0000 0000 0000 0000 0000 0001 1011
      expect(num3).toBe(27);
    });

    it('按位异或', () => {
      let num1 = 25; // 0000 0000 0000 0000 0000 0000 0001 1001
      let num2 = 3; // 0000 0000 0000 0000 0000 0000 0000 0011
      let num3 = num1 ^ num2; // 0000 0000 0000 0000 0000 0000 0001 1010
      expect(num3).toBe(26);
    });

    it('左移', () => {
      let num1 = 2; // 0000 0010
      let num2 = num1 << 5; // 0100 0000
      expect(num2).toBe(64);

      // 会保留符号位
      num1 = -2;
      num2 = num1 << 5;
      expect(num2).toBe(-64);
    });

    it('有符号右移', () => {
      let num1 = 64; // 0100 0000
      let num2 = num1 >> 5; // 0000 0010
      expect(num2).toBe(2);

      // 会保留符号位
      num1 = -64;
      num2 = num1 >> 5;
      expect(num2).toBe(-2);
    });

    it('无符号右移', () => {
      let num1 = 64; // 0100 0000
      let num2 = num1 >>> 5; // 0000 0010
      expect(num2).toBe(2);

      num1 = -64; // 1111 1111 1111 1111 1111 1111 1100 0000
      num2 = num1 >>> 5; // 0000 0111 1111 1111 1111 1111 1110
      expect(num2).toBe(134217726);
    });
  });

  describe('布尔操作符', () => {
    it('逻辑非', () => {
      expect(!false).toBe(true);
      expect(!'a').toBe(false);
      expect(!0).toBe(true);
      expect(!1).toBe(false);
      expect(!NaN).toBe(true);
      expect(!'').toBe(true);
      expect(!{}).toBe(false);
      expect(!null).toBe(true);

      expect(!!'a').toBe(true);
      expect(!!0).toBe(false);
      expect(!!1).toBe(true);
      expect(!!NaN).toBe(false);
      expect(!!'').toBe(false);
      expect(!!{}).toBe(true);
      expect(!!null).toBe(false);
    });

    it('逻辑与', () => {
      expect({ a: 1 } && 123).toBe(123);
      expect(true && { b: 2 }).toStrictEqual({ b: 2 });
      expect({ a: 1 } && { b: 2 }).toStrictEqual({ b: 2 });
      expect(null && 'abc').toBe(null);
      expect('abc' && null).toBe(null);
      expect(NaN && 'abc').toBe(NaN);
      expect('abc' && NaN).toBe(NaN);
      expect(undefined && 'abc').toBe(undefined);
      expect('abc' && undefined).toBe(undefined);

      // 短路操作符
      expect(false && testVar).toBe(false);
      expect(() => true && testVar).toThrowError(ReferenceError); // "testVar is not defined"
    });

    it('逻辑或', () => {
      expect({ a: 1 } || 'abc').toStrictEqual({ a: 1 });
      expect(false || 'abc').toBe('abc');
      expect({ a: 1 } || { b: 1 }).toStrictEqual({ a: 1 });
      expect(null || null).toBe(null);
      expect(NaN || NaN).toBe(NaN);
      expect(undefined || undefined).toBe(undefined);

      // 短路操作符
      expect(true || testVar).toBe(true);
      expect(() => false || testVar).toThrowError(ReferenceError); // "testVar is not defined"
    });
  });
});
