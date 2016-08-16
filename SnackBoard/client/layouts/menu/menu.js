/*jshint esversion: 6 */

Session.set('cost', 0);
Session.set('cart', []);
Session.set('modal', {active: false});
//Helps set up navbar


Template.MenuItems.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe("category");
    self.subscribe("items");
  });
});

Template.MenuItems.helpers({
  //Returns categories
  category: function() {
    return Type.find({});
  }
});

//CategoryItems template
Template.CategoryItems.onCreated(function() {
  //For each catgeory, checks if items are hidden
  this.hidden = new ReactiveVar(false);
});

Template.CategoryItems.helpers({
  //get all items of a category
  items: function(cat) {
    return Menu.find({category: cat });
  }
});

Template.CategoryItems.events({
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


// Template.registerHelper('groupRoutes', function () {
//     FlowRouter.watchPathChange();
//     var groupName = FlowRouter.current().route.group.name;
//     return _.filter(FlowRouter._routes, function (route) {
//         return route.group.name === groupName;
//     });
// });
// //Port data to menu list
// Template.menu_items.helpers(
//     {
//         category: function() {
//             return Menu.find({});
//         }
//     });
// Template.menu_items.events(
//     {
//         'click .total': function(event, template) {
//             template.$('.cart').toggle();
//         }
//     }
// );
// //Item Category Functions
// Template.item_category.created=function(){
//     this.itemHide=new ReactiveVar(true);
//     this.rotate_factor = 0;
// };
//
// Template.registerHelper('cart', function(input){
//     return Session.get('cart');
// });
//
// Template.registerHelper('cost', function(input) {
//     return Session.get('cost');
// });
//
// Template.item_category.helpers({
//     itemHide:function(){
//         return Template.instance().itemHide.get();
//     }
// });
//
// Template.item_category.events = {
//     'click .category': function(event, template) {
//         var itemHide = template.itemHide.get();
//         template.itemHide.set(!itemHide);
//         console.log("it is now " + itemHide);
//         if(!itemHide) {
//             template.$('.testRotate').css({/*"-ms-transform": "rotate(90deg)", /* IE 9 */
//                 /*"-webkit-transform": "rotate(90deg)", /* Chrome, Safari, Opera */
//                 "transform": "rotate(0deg)"});
//                  template.$('.snackbar').css({"overflow-x": "scroll"});
//         }
//         else {
//            template.$('.testRotate').css({/*"-ms-transform": "rotate(270deg)", /* IE 9 */
//                 /*"-webkit-transform": "rotate(270deg)", /* Chrome, Safari, Opera */
//                 "transform": "rotate(-90deg)"});
//                 template.$('.snackbar').css({"overflow-x": "hidden"});
//         }
//     }
// };
