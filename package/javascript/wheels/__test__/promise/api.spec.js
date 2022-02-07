const Promise = require('../../src/promise/api/index');
const { logger } = require('browser-sync/dist/logger');

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

  it('Promise all', (done) => {
    const p1 = new Promise((resolve) => {
      resolve(1);
    });
    const p2 = new Promise((resolve) => {
      resolve(2);
    });
    const p3 = new Promise((resolve) => {
      resolve(3);
    });
    const p4 = new Promise((resolve) => {
      resolve(4);
    });
    const promises = [p1, p2, p3, p4];
    Promise.all(promises).then((res) => {
      expect(res).toStrictEqual([1, 2, 3, 4]);
      done();
    });
  });

  it('Promise all reject', (done) => {
    const p1 = new Promise((resolve) => {
      resolve(1);
    });
    const p2 = new Promise((resolve, reject) => {
      reject(2);
    });
    const p3 = new Promise((resolve) => {
      resolve(3);
    });
    const p4 = new Promise((resolve) => {
      resolve(4);
    });
    const promises = [p1, p2, p3, p4];
    Promise.all(promises).catch((err) => {
      expect(err).toBe(2);
      done();
    });
  });

  it('Promise allSettled', (done) => {
    const p1 = new Promise((resolve) => {
      resolve(1);
    });
    const p2 = new Promise((resolve, reject) => {
      reject(2);
    });
    const p3 = new Promise((resolve) => {
      resolve(3);
    });
    const p4 = new Promise((resolve, reject) => {
      reject(4);
    });
    const promises = [p1, p2, p3, p4];
    Promise.allSettled(promises).then((res) => {
      expect(res).toStrictEqual([
        { status: 'fulfilled', value: 1 },
        { status: 'rejected', reason: 2 },
        { status: 'fulfilled', value: 3 },
        { status: 'rejected', reason: 4 }
      ]);
      done();
    });
  });

  it('Promise any', (done) => {
    const p1 = new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
      });
    });
    const p2 = new Promise((resolve, reject) => {
      reject(2);
    });
    const p3 = new Promise((resolve) => {
      resolve(3);
    });
    const p4 = new Promise((resolve) => {
      resolve(4);
    });
    const promises = [p1, p2, p3, p4];
    Promise.any(promises).then((res) => {
      expect(res).toBe(3);
      done();
    });
  });

  it('Promise race', (done) => {
    const p1 = new Promise((resolve, reject) => {
      reject(1);
    });
    const p2 = new Promise((resolve) => {
      resolve(2);
    });
    const promises = [p1, p2];
    Promise.race(promises).catch((err) => {
      expect(err).toBe(1);
      done();
    });
  });
});
