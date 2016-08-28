	app.service('userService', ['$http',
	 function($http){
		var userService={};
		/**
		 * @param  {string}	email for login
		 * @param  {string}	password for login
		 * @param {object} callback 
		 * @return {data} response based on success or faileur
		 * @author [Bobby Dixit]
		 */
		userService.loginUser = function(userInfo,callback)
		{
				userHttpreqHandler('api/user/authenticate','GET',
					userDataParser(userInfo),
					callback);
		}
		/**
		 * @param  {string}	email for !signup
		 * @param  {string}	password for signup
		 * @param {object} callback 
		 * @return {data} response based on success or faileur
		 * @author [Bobby Dixit]
		 */
		function userDataParser(userInfo)
		{
			return {email: userInfo.email, password: userInfo.password}
		}
		userService.signupUser = function(userInfo,callback)
		{
				userHttpreqHandler('api/user/signup','POST',
					userDataParser(userInfo),callback);
		}
		/**
		 * http handler
		 * @param  {url} url to use
		 * @param  {method} method to use
		 * @param  {param} parameter to use
		 * @param  {callback}
		 * @author [Bobby Dixit]
		 */
		function userHttpreqHandler(url,method,param,callback)
		{
				$http({url: url,
						  method: method,
						  params: param,
						  timeout:5000
						}).success(function(res,status){
							callback(handleNew(res,status,true));

						})
						  .error(function (err,status){
						  	callback(handleNew(err,status,false));
						  });
		}
		/**
		 * @param  {string}	token for login
		 * @return {data} response based on success or faileur
		 * @author [Bobby Dixit]
		 */
		userService.authenticateUser = function(token)
		{
			// here exta authentication can be done		
		}
		/**
		 * @param  {object} to display data
		 * @param  {numeric} http status code
		 * @param  {success} 
		 * @author [Bobby Dixit]
		 */
		handleNew = function(res,status,success)
		{
			return {success:success,status: status,data: res};
		}
		return userService;
	}])