const { makeFactory } = require('./make_factory');
const { types } = require('./types');

exports.sellInUpdaters = makeFactory();

class SellInUpdater {
  update(item) {
    item.sellIn = item.sellIn - 1;
  }
}
exports.sellInUpdaters.default = new SellInUpdater();

class SulfurasSellInUpdater extends SellInUpdater {
  update(item) { }
}
exports.sellInUpdaters[types.sulfuras] = new SulfurasSellInUpdater();
