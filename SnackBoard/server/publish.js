Meteor.publish('items', function(){
  return Menu.find();
});
Meteor.publish('category', function() {
  return Type.find();
});
