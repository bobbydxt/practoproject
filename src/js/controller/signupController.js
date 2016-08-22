
	app.controller('signupController',
		['$scope','userFactory', 
		function($scope,userFactory){
		 	//initialization
		 		//only not logged in user
		 		userFactory.routeNotLoggedIn();
		 $scope.login = function(userInfo) {

		 	if($scope.form.$valid) {	
		 		//signup
		 		userFactory.signup(userInfo.email,userInfo.password);
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
	}]);
