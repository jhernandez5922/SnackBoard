//Users = new Mongo.Collection('users');
Menu = new Mongo.Collection('items');



// FUTURE REFERENCE
//db.col.update(
//    { name: 'doc', 'list.id': 2 }, 
//    {$push: {'list.$.items': {id: 5, name: 'item5'}}}
//) TO ADD TO EXISTING INNER LIST


if (Meteor.isClient) {
    
    //get updates from server for groups collection
    Meteor.subscribe("items");
    Session.set('cost', 0);
    Session.set('cart', []);
    //Helps set up navbar
    Template.registerHelper('groupRoutes', function () {
        FlowRouter.watchPathChange()
        var groupName = FlowRouter.current().route.group.name
        return _.filter(FlowRouter._routes, function (route) {
            return route.group.name === groupName
        })
    })
    // User data 
    var user_data = [
        {

            user:"Jason",
            amount:"$-10.00"
        },
        {
            user: "Daniel Harris",
            amount: "$0.01"
        },
        {
            user:"Watson T",
            amount:"$10.00"
        },
        {
            user: "Kevin Ngo",
            amount: "$0.01"
        },
        {
            user: "Jonathan Richards",
            amount: "$0.01"
        },{
            user:"Rahul Nunna",
            amount:"$10.00"
        },
        {
            user: "Jonathan Meza",
            amount: "$0.01"
        },{
            user:"Jason",
            amount:"$10.00"
        },
        {
            user: "Daniel",
            amount: "$0.01"
        },
    ];
    //Port data to user list
    Template.user_list.helpers({users:user_data});
    
    //Port data to menu list
    Template.menu_items.helpers(
        {
            category: function() {
                return Menu.find({});
            }
        });
    Template.menu_items.events(
        {
            'click .total': function(event, template) {
                template.$('.cart').toggle();
            }
        }
    )
    //Item Category Functions    
    Template.item_category.created=function(){
        this.itemHide=new ReactiveVar(true);
        this.rotate_factor = 0;
    };
        
    Template.registerHelper('cart', function(input){
        return Session.get('cart');
    });
    
    Template.registerHelper('cost', function(input) {
        return Session.get('cost');
    })
        
    Template.item_category.helpers({
        itemHide:function(){
            return Template.instance().itemHide.get();
        }
    })
    
    Template.item_category.events = {
        'click .category': function(event, template) {
            var itemHide = template.itemHide.get();
            template.itemHide.set(!itemHide);
            console.log("it is now " + itemHide);
            if(!itemHide) {
                template.$('.testRotate').css({/*"-ms-transform": "rotate(90deg)", /* IE 9 */
                    /*"-webkit-transform": "rotate(90deg)", /* Chrome, Safari, Opera */
                    "transform": "rotate(0deg)"});
                     template.$('.snackbar').css({"overflow-x": "scroll"});
            }
            else {
               template.$('.testRotate').css({/*"-ms-transform": "rotate(270deg)", /* IE 9 */
                    /*"-webkit-transform": "rotate(270deg)", /* Chrome, Safari, Opera */
                    "transform": "rotate(-90deg)"});
                    template.$('.snackbar').css({"overflow-x": "hidden"});
            }
        }
    }
    Template.item.events = {
        'click .purchase': function(event, template) {
            //Add to cart
            console.log(this.name);
            console.log(this.price);
            console.log(this.stock);
            var cart = Session.get('cart');
            if (cart.length == 0) {
                cart.push({
                    name: this.name,
                    price: this.price,
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
                            price: this.price,
                            stock: 1
                        });
                        break;
                    }
                }
            }
            Session.set('cart', cart);
            console.log(cart);
            var currency = Session.get('cost');
            var currencyString = JSON.stringify(currency);
            var number = Number(currencyString.replace(/[^0-9\.]+/g,""));
            
            var current = Number(this.price.replace(/[^0-9\.]+/g,""));
            
            Session.set('cost', (current + number).toFixed(2));
            console.log(Session.get('cost'));
        }
    }
}
if (Meteor.isServer) {
    Meteor.startup(function () {});
    // code to run on server at startup
}
