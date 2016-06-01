
Template.AddItems.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe("category");
    self.subscribe("items");
  });
});
