	app.controller('signinController', function($scope,userFactory){
		 $scope.email;
		 $scope.password;
		 $scope.login = function(userInfo) {
		 	if($scope.form.$valid) {
		 		userFactory.login(userInfo.email,userInfo.password,function(response){
		 			console.log('the status is :'+ response.success + 'with message :' + response.message);
		 		});
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
	});
