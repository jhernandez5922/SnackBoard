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
    
    var snacks = [
        {
            type: "Drinks",
            items:[
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                },
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                },
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                },
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                },
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                },
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                },
                {
                    name: "Pepsi",
                    price: "0.75",
                    stock: "5"
                }
            ]},
        {
            type: "Snacks",
            Items:[
                {
                    name: "chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                },
                {
                 name: "Chips",
                    price: "0.75",
                    stock: "5"
                }
            ]
        }
    ];
    //Port data to user list
    Template.user_list.helpers({users:user_data});
    
    //Port data to menu list
    Template.menu_items.helpers(
        {
            category: function() {
                return snacks//Menu.find({});
            }
        });
        
    //Item Category Functions    
    Template.item_category.created=function(){
        this.editMode=new ReactiveVar(true);
        this.cost = new ReactiveVar(false);
        this.rotate_factor = 0;
    };
        
    Template.registerHelper('cost', function(input){
        return this.cost;
    });
        
    Template.item_category.helpers({
        editMode:function(){
            return Template.instance().editMode.get();
        }
    })
    
    Template.item_category.events = {
        'click .category': function(event, template) {
            var editMode = template.editMode.get();
            template.editMode.set(!editMode);
            console.log("it is now " + editMode);
            if(!editMode)
            {
                template.$('.testRotate').css({"transform": "rotate(0deg)"});
                template.$('.snackbar').css({"overflow-x": "scroll"});
            }
            else //if(!editMode)
            {
               template.$('.testRotate').css({"transform": "rotate(-90deg)"});
               template.$('.snackbar').css({"overflow-x": "hidden"});
            }
            }
    }
    
    Template.item.created=function() {
        this.cart = []
    }
    Template.item.events = {
        'click': function(event, template) {
            //Add to cart
            console.log(this.name);
            console.log(this.cost);
            console.log(this.stock);
            template.cart.push({
                name: this.name,
                cost: this.cost,
                stock: this.stock
            });
            var currency = this.cost;
            var number = Number(currency.replace(/[^0-9\.]+/g,""));
            var current = this.cost;
            Session.set('cost', current + number);
            console.log(Session.get('cost'));
        }
    }
}
if (Meteor.isServer) {
    Meteor.startup(function () {});
    // code to run on server at startup
}
