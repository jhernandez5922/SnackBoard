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
