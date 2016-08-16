Template.SideNav.events({
  'click .cart': function(){
      var modal = {};
      modal.active = true;
      modal.title = "Current Cart";
      modal.contentTemplate = "Cart";
      modal.footerTemplate = "CartFooter";
      console.log("Modal is now: " + modal);
      Session.set('modal', modal);
  },
  'click .login': function() {
    var modal = {};
    modal.active = true;
    modal.title = "Admin Login";
    modal.contentTemplate = "Login";
    modal.footerTemplate = "LoginFooter";
    console.log("Modal is now: " + modal);
    Session.set('modal', modal);
  }
});
