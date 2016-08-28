	app.controller('navController', ['$scope','userFactory', function($scope,userFactory){
		$scope.status = userFactory.loginCheck();
		$scope.signout = function()
		{
			console.log('here');
			userFactory.logout();
			$scope.status = userFactory.loginCheck();
		}
	}]);
	