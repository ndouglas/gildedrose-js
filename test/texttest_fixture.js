
const { Shop, Item, types } = require("../src/gilded_rose");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item(types.agedBrie, 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item(types.sulfuras, 0, 80),
  new Item(types.sulfuras, -1, 80),
  new Item(types.backstagePasses, 15, 20),
  new Item(types.backstagePasses, 10, 49),
  new Item(types.backstagePasses, 5, 49),
  new Item(types.conjured, 3, 6),
];

const days = Number(process.argv[2]) || 2;
const gildedRose = new Shop(items);

console.log("OMGHAI!");
for (let day = 0; day < days + 1; day++) {
  console.log(`-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  items.forEach(item => console.log(`${item.name}, ${item.sellIn}, ${item.quality}`));
  gildedRose.updateQuality();
  console.log("")
}
