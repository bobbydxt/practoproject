/**
 * @param  {scope} for local data handling
 * @param  {userFactory} for all functional tasks
 * @author [Bobby Dixit]
 */
	app.controller('signinController',
		['$scope','userFactory', 
		function($scope,userFactory){
		 	//initialization
		 	(function()
		 	{
		 		//only non logged in user
		 		userFactory.routeNotLoggedIn();
		 	})();
		 $scope.login = function(userInfo) {

		 	if($scope.form.$valid) {
		 		//login
		 		userFactory.login(userInfo.email,userInfo.password);
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
	}]);
