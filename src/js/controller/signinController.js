
	app.controller('signinController',
		['$scope','userFactory', 
		function($scope,userFactory){
		 	//initialization
		 		//only non logged in user
		 		userFactory.routeNotLoggedIn();
		 $scope.login = function(userInfo) {

		 	if($scope.form.$valid) {
		 		//login
		 		userFactory.login(userInfo.email,userInfo.password);
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
	}]);
