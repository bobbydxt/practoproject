var app=angular.module('expense',['ui.router' , 'ngFlash' , 'LocalStorageModule','moment-picker',
	'angular.filter','fusioncharts']);
			    
	app.config(['$stateProvider','$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			    	$urlRouterProvider.otherwise("/home");
			    	$stateProvider
			    	.state('sign_in',{
			    		url: "/sign_in",
			    		templateUrl : 'views/partials/sign_in.html',
			    		controller : 'userController',
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeNotLoggedIn())
			    				$state.go('/view_expense',{reload:true});
			    			}
			    		}
			    	})
			    	.state('sign_up',{
			    		url: "/sign_up",
			    		templateUrl : 'views/partials/sign_up.html',
			    		controller : 'userController',
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeNotLoggedIn())
			    				$state.go('/view_expense',{reload:true});
			    			}
			    		}
			    	})
			    	.state('expense_select',{
			    		url: "/expense_select",
			    		templateUrl : 'views/partials/expense_select.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}
			    	})
			    	.state('expense_form',{
			    		url: "/expense_form",
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: false,
			    			mainChange: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}
			    	})
			    	.state('edit_expense_select',{
			    		url: "/edit_expense_select",
			    		templateUrl : 'views/partials/expense_select.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: true
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}
			    	})
			    	.state('edit_expense',{
			    		url: "/edit_expense",
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: true,
			    			mainChange: false
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}
			    	})
			    	.state('main_edit_expense',{
			    		url: "/main_edit_expense",
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController',
			    		data: {
			    			edit: true,
			    			mainChange: true
			    		},
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}
			    	})
			    	.state('view_expense',{
			    		url: "/view_expense",
			    		templateUrl : 'views/partials/view_expense.html',
			    		controller : 'viewExpenseController',
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}
			    	})
			    	.state('view_graph',{
			    		url: "/view_graph",
			    		templateUrl : 'views/partials/view_graph.html',
			    		controller : 'viewExpenseController',
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeLoggedIn())
			    				$state.go('/home',{reload:true});
			    			}
			    		}

			    	})
			    	.state('home',{
			    		url: "/home",
			    		templateUrl : 'views/partials/home.html',
			    		resolve: {
			    			load: function(userFactory) {
			    				if(!userFactory.routeNotLoggedIn())
			    				$state.go('/view_expense',{reload:true});
			    			}
			    		}
			    	})
			    }]);
	app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          // confirm() requires jQuery
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);