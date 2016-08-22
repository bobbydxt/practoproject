var app=angular.module('expense',['ngRoute' , 'ngFlash' , 'LocalStorageModule']);
			    
app.config(['$routeProvider',function($routeProvider) {
			    	$routeProvider
			    	.when('/sign_in',{
			    		templateUrl : 'views/partials/sign_in.html',
			    		controller : 'signinController'
			    	})
			    	.when('/sign_up',{
			    		templateUrl : 'views/partials/sign_up.html',
			    		controller : 'signupController'
			    	})
			    	.otherwise({ 
			    		templateUrl : 'views/partials/home.html',
			    		controller : 'mainController'
			    		
					 });
			    }]);