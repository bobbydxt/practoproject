	app.service('helperService', ['Flash', function(Flash) {
	    var helperService = {};


	    helperService.callHandler = function(userInfo, tocheck, caller, type) {
	        if (tocheck) {
	            //signup
	            caller(userInfo, type);
	        } else {
	            console.log('Error : Invalid form pushed User');
	        }
	    }
	    return helperService;
	}])