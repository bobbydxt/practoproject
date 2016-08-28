
	app.controller('userController',
		['$scope','userFactory','helperService', 
		function($scope,userFactory,helperService){
		 	//initialization
		 		//only non logged in user
		 		//userFactory.logout();
		 		
		 $scope.transaction = function(userInfo,type) {
		 	console.log(type);
		 	if((type==='login'||type==='signup')&&$scope.form.$valid)
		 	{
		 	userFactory.transaction(userInfo,type);
		 	}
		 }

		 
	}]);
