class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const types = {
  agedBrie: 'Aged Brie',
  backstagePasses: 'Backstage passes to a TAFKAL80ETC concert',
  sulfuras: 'Sulfuras, Hand of Ragnaros',
  conjured: 'Conjured Mana Cake',
};

const makeFactory = () => {
  const result = {};
  result.get = (itemName) => result[itemName] || result.default;
  return result;
};

const qualityUpdaters = makeFactory();

const sellInUpdaters = makeFactory();

const expirers = makeFactory();

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

class QualityUpdater {
  update(item) {
    item.quality = Math.max(item.quality - 1, 0);
  }
}
qualityUpdaters.default = new QualityUpdater();

class AgedBrieQualityUpdater extends QualityUpdater {
  update(item) {
    item.quality = Math.min(item.quality + 1, 50);
  }
}
qualityUpdaters[types.agedBrie] = new AgedBrieQualityUpdater();

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
qualityUpdaters[types.backstagePasses] = new BackstagePassesQualityUpdater();

class SulfurasQualityUpdater extends QualityUpdater {
  update(item) { }
}
qualityUpdaters[types.sulfuras] = new SulfurasQualityUpdater();

class ConjuredQualityUpdater extends QualityUpdater {
  update(item) {
    super.update(item);
    super.update(item);
  }
}
qualityUpdaters[types.conjured] = new ConjuredQualityUpdater();

class SellInUpdater {
  update(item) {
    item.sellIn = item.sellIn - 1;
  }
}
sellInUpdaters.default = new SellInUpdater();

class SulfurasSellInUpdater extends SellInUpdater {
  update(item) { }
}
sellInUpdaters[types.sulfuras] = new SulfurasSellInUpdater();

class Expirer {
  update(item) {
    item.quality = Math.max(item.quality - 1, 0);
  }
}
expirers.default = new Expirer();

class AgedBrieExpirer extends Expirer {
  update(item) {
    item.quality = Math.min(item.quality + 1, 50);
  }
}
expirers[types.agedBrie] = new AgedBrieExpirer();

class SulfurasExpirer extends Expirer {
  update(item) { }
}
expirers[types.sulfuras] = new SulfurasExpirer();

class BackstagePassesExpirer extends Expirer {
  update(item) {
    item.quality = 0;
  }
}
expirers[types.backstagePasses] = new BackstagePassesExpirer();

module.exports = {
  Item,
  Shop,
}
