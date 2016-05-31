Menu = new Mongo.Collection('items');

//Menu = new Meteor.Collection('menu');

Menu.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});



MenuSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  },
  cost: {
    type: String,
    label: "Cost"
  },
  stock: {
    type: String,
    label: "Stock"
  },
  category: {
    type: String,
    label: "Category",
    autoform: {
      options: function() {
        return Type.find().map(function (c) {
            return {label: c.name, value: c.name};
        });
      }
    }
  }
});

Menu.attachSchema(MenuSchema);
