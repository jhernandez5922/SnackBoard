/*jshint esversion: 6 */

Session.set('cost', 0);
Session.set('cart', []);
Session.set('modal', {active: false});

Template.Menu.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe("category");
    self.subscribe("items");
  });
});

Template.Menu.helpers({
  //Returns categories
  category: function() {
    return Type.find({});
  }
});
