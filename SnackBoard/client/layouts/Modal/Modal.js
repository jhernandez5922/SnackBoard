
Template.Modal.helpers({
  get: function(key) {
    //Returns values of JSON object from modal to html
    var modal =  Session.get('modal');
    console.log(key + " contains " + modal[key]);
    return modal[key];
  }
})



Template.Modal.events({
  'click #close': function() {
    //closes modal
    var modal = Session.get('modal');
    modal.active = false;
    Session.set('modal', modal);
  }
})
