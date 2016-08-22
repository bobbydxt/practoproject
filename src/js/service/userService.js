	app.service('userService', ['$http',
	 function($http){
		var userService={};
		/**
		 * @param  {string}	email for !expr
		 * @param  {string}	password for login
		 * @return {data} response based on success or faileur
		 * @author [Bobby Dixit]
		 */
		userService.loginUser = function(email,password,callback)
		{
				$http({url: '/api/user/authenticate',
						  method: "GET",
						  params: {email: email, password: password},
						  timeout:5000
						}).success(function(resp){
							callback(handleSuccess(resp));
						})
						  .error(function (err,status){
						  	callback(handleError(err,status));
						  });
		}
		/**
		 * @param  {string}	token for login
		 * @return {data} response based on success or faileur
		 * @author [Bobby Dixit]
		 */
		userService.authenticateUser = function(token)
		{
			return $http({url: '/api/user/user',
						  method: "GET",
						  headers: {'Authorization': token},
						  timeout:5000
						}).then(handleSuccess,handleError);			
		}
		/**
		 * @param  {string}	email email for !expr
		 * @param  {string}	password for login
		 * @return {data} response based on success or faileur
		 * @author [Bobby Dixit]
		 */
		userService.signup = function(email,password)
		{
			return $http({url: '/api/user/user',
						  method: "POST",
						  params: {email: email, password: password},
						  timeout:5000
						}).then(handleSuccess,handleError);			
		}

		handleSuccess = function(res,status)
		{
			return {success:true,status: status,data: JSON.parse(res)};
		}
		handleError = function(error,status)
		{
			return {success: false,status: status,data: error};
		}
		return userService;
	}])