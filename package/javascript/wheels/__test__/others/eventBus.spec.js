const EventBus = require('../../src/others/event-bus');

describe('事件总线', () => {
  it('on', () => {
    const eventBus = new EventBus();
    const fn = () => {};
    eventBus.on('test', fn);
    expect(eventBus.cache['test'][0]).toBe(fn);
    expect(eventBus.cache['test'].length).toBe(1);

    const fn2 = () => {};
    eventBus.on('test', fn2);
    expect(eventBus.cache['test'][1]).toBe(fn2);
    expect(eventBus.cache['test'].length).toBe(2);
  });

  it('off', () => {
    const eventBus = new EventBus();
    const fn = () => {};
    const fn2 = () => {};
    eventBus.on('test', fn);
    eventBus.on('test', fn2);

    eventBus.off('test', fn);
    expect(eventBus.cache['test'].length).toBe(1);
    expect(eventBus.cache['test'][0]).toBe(fn2);
  });

  it('emit', () => {
    const eventBus = new EventBus();
    const fn = jest.fn((msg) => {
      expect(msg).toBe('HelloWorld');
    });
    eventBus.on('test', fn);
    expect(fn).not.toHaveBeenCalled();
    eventBus.emit('test', 'HelloWorld');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('once', () => {
    const eventBus = new EventBus();
    const fn = jest.fn();
    eventBus.once('test', fn);
    expect(fn).not.toHaveBeenCalled();
    eventBus.emit('test');
    expect(fn).toHaveBeenCalledTimes(1);
    expect(eventBus.cache['test'].length).toBe(0);
  });
});
