app.config(['$routeProvider',function($routeProvider) {
			    	$routeProvider
			    	.when('/sign_in',{
			    		templateUrl : '/views/partials/sign_in.html',
			    		controller : 'userController',
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeNotLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/sign_up',{
			    		templateUrl : 'views/partials/sign_up.html',
			    		controller : 'userController',
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeNotLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/expense_select',{
			    		templateUrl : 'views/partials/expense_select.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				console.log(userFactory.routeLoggedIn());
			    				userFactory.routeLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/expense_form',{
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: false,
			    			mainChange: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/edit_expense_select',{
			    		templateUrl : 'views/partials/expense_select.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: true
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				console.log(userFactory.routeLoggedIn());
			    				userFactory.routeLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/edit_expense',{
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: true,
			    			mainChange: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/main_edit_expense',{
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: true,
			    			mainChange: true
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/view_expense',{
			    		templateUrl : 'views/partials/view_expense.html',
			    		controller : 'viewExpenseController',
			    		data: {
			    			graph: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeLoggedIn();
			    			}
			    		}
			    	})
			    	.when('/view_graph',{
			    		templateUrl : 'views/partials/view_graph.html',
			    		controller : 'viewExpenseController',
			    		data: {
			    			graph: true
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeLoggedIn();
			    			}
			    		}

			    	})
			    	.when('/home',{
			    		templateUrl : '/views/partials/home.html',
			    		resolve: {
			    			load: function(userFactory) {
			    				userFactory.routeNotLoggedIn()
			    			}
			    		}
			    	})
			    	.otherwise({
			    		templateUrl : '/views/partials/home.html',
			    		resolve: {
			    			load: function(userFactory) {

			    				userFactory.routeNotLoggedIn()
			    			}
			    		}
			    	})
			    }]);	    


