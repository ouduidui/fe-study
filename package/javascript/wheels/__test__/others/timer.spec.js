const timer = require('../../src/others/timer/index');

it('timer', (done) => {
  let i = 0;
  timer.addTimer(
    'test',
    () => {
      i++;
      if (i === 3) {
        timer.clearTimer('test');
        verify();
      }
    },
    100
  );

  function verify() {
    setTimeout(() => {
      expect(i).toBe(3);
      done();
    }, 1000);
  }
});
