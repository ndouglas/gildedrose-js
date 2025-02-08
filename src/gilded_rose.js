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
    this.qualityUpdater = new QualityUpdater();
    this.sellInUpdater = new SellInUpdater();
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      this.qualityUpdater.update(item);
      this.sellInUpdater.update(item);
      this.sellInUpdater.didUpdate(item);
    }
  }

}

class QualityUpdater {
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
  constructor() {
  }

  update(item) {
    if (item.name != 'Sulfuras, Hand of Ragnaros') {
      item.sellIn = item.sellIn - 1;
    }
  }

  didUpdate(item) {
    if (item.sellIn < 0) {
      if (item.name != 'Aged Brie') {
        if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.quality > 0) {
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
              item.quality = item.quality - 1;
            }
          }
        } else {
          item.quality = item.quality - item.quality;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
        }
      }
    }
  }
}

module.exports = {
  Item,
  Shop
}
