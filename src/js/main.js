var app=angular.module('expenseapp',  ['ngRoute'])
			    .config(['$routeProvider',function($routeProvider) {
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
	app.controller('mainController', ['$scope', function($scope){
		 $scope.message = 'random message';
	}]);
	