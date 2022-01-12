const eventBus = {
  callBacks: {},
  on(name, cb) {
    if (!this.callBacks[name]) {
      this.callBacks[name] = [];
    }

    this.callBacks[name].push(cb);
  },

  emit(name, args) {
    if (this.callBacks[name]) {
      this.callBacks[name].forEach((cb) => cb(args));
    }
  }
};

export default eventBus;
