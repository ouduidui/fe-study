describe('时间切片', () => {
  it('简单版', (done) => {
    const timeSlicing = require('../../src/others/time-slicing/simple');
    timeSlicing(function* () {
      let times = 0;
      const start = performance.now();
      while (performance.now() - start < 1000) {
        times++;
        yield;
      }

      expect(true).toBe(true);
      console.log(`简单版在一秒运行了${times}次`);
      done();
    })();
  });

  it('增强版', (done) => {
    const timeSlicing = require('../../src/others/time-slicing/enhanced');
    timeSlicing(function* () {
      let times = 0;
      const start = performance.now();
      while (performance.now() - start < 1000) {
        times++;
        yield;
      }

      expect(true).toBe(true);
      console.log(`增强版在一秒运行了${times}次`);
      done();
    })();
  });
});
