import "./createLink";
import "./customer";
import "./category";
import "./item";
import "./supplier";
import "./purchase";
import "./invoice";
import "./import";
import "./user";
import { Meteor } from "meteor/meteor";

Meteor.startup(() => {
  if (Meteor.users.find().count() == 0) {
    let user = {
      username: "admin",
      password: "admin",
      email: "admin@admin.com",
      phone: "017292912",
      role: "admin",
    };
    Meteor.call("user.create", user, (err, result) => {
      if (result) {
        console.log("created user:", result);
      }
    });
  }
});
