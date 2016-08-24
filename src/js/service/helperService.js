	app.service('helperService', ['Flash', function(Flash){
		var helperService = {};
		
		
		 helperService.callHandler = function(userInfo,tocheck,caller)
		 {
		 	if(tocheck) {	
		 		//signup
		 		caller(userInfo);
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
		 return helperService;
	}])