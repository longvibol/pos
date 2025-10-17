import { Meteor } from "meteor/meteor";
import { Category } from "../collections/collections";

Meteor.methods({
  "category.insert"(doc) {
    return Category.insert(doc);
  },
  "category.find"() {
    return Category.find().fetch();
  },
  "category.update"(doc) {
    return Category.update({ _id: doc._id }, { $set: doc });
  },
  "category.remove"(id) {
    return Category.remove({ _id: id });
  },
});
