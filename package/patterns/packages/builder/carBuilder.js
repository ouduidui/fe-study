// 建造者，汽车部件厂家，提供具体零部件的生产
function CarBuilder({ color = 'white', weight = 0 }) {
  this.color = color;
  this.weight = weight;
}

// 生产部件：轮胎
CarBuilder.prototype.buildTyre = function (type) {
  switch (type) {
    case 'small':
      this.tyreType = '小号轮胎';
      break;
    case 'normal':
      this.tyreType = '中号轮胎';
      break;
    case 'big':
      this.tyreType = '大号轮胎';
      break;
  }
};

// 生产部件：发动机
CarBuilder.prototype.buildEngine = function (type) {
  switch (type) {
    case 'small':
      this.engineType = '小马力发动机';
      break;
    case 'normal':
      this.engineType = '中马力发动机';
      break;
    case 'big':
      this.engineType = '大马力发动机';
      break;
  }
};

// 奔驰厂家，负责最终汽车产品的装配
function benzDirector(tyre, engine, params) {
  const _car = new CarBuilder(params);
  _car.buildTyre(tyre);
  _car.buildEngine(engine);

  return _car;
}

module.exports = benzDirector;
