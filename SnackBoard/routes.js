
var publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: []
})

publicRoutes.route('/', {
  name: 'Snack Bar',
  triggersEnter: [],
  action: function (params, queryParams) {
    BlazeLayout.render("ApplicationLayout",
        { header: "welcome", main: "menu_items"})
  },
  triggersExit: []
})

publicRoutes.route('/users', {
  name: 'Users',
  triggersEnter: [],
  action: function (params, queryParams) {
    BlazeLayout.render('ApplicationLayout', 
    {header: 'welcome', main:"user_list"})
  },
  triggersExit: []
})
