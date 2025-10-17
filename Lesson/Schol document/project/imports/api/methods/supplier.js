import { Meteor } from "meteor/meteor";
import { Supplier } from "../collections/collections";

Meteor.methods({
    "supplier.insert"(doc) {
        return Supplier.insert(doc);
    },
    "supplier.find"() {
        return Supplier.find().fetch();
    },
    "supplier.update"(doc) {
        return Supplier.update({ _id: doc._id }, { $set: doc });
    },
    "supplier.remove"(id) {
        return Supplier.remove({ _id: id });
    },
});
