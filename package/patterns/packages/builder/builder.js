// 建造者，部件生产
class ProductBuilder {
  constructor(params) {
    this.params = params;
  }

  // 生成部件 part 1
  buildPart1() {
    this.part1 = 'part1';
    return this;
  }

  // 生成部件 part 1
  buildPart2() {
    this.part2 = 'part2';
    return this;
  }
}

// 指挥者，负责最终产品的装配
class Director {
  constructor(params) {
    const _product = new ProductBuilder(params)
      .buildPart1()
      .buildPart2();
    return _product;
  }
}

module.exports = Director;
