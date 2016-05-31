Type = new Mongo.Collection('category');

Type.allow({
  insert: function(userId, doc) {
    return !!userId;
  }
});



Category = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
  }
});

Type.attachSchema(Category);
