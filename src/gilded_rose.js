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
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.qualityUpdaterFor(item).update(item);
      this.sellInUpdaterFor(item).update(item);
      if (item.sellIn < 0) {
        this.expirerFor(item).update(item);
      }
    }
  }

  qualityUpdaterFor(item) {
    return QualityUpdater.for(item);
  }

  sellInUpdaterFor(item) {
    return SellInUpdater.for(item);
  }

  expirerFor(item) {
    return Expirer.for(item);
  }

}

class QualityUpdater {
  static for(item) {
    return new QualityUpdater();
  }

  constructor() {
  }

  update(item) {
    if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.quality > 0) {
        if (item.name != 'Sulfuras, Hand of Ragnaros') {
          item.quality = item.quality - 1;
        }
      }
    } else {
      if (item.quality < 50) {
        item.quality = item.quality + 1;
        if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality < 50) {
            if (item.sellIn < 11) {
              item.quality = item.quality + 1;
            }
            if (item.sellIn < 6) {
              item.quality = item.quality + 1;
            }
          }
        }
      }
    }
  }
}

class SellInUpdater {

  static for(item) {
    switch (item.name) {
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasSellInUpdater();
      default:
        return new SellInUpdater();
    }
  }

  update(item) {
    item.sellIn = item.sellIn - 1;
  }

}

class SulfurasSellInUpdater extends SellInUpdater {
  update(item) { }

}

class Expirer {
  static for(item) {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrieExpirer();
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasExpirer();
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassesExpirer();
      default:
        return new Expirer();
    }
  }

  update(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
}

class AgedBrieExpirer extends Expirer {
  update(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}

class SulfurasExpirer extends Expirer {
  update(item) { }
}

class BackstagePassesExpirer extends Expirer {
  update(item) {
    item.quality = item.quality - item.quality;
  }
}

module.exports = {
  Item,
  Shop
}
