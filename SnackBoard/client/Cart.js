Template.Cart.helpers({
  modalActive: function() {
    return Session.get('modalActive');
  },
  cart: function() {
    return Session.get('cart');
  },
  total: function() {
    return Session.get('cost');
  },
});

Template.Cart.events({
  //Need a better way to recalculate price after change
  'input .item-counter': function(event) {
    var cost = 0;
    var cart = Session.get('cart');
    console.log(cart);
    console.log($(event.target));
    if ($(event.target).val() > 0) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == this.name)
          cart[i].stock = $(event.target).val();
        cost += cart[i].cost * cart[i].stock;
      }
    } else {
      var index = cart.indexOf(this);
      if (index != -1) {
        cart.splice(index, 1);
        cost -= this.cost * this.stock;
      }
    }
    console.log(cost);
    Session.set('cost', cost);
    Session.set('cart', cart);
  }
});
