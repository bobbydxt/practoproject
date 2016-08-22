	app.factory('userFactory', ['userService', function(userService){
	var userFactory = {};
    /**
     * @param  {string} email 
     * @param  {string} password
     * @param  {callback}
     * @return {response containing status}
     * @author [Bobby Dixit]
     */
        userFactory.login = function(email, password, callback) {
 			var loginErrorHandler={
 				'403': 'Username and password dont match',
 				'400': 'Username not found',
 				'-1': 'query timeout'
 			};
                 userService.loginUser(email,password, function (data) {

                        if (data.success === true && data.token) {
                            response = { success: true,message: data.token };
                        } else {
                            response = { success: false, message: loginErrorHandler[data.status] };
                        }
                        callback(response);
                    });

 
        }
 		userFactory.setuser = function(token) {

        }
 		userFactory.tokenExists = function() {

 			
 		}
        userFactory.logout = function() {

        }
        return userFactory;
 
	}])