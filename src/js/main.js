var app=angular.module('expense',['ngRoute' , 'ngFlash' , 'LocalStorageModule','moment-picker',
	'angular.filter','fusioncharts']);
			    
	app.config(['$routeProvider',function($routeProvider) {
			    	$routeProvider
			    	.when('/sign_in',{
			    		templateUrl : 'views/partials/sign_in.html',
			    		controller : 'userController'
			    	})
			    	.when('/sign_up',{
			    		templateUrl : 'views/partials/sign_up.html',
			    		controller : 'userController'
			    	})
			    	.when('/expense_select',{
			    		templateUrl : 'views/partials/expense_select.html',
			    		controller : 'expenseController'
			    	})
			    	.when('/expense_form',{
			    		templateUrl : 'views/partials/expense_form.html',
			    		controller : 'expenseController'
			    	})
			    	.when('/view_expense',{
			    		templateUrl : 'views/partials/view_expense.html',
			    		controller : 'viewExpenseController'
			    	})
			    	.when('/view_graph',{
			    		templateUrl : 'views/partials/view_graph.html',
			    		controller : 'viewExpenseController'
			    	})
			    	.otherwise({ 
			    		templateUrl : 'views/partials/home.html',
			    		controller : 'homeController'
			    		
					 });
			    }]);