
// User data
var user_data = [
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
];
//Port data to user list
Template.user_list.helpers({users:user_data});
