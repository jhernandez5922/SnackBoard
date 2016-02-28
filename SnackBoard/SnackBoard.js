//Users = new Mongo.Collection('users');


if (Meteor.isClient) {
    
    //get updates from server for groups collection
    Meteor.subscribe("groups");
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
            user:"Jason Hernandez",
            amount:"$10.00"
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
    //Menu data
    var menu_items = [
        {
            type:"Soda", 
            items: [{
                name: "Pepsi",
                cost: "$1.00",
                stock: "5"
            }, 
            {
                name: "Dr. Pepper",
                cost: "$0.75",
                stock: "2"    
            },
        ]},
        {
            type:"Chips",
            items: [{
                name: "Cheetos",
                cost: "$0.50",
                stock: "5"
            }, 
            {
                name: "Pringles",
                cost: "$0.75",
                stock: "2"    
            },
        ]},
    ]
    //Port data to user list
    Template.user_list.helpers({users:user_data});
    
    //Port data to menu list
    Template.menu_items.helpers(
        {
            category:menu_items
        });
        
        
        
        
    //Item Category Functions    
    Template.item_category.created=function(){
        this.editMode=new ReactiveVar(false);
        this.rotate_factor = 0;
    };
    
    Template.item_category.helpers({
        editMode:function(){
            return Template.instance().editMode.get();
        }
        
        
    })
    Template.item_category.events = {
        'click .test_click': function(event, template) {
            var editMode = template.editMode.get();
            template.editMode.set(!editMode);
            console.log("it is now " + editMode);
            this.rotate_factor += 1;
            var rotate_angle = (90 * this.rotate_factor) % 360;
            var img = template.$("[name='testImg']")
            console.log(img);
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
            var current = Session.get('cost');
            Session.set('cost', current + number);
            console.log(Session.get('cost'));
        }
    }
}
if (Meteor.isServer) {
    Meteor.startup(function () {});
    // code to run on server at startup
}
