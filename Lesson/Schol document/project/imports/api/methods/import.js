import { Meteor } from "meteor/meteor";
import moment from "moment";
import { Import, Item, Supplier } from "../collections/collections";

Meteor.methods({
  "import.findByDate"(date) {
    let data = [];
    let fromDate = moment(date.fromDate, "DD-MM-YYYY");
    let toDate = moment(date.toDate, "DD-MM-YYYY");
    Import.find().forEach((doc) => {
      let item = doc;
      let date = moment(doc.date, "DD-MM-YYYY");
      if (date >= fromDate && date <= toDate) {
        item.name = Item.findOne({ _id: doc.itemId })?.name;
        item.company = Supplier.findOne({ _id: doc.supplierId })?.company;
        data.push(item);
      }
    });
    return data;
  },
});
