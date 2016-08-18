Template.Cart.helpers({
  modalActive: function() {
    return Session.get('modalActive');
  },
  cart: function() {
    return Session.get('cart');
  }
});

Template.CartFooter.helpers({
  cost: function() {
    return Session.get('cost');
  }
})

// Template.CartItem.helpers({
//   itemAmount: function(item) {
//     var item = Menu.find({name: item}).fetch()[0]
//     var array = ([...Array(item.stock+1).keys()].slice(1))
//     console.log(item)
//     console.log(item.stock);
//     console.log(array);
//     return array;
//   }
// })
//Template.CartItem.registerHelper(inStock);

Template.Cart.events({
  // 'click .right-side': function(event) {
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
});
