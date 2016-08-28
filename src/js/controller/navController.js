	app.controller('navController', ['$scope','userFactory','$rootScope', 
		function($scope,userFactory,$rootScope){
		$scope.status = userFactory.loginCheck();
		$scope.signout = function()
		{
			//console.log('here');
			userFactory.logout();
			$scope.status = userFactory.loginCheck();
		}
		$rootScope.$on("$routeChangeStart", function (event, next, current) {

			$scope.status = userFactory.loginCheck();
		});
	}]);
	