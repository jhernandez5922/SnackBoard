/*jshint esversion: 6 */

Session.set('cost', 0);
Session.set('cart', []);
//Helps set up navbar


Template.MenuItems.onCreated(function(){
  var self = this;
  self.autorun(function() {
    self.subscribe("category");
    self.subscribe("items");
  });
});

Template.MenuItems.helpers({
  category: function() {
    return Type.find({});
  }
});

//CategoryItems template
Template.CategoryItems.onCreated(function() {
  this.hidden = new ReactiveVar(false);
});

Template.CategoryItems.helpers({
  items: function(cat) {
    return Menu.find({category: cat });
  }
});

Template.CategoryItems.events({
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
    this.editMode = new ReactiveVar(false);
});

Template.Item.helpers({
  editMode: function() {
    return this.editMode;
  }
});
Template.Item.events({
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
  'click .btn-primary': function(event, template) {
      console.log("Enter editing mode");
      this.editMode = !this.editMode;
  },
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
// Template.item.events = {
//     'click .purchase': function(event, template) {
//         //Add to cart
//         console.log(this.name);
//         console.log(this.price);
//         console.log(this.stock);
//         var cart = Session.get('cart');
//         if (cart.length === 0) {
//             cart.push({
//                 name: this.name,
//                 price: this.price,
//                 stock: 1
//             });
//             $('.cart').css({
//                     "border-width": "3px",
//                     "border-style": "groove",
//                     "border-color": "black",
//                     "overflow-y": "scroll"
//             });
//         }
//         else {
//             for (var i = 0; i < cart.length; i++) {
//                 if (cart[i].name == this.name) {
//                     cart[i].stock += 1;
//                     break;
//                 }
//                 else if (i + 1 == cart.length) {
//                     cart.push({
//                         name: this.name,
//                         price: this.price,
//                         stock: 1
//                     });
//                     break;
//                 }
//             }
//         }
//         Session.set('cart', cart);
//         console.log(cart);
//         var currency = Session.get('cost');
//         var currencyString = JSON.stringify(currency);
//         var number = Number(currencyString.replace(/[^0-9\.]+/g,""));
//
//         var current = Number(this.price.replace(/[^0-9\.]+/g,""));
//
//         Session.set('cost', (current + number).toFixed(2));
//         console.log(Session.get('cost'));
//     }
// };
