/*jshint esversion: 6 */

FlowRouter.route('/', {
  name: 'home',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render("HomeLayout");
  }
});


FlowRouter.route('/add-item', {
  name: 'add-item',
  action() {
    GAnalytics.pageview();
    BlazeLayout.render("MainLayout", {main: 'AddItems'});
  }
});

FlowRouter.route('/menu', {
  name: 'menu',
  action() {
    BlazeLayout.render('MainLayout', {main: "MenuItems"});
  }
});



// var publicRoutes = FlowRouter.group({
//   name: 'public',
//   triggersEnter: []
// })
//
// publicRoutes.route('/', {
//   name: 'Snack Bar',
//   triggersEnter: [],
//   action: function (params, queryParams) {
//     BlazeLayout.render("ApplicationLayout",
//         { header: "welcome", main: "menu_items"})
//   },
//   triggersExit: []
// })
//
// publicRoutes.route('/users', {
//   name: 'Users',
//   triggersEnter: [],
//   action: function (params, queryParams) {
//     BlazeLayout.render('ApplicationLayout',
//     {header: 'welcome', main:"user_list"})
//   },
//   triggersExit: []
// })
