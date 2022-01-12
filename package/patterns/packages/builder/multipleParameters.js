class CarBuilder1 {
  constructor(engine, weight, height, color, tyre, name, type) {
    this.engine = engine
    this.weight = weight
    this.height = height
    this.color = color
    this.tyre = tyre
    this.name = name
    this.type = type
  }
}


class CarBuilder2 {
  constructor(engine, weight, height, color, tyre, name, type) {
    this.engine = engine
    this.weight = weight
    this.height = height
    this.color = color
    this.tyre = tyre
    this.name = name
    this.type = type
  }

  // 设置属性
  setCarProperty(key, value) {
    if (Object.getOwnPropertyNames(this).includes(key)) {
      this[key] = value
      return this
    }
    throw new Error(`Key error : ${key} 不是本实例上的属性`)
  }
}

class CarBuilder3 {
  constructor(engine, weight, height, color, tyre, name, type) {
    this.engine = engine
    this.weight = weight
    this.height = height
    this.color = color
    this.tyre = tyre
    this.name = name
    this.type = type

    this.setPropertyFuncChain();
  }

  // 将每个属性的操作都生成一个方法
  setPropertyFuncChain() {
    Object.getOwnPropertyNames(this)
      .forEach(key => {
        // 生成方法名
        const funcName = 'set' + key.replace(/^\w/g, str => str.toUpperCase())
        // 生成设置函数
        this[funcName] = value => {
          this[key] = value
          return this
        }
      })
    return this
  }
}

module.exports = {
  CarBuilder1, CarBuilder2, CarBuilder3
}
