var app=angular.module('expense',['ngRoute' , 'ngFlash' , 'LocalStorageModule','moment-picker',
	'angular.filter','fusioncharts']);
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

	app.directive('ngConfirmClick', [
  function(){
    return {
      priority: -1,
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmClick;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);
	  app.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;

            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

