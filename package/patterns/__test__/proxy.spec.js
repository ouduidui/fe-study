describe('代理模式', () => {
  it('示例的代码实现', () => {
    const { idol, proxyAssistant } = require('../packages/proxy/idol');
    const ad1 = { rewards: 200000, name: '广告1' };
    const ad2 = { rewards: 10000, name: '广告2' };
    proxyAssistant.receiveAds(ad1);
    proxyAssistant.receiveAds(ad2);
    expect(idol.ads.includes(ad1)).toBe(true);
    expect(idol.ads.includes(ad2)).toBe(false);
  });

  it('示例的代码实现 - proxy', () => {
    const { idol, proxyAssistant } = require('../packages/proxy/idolByProxy');
    const ad1 = { rewards: 200000, name: '广告1' };
    const ad2 = { rewards: 10000, name: '广告2' };
    proxyAssistant.receiveAds(ad1);
    proxyAssistant.receiveAds(ad2);
    expect(idol.ads.includes(ad1)).toBe(true);
    expect(idol.ads.includes(ad2)).toBe(false);
  });
});
