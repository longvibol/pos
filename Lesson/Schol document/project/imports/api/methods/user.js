import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
Meteor.methods({
  "user.create"(doc) {
    return Accounts.createUser({
      username: doc.username,
      password: doc.password,
      email: doc.email,
      profile: {
        phone: doc.phone,
        role: doc.role,
      },
    });
  },
  "user.update"(doc) {
    if (doc.reset) {
      Accounts.setPassword(doc._id, doc.password);
    }
    let emails = Meteor.users.findOne({ _id: doc._id }).emails;
    emails[0].address = doc.email;
    return Meteor.users.update(
      { _id: doc._id },
      {
        $set: {
          username: doc.username,
          emails: emails,
          profile: {
            phone: doc.phone,
            role: doc.role,
          },
        },
      }
    );
  },
  "user.find"() {
    let data = [];
    Meteor.users
      .find()
      .fetch()
      .forEach((it) => {
        let doc = {
          _id: it._id,
          username: it.username,
          email: it.emails[0].address,
          phone: it.profile.phone,
          role: it.profile.role,
        };
        data.push(doc);
      });
    return data;
  },
  "user.remove"(id) {
    return Meteor.users.remove({ _id: id });
  },
});
