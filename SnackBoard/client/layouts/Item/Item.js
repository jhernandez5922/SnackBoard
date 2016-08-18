Template.Item.onCreated(function(){
    //whether or not the admin is editing the values
    this.editMode = new ReactiveVar(false);
});

Template.Item.helpers({
  editMode: function(template) {
    return Template.instance().editMode.get();
  }
});
Template.Item.events({
  //purchase item
  'click .btn-confirmation': function(event, template) {
      console.log("Adding " + this.name);
      var cart = Session.get('cart');
      if (cart.length === 0) {
        cart.push({
            name: this.name,
            cost: this.cost,
            stock: 1
        });
      }
      else {
        for (var i = 0; i < cart.length; i++) {
          if (cart[i].name == this.name) {
              cart[i].stock += 1;
              break;
          }
          else if (i + 1 == cart.length) {
              cart.push({
                  name: this.name,
                  cost: this.cost,
                  stock: 1
              });
              break;
          }
      }
    }
    $( "#cart" ).trigger( "click" );
    Session.set('cart', cart);
    console.log(cart);
    Session.set('cost', this.cost + Session.get('cost'));
    console.log(Session.get('cost'));
  },
  //edit values (Admin Only)
  'click .btn-primary': function(event, template) {
      var editMode = template.editMode.get();
      console.log("Enter editing mode: " + editMode);
      template.editMode.set(!editMode);
  },
  //remove item (Admin Only)
  'click .btn-deny': function(event, template) {
      console.log("Removing " + this.name);
      Menu.remove({'_id': this._id});
  }
});
