	app.controller('navController', ['$scope','userFactory', function($scope,userFactory){
		$scope.status = userFactory.routeLoggedIn();
		$scope.signout = function()
		{
			console.log('here');
			userFactory.logout();
		}
	}]);
	