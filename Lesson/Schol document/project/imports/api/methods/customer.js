import { Meteor } from "meteor/meteor";
import { Customer } from "../collections/collections";

Meteor.methods({
  "customer.insert"(doc) {
    return Customer.insert(doc);
  },
  "customer.find"() {
    return Customer.find().fetch();
  },
  "customer.update"(doc) {
    return Customer.update({ _id: doc._id }, { $set: doc });
  },
  "customer.remove"(id) {
    return Customer.remove({ _id: id });
  },
});
