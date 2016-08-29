	app.factory('userFactory', ['localStorageService','userService','flashService','$location',
        function(localStorageService,userService,flashService,$location){
	var userFactory = {};

    var presentState = null;
    /**
     * Login function
     * @param  {string} email 
     * @param  {string} password
     * @param  {callback}
     * @return {response containing status}
     * @author [Bobby Dixit]
     */        
        userFactory.login = function(email, password) {
                 userService.loginUser(email,password, function (object) {
                        postHttpHandler (object);
                    });
 
        }
    /**
     * SignUp function
     * @param  {string} email 
     * @param  {string} password
     * @return {response containing status}
     * @author [Bobby Dixit]
     */   
        userFactory.signup = function(email, password) {
                 userService.signupUser(email,password,function (object){
                    console.log(object);
                    postHttpHandler (object)
                 });

        }
    /**
     * Processes http data sent from login and signup methords
     * @param  {object} object contains the responce pushed 
     * @author [Bobby Dixit]
     */   
        function postHttpHandler(object)
        {
            var loginErrorHandler={
                '403': 'Username and password dont match',
                '400': 'Username not found',
                '-1': 'query timeout',
                '200': 'token wasn\'t regurned',
                '409': 'Email already exists'
            };
            if (object.success === true && object.data.data.token && object.data.data.email) {
                            if(setCurrentUser(object.data.data.token,object.data.data.email))
                            {
                                response = { success: true,
                                    message: 'You are successfully logged in'};
                                    $location.path('/');
                            }

                        } else {
                            response = { success: false, message: loginErrorHandler[object.status] };
                        }
                        flashService.successResponse(response.success,response.message);
                    }
        /**
         * @param {char} token jwt token
         * @param {char} email user email
         * @return {bool} true if token set successfully
         *                false if token already exists
         * @author [Bobby Dixit]
         */
 		setCurrentUser = function(token,email) {

                //setting local sto
                localStorageService.set({'token': token});
                localStorageService.set({'email': email});
                return true;
        }
        /**
         * @return {bool} if successfully logged out
         * @author [Bobby Dixit]
         */
        userFactory.logout = function() {
            //clearAll is used instead of remove
            //as we should remove expense history also
                localStorageService.clearAll();
                return true;
        }
        /**
         * Route check for authenticated pages
         * @author [Bobby Dixit]
         */
        userFactory.routeLoggedIn = function()
        {
            if(!this.loginCheck)
            {
                $location.path("/");
                flashService.warning('You need to login to access this');
            }
        }
        /**
         * Route check for not logged in user
         * @author [Bobby Dixit]
         */
        userFactory.routeNotLoggedIn = function()
        {

            if(this.loginCheck)
            {
                $location.path("/");
                flashService.warning('You need to logout to access this');
            }
        }
        /**
         * checks if a user is logged in
         * @return bool login status
         * @author [Bobby Dixit]
         */
        userFactory.loginCheck = function()
        {
            if(localStorageService.get('token')&&localstorage.get('email'))
                return true;
            else
                return false;
        }
        return userFactory;
 
	}])