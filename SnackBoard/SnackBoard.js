Users = new Mongo.Collection('users');



if (Meteor.isClient) {
    
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
            amount:"$10.00"
        },
        {
            user: "Daniel",
            amount: "$0.01"
        },
        {
            user:"Jason",
            amount:"$10.00"
        },
        {
            user: "Daniel",
            amount: "$0.01"
        },{
            user:"Jason",
            amount:"$10.00"
        },
        {
            user: "Daniel",
            amount: "$0.01"
        },{
            user:"Jason",
            amount:"$10.00"
        },
        {
            user: "Daniel",
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
            name: "Muffin",
            cost: "$1.00",
            stock: "5"
        },
        {
            name: "Dr. Pepper",
            cost: "$0.75",
            stock: "2"
        },
        {
            name: "Cheetos",
            cost: "$0.50",
            stock: "8"
        },
        {
            name: "Ice Cream Pop",
            cost: "$1.25",
            stock: "1"
        },
        {
            name: "Chicken Bake",
            cost: "$3.25",
            stock: "3"
        }
    ]
    //Port data to user list
    Template.user_list.helpers({users:user_data});
    //Port data to menu list
    Template.menu_items.helpers({item:menu_items});
    
}
if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
