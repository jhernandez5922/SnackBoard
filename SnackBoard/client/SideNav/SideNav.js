Template.SideNav.events({
  'click .cart': function(){
      console.log("Setting " + !Session.get('modalActive'));
      Session.set('modalActive', !Session.get('modalActive'));
  }
});
