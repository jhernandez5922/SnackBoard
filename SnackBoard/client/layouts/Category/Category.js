//CategoryItems template
Template.Category.onCreated(function() {
  //For each catgeory, checks if items are hidden
  this.hidden = new ReactiveVar(false);
});

Template.Category.helpers({
  //get all items of a category
  items: function(cat) {
    return Menu.find({category: cat });
  }
});

Template.Category.events({
  //toggles items from being visible
  'click .right-side': function(event, template) {
    if (!this.hidden) {
      template.$(".item").css('display', 'none');
      $(event.target).text('Show');
    } else {
      template.$(".item").css('display', 'block');
      $(event.target).text('Hide');
    }
    this.hidden = !this.hidden;
  }
});
