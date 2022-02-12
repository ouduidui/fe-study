const promisify = require('../../src/promise/promisify/index');
const fs = require('fs');
const path = require('path');

describe('promisify', () => {
  const readFile = promisify(fs.readFile);
  it('happy path', (done) => {
    const p = path.resolve(__dirname, './data.json');
    readFile(p).then((data) => {
      expect(data.toString()).toBe(fs.readFileSync(p).toString());
      done();
    });
  });

  it('throw err', (done) => {
    readFile(path.resolve(__dirname, './data1.json')).catch((err) => {
      expect(err.code).toBe('ENOENT');
      done();
    });
  });
});
