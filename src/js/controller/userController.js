
	app.controller('userController',
		['$scope','userFactory', 
		function($scope,userFactory){
		 	//initialization
		 		//only non logged in user
		 		userFactory.routeNotLoggedIn();
		 $scope.login = function(userInfo) {

		 	callHandler(userInfo,userFactory.login);
		 }
		 $scope.signUp = function(userInfo) {

		 	callHandler(userInfo,userFactory.signup);
		 }
		 function callHandler(userInfo,caller)
		 {
		 	if($scope.form.$valid) {	
		 		//signup
		 		caller(userInfo.email,userInfo.password);
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
	}]);
