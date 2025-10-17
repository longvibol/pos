import { Meteor } from "meteor/meteor";
import { Purchase, Import, Item } from "../collections/collections";

Meteor.methods({
  "purchase.add"(doc) {
    let importDoc = Object.assign({}, doc);
    let oldPurchase = Purchase.findOne({ itemId: doc.itemId });
    if (!oldPurchase) {
      importDoc.remains = 0;
      Import.insert(importDoc);
      return Purchase.insert(doc);
    } else {
      importDoc.remains = oldPurchase.qty;
      Import.insert(importDoc);
      oldPurchase.qty += doc.qty;
      oldPurchase.cost = doc.cost;
      oldPurchase.price = doc.price;
      oldPurchase.date = doc.date;
      return Purchase.update({ _id: oldPurchase._id }, { $set: oldPurchase });
    }
  },
  "purchase.find"() {
    let data = [];
    Purchase.find().forEach((doc) => {
      let item = doc;
      item.name = Item.findOne({ _id: doc.itemId })?.name;
      data.push(item);
    });
    return data;
  },
});
