import { Meteor } from "meteor/meteor";
import moment from "moment";
import { Export, Purchase, Item, Customer } from "../collections/collections";

Meteor.methods({
  "invoice.number"() {
    return Export.find().count() + 1;
  },
  "invoice.insert"(doc) {
    let soldItems = doc.items;
    Purchase.find().forEach((doc) => {
      soldItems.forEach((soldItem) => {
        if (soldItem._id === doc.itemId) {
          let remainQty = doc.qty - soldItem.qty;
          if (remainQty === 0) {
            Purchase.remove({ _id: doc._id });
          } else {
            Purchase.update({ _id: doc._id }, { $set: { qty: remainQty } });
          }
        }
      });
    });
    return Export.insert(doc);
  },
  "invoice.find"(date) {
    let data = [];
    let fromDate = moment(date.fromDate, "DD-MM-YYYY");
    let toDate = moment(date.toDate, "DD-MM-YYYY");
    Export.find().forEach((doc) => {
      let date = moment(doc.date, "DD-MM-YYYY");
      if (date >= fromDate && date <= toDate) {
        let newDoc = doc;
        newDoc.customerName = Customer.findOne({ _id: doc.customerId })?.name;
        let items = [];
        doc.items.forEach((it) => {
          it.name = Item.findOne({ _id: it._id })?.name;
          items.push(it);
        });
        newDoc.items = items;
        data.push(newDoc);
      }
    });
    console.log("data:", data);
    return data;
  },
});
