
Template.Checkout.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe("category");
    self.subscribe("items");
  });
});

Template.Checkout.helpers({
  cart: function() {
    return Session.get('cart');
  },
  total: function() {
    return Session.get('cost');
  },
  isCartEmpty: function() {
    return Session.get('cart').length == 0;
  }
})

// Template.CheckoutItem.registerHelper(inStock);


Template.CheckoutItem.events({
  // 'click #removeItem': function() {
  //   var cart = Session.get('cart');
  //   var cost = Session.get('cost');
  //   console.log(cart);
  //   for (var i = 0; i < cart.length; i++) {
  //     if (cart[i].name == this.name) {
  //         cost -= cart[i].cost * cart[i].stock;
  //         cart.splice(i, 1);
  //     }
  //   }
  //   Session.set('cost', cost);
  //   Session.set('cart', cart);
  // }
})
