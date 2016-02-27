//Users = new Mongo.Collection('users');


if (Meteor.isClient) {
    
    //get updates from server for groups collection
    Meteor.subscribe("groups");
    
    
    Template.item.created=function(){
        this.editMode=new ReactiveVar(false);
        this.rotate_factor = 0;
    };
    
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
        
    Template.item.helpers({
            editMode:function(){
                return Template.instance().editMode.get();
        }
    })
    Template.item.events = {
        'click .test_click': function(event, template) {
            var editMode = template.editMode.get();
            template.editMode.set(!editMode);
            console.log("it is now " + editMode);
            this.rotate_factor += 1;
            var rotate_angle = (90 * this.rotate_factor) % 360;
            template.$('[name="testImg"]').rotate(rotate_angle);
            }
    }
}
if (Meteor.isServer) {
    Meteor.startup(function () {});
    // code to run on server at startup
}
