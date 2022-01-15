// 明星
const idol = {
  name: 'XXX',
  ads: [] // 手中的代言广告
};

// 经纪人
const proxyAssistant = {
  name: '经纪人',
  // 新建一个idolAds代理对象
  idolAds: new Proxy(idol.ads, {
    set(target, p, value) {
      // 代言费10w+才接
      if (value.rewards && value.rewards > 100000) {
        target[p] = value;
      }
      return true;
    }
  }),
  // 接代言广告
  receiveAds: function (ad) {
    this.idolAds.push(ad);
  }
};

module.exports = {
  idol,
  proxyAssistant
};
