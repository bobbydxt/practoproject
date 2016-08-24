	app.service('helperService', ['', function(){
		var helperService = {};
		
		
		 helperService.callHandler = function(userInfo,tocheck,caller)
		 {
		 	if(tocheck) {	
		 		//signup
		 		caller(userInfo.email,userInfo.password);
    		} else {
      			console.log('Error : Invalid form pushed User');
    		}
		 }
		 return helperService;
	}])