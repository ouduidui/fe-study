const Promise = require('../../src/promise/api/index');

describe('Promise实现', () => {
  it('resolve then', (done) => {
    new Promise((resolve) => {
      resolve('hello world');
    }).then((res) => {
      expect(res).toBe('hello world');
      done();
    });
  });

  it('reject then', (done) => {
    new Promise((resolve, reject) => {
      reject('hello world');
    }).then(
      () => {},
      (err) => {
        expect(err).toBe('hello world');
        done();
      }
    );
  });

  it('then return a promise', () => {
    const p = new Promise(() => {}).then();
    expect(p instanceof Promise).toBe(true);
  });

  it('resolve then asynchronous', (done) => {
    new Promise((resolve) => {
      setTimeout(() => resolve('hello world'), 500);
    }).then((res) => {
      expect(res).toBe('hello world');
      done();
    });
  });

  it('reject then asynchronous', (done) => {
    new Promise((resolve, reject) => {
      setTimeout(() => reject('hello world'), 500);
    }).then(
      () => {},
      (err) => {
        expect(err).toBe('hello world');
        done();
      }
    );
  });

  it('chain call then', (done) => {
    new Promise((resolve) => {
      resolve(1);
    })
      .then((res) => {
        expect(res).toBe(1);
        return 2;
      })
      .then((res) => {
        expect(res).toBe(2);
        return new Promise((resolve) => {
          setTimeout(() => resolve(3), 500);
        });
      })
      .then((res) => {
        expect(res).toBe(3);
        done();
      });
  });

  it('catch', (done) => {
    new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('hello world');
      }, 500);
    }).catch((err) => {
      expect(err).toBe('hello world');
      done();
    });
  });

  it('Promise.resolve', (done) => {
    Promise.resolve(1).then((res) => {
      expect(res).toBe(1);
      done();
    });
  });

  it('Promise.reject', (done) => {
    Promise.reject(1).catch((err) => {
      expect(err).toBe(1);
      done();
    });
  });

  it('finally resolve', (done) => {
    new Promise((resolve) => {
      setTimeout(() => resolve(1));
    })
      .then((res) => {
        expect(res).toBe(1);
      })
      .catch(() => {})
      .finally(() => {
        expect(true).toBe(true);
        done();
      });
  });

  it('finally reject', (done) => {
    new Promise((resolve, reject) => {
      setTimeout(() => reject(1));
    })
      .then(() => {})
      .catch((err) => {
        expect(err).toBe(1);
      })
      .finally(() => {
        expect(true).toBe(true);
        done();
      });
  });
});
