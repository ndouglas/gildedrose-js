const { types } = require('./types');
const { qualityUpdaters } = require('./quality_updaters');
const { sellInUpdaters } = require('./sell_in_updaters');
const { expirers } = require('./expirers');

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {

  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item) => {
      qualityUpdaters.get(item.name).update(item);
      sellInUpdaters.get(item.name).update(item);
      if (item.sellIn < 0) {
        expirers.get(item.name).update(item);
      }
    });
  }

}

module.exports = {
  Item,
  Shop,
  types,
}
