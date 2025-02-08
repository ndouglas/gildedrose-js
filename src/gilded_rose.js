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
      QualityUpdater.for(item).update(item);
      SellInUpdater.for(item).update(item);
      if (item.sellIn < 0) {
        Expirer.for(item).update(item);
      }
    }
  }

}

class QualityUpdater {
  static for(item) {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrieQualityUpdater();
      case 'Backstage passes to a TAFKAL80ETC concert':
        return new BackstagePassesQualityUpdater();
      case 'Sulfuras, Hand of Ragnaros':
        return new SulfurasQualityUpdater();
      default:
        return new QualityUpdater();
    }
  }

  update(item) {
    if (item.quality > 0) {
      item.quality = item.quality - 1;
    }
  }
}

class AgedBrieQualityUpdater extends QualityUpdater {
  update(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
  }
}

class BackstagePassesQualityUpdater extends QualityUpdater {
  update(item) {
    if (item.quality < 50) {
      item.quality = item.quality + 1;
    }
    if (item.quality < 50) {
      if (item.sellIn < 11) {
        item.quality = item.quality + 1;
        if (item.sellIn < 6) {
          item.quality = item.quality + 1;
        }
      }
    }
  }
}

class SulfurasQualityUpdater extends QualityUpdater {
  update(item) { }
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
    item.quality = 0;
  }
}

module.exports = {
  Item,
  Shop
}
