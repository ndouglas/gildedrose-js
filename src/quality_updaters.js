const { makeFactory } = require('./make_factory');
const { types } = require('./types');

exports.qualityUpdaters = makeFactory();

class QualityUpdater {
  update(item) {
    item.quality = Math.max(item.quality - 1, 0);
  }
}
exports.qualityUpdaters.default = new QualityUpdater();

class AgedBrieQualityUpdater extends QualityUpdater {
  update(item) {
    item.quality = Math.min(item.quality + 1, 50);
  }
}
exports.qualityUpdaters[types.agedBrie] = new AgedBrieQualityUpdater();

class BackstagePassesQualityUpdater extends QualityUpdater {
  update(item) {
    item.quality = Math.min(item.quality + 1, 50);
    if (item.sellIn < 11) {
      item.quality = Math.min(item.quality + 1, 50);
      if (item.sellIn < 6) {
        item.quality = Math.min(item.quality + 1, 50);
      }
    }
  }
}
exports.qualityUpdaters[types.backstagePasses] = new BackstagePassesQualityUpdater();

class SulfurasQualityUpdater extends QualityUpdater {
  update(item) { }
}
exports.qualityUpdaters[types.sulfuras] = new SulfurasQualityUpdater();

class ConjuredQualityUpdater extends QualityUpdater {
  update(item) {
    super.update(item);
    super.update(item);
  }
}
exports.qualityUpdaters[types.conjured] = new ConjuredQualityUpdater();
