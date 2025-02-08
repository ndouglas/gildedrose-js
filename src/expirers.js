const { makeFactory } = require('./make_factory');
const { types } = require('./types');

exports.expirers = makeFactory();

class Expirer {
  update(item) {
    item.quality = Math.max(item.quality - 1, 0);
  }
}
exports.expirers.default = new Expirer();

class AgedBrieExpirer extends Expirer {
  update(item) {
    item.quality = Math.min(item.quality + 1, 50);
  }
}
exports.expirers[types.agedBrie] = new AgedBrieExpirer();

class SulfurasExpirer extends Expirer {
  update(item) { }
}
exports.expirers[types.sulfuras] = new SulfurasExpirer();

class BackstagePassesExpirer extends Expirer {
  update(item) {
    item.quality = 0;
  }
}
exports.expirers[types.backstagePasses] = new BackstagePassesExpirer();
