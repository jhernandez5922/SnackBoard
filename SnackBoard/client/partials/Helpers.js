Template.registerHelper('inStock', (item) => {
  var purchasedItem = Menu.find({}).fetch()[0]
  console.log(item)
  console.log(purchasedItem)
  var array = ([...Array(purchasedItem.stock+1).keys()].slice(1))
  console.log(purchasedItem.stock);
  console.log(array);
  return array;
} )

Template.MainLayout.events({
  //Need a better way to recalculate price after change
  'input #purchaseQuantity': function(event) {
    var cost = 0;
    var cart = Session.get('cart');
    console.log(cart);
    console.log($(event.target).val());
    //if value 0 or less
    if ($(event.target).val() > 0) {
      for (var i = 0; i < cart.length; i++) {
        if (cart[i].name == this.name)
          cart[i].stock = $(event.target).val();
        cost += cart[i].cost * cart[i].stock;
      }
      Session.set('cost', cost);
    } else {
      $(event.target).val(this.stock);
    }
    console.log(cost);
    Session.set('cart', cart);
  },
  'click #removeItem': function() {
    var cart = Session.get('cart');
    var cost = Session.get('cost');
    console.log(cart);
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].name == this.name) {
          cost -= cart[i].cost * cart[i].stock;
          cart.splice(i, 1);
      }
    }
    Session.set('cost', cost);
    Session.set('cart', cart);
  }
})
