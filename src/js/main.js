var app=angular.module('expense',['ngRoute' , 'ngFlash' , 'LocalStorageModule']);
			    
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
			    	.otherwise({ 
			    		templateUrl : 'views/partials/home.html',
			    		controller : 'homeController'
			    		
					 });
			    }]);