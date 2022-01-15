// 明星
const idol = {
  name: 'XXX',
  ads: [] // 手中的代言广告
};

// 经纪人
const proxyAssistant = {
  name: '经纪人',
  // 接代言广告
  receiveAds: function (ad) {
    if (ad.rewards > 100000) {
      // 代言费10w+才接
      idol.ads.push(ad);
    }
  }
};

module.exports = {
  idol,
  proxyAssistant
};
