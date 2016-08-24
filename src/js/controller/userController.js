
	app.controller('userController',
		['$scope','userFactory','helperService', 
		function($scope,userFactory,helperService){
		 	//initialization
		 		//only non logged in user
		 		userFactory.routeNotLoggedIn();
		 $scope.login = function(userInfo) {

		 	helperService.callHandler(userInfo,$scope.form.$valid,userFactory.login);
		 }
		 $scope.signUp = function(userInfo) {

		 	helperService.callHandler(userInfo,$scope.form.$valid,userFactory.signup);
		 }
		 
	}]);
